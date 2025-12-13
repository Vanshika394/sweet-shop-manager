import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { insertUserSchema, loginSchema, insertSweetSchema, updateSweetSchema, purchaseSchema, restockSchema } from "@shared/schema";
import type { User } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

const JWT_SECRET = process.env.JWT_SECRET || "sweet-shop-secret-key-change-in-production";

interface AuthRequest extends Request {
  user?: User;
}

async function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await storage.getUser(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

async function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post('/api/auth/register', async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      
      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });
      
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword, token });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(validatedData.username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const validPassword = await bcrypt.compare(validatedData.password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword, token });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/auth/me', authenticateToken, async (req: AuthRequest, res: Response) => {
    const { password, ...userWithoutPassword } = req.user!;
    res.json({ user: userWithoutPassword });
  });

  app.get('/api/sweets', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const sweets = await storage.getAllSweets();
      res.json(sweets);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/sweets/search', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { query, category, minPrice, maxPrice } = req.query;
      
      const sweets = await storage.searchSweets(
        query as string | undefined,
        category as string | undefined,
        minPrice ? parseInt(minPrice as string) : undefined,
        maxPrice ? parseInt(maxPrice as string) : undefined
      );
      
      res.json(sweets);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/sweets', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const validatedData = insertSweetSchema.parse(req.body);
      const sweet = await storage.createSweet(validatedData);
      res.status(201).json(sweet);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/api/sweets/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateSweetSchema.parse(req.body);
      
      const sweet = await storage.updateSweet(id, validatedData);
      if (!sweet) {
        return res.status(404).json({ message: 'Sweet not found' });
      }
      
      res.json(sweet);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.delete('/api/sweets/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteSweet(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Sweet not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/sweets/:id/purchase', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = purchaseSchema.parse(req.body);
      
      const sweet = await storage.purchaseSweet(id, validatedData.quantity);
      if (!sweet) {
        return res.status(400).json({ message: 'Insufficient quantity or sweet not found' });
      }
      
      res.json(sweet);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/sweets/:id/restock', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = restockSchema.parse(req.body);
      
      const sweet = await storage.restockSweet(id, validatedData.quantity);
      if (!sweet) {
        return res.status(404).json({ message: 'Sweet not found' });
      }
      
      res.json(sweet);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  return httpServer;
}
