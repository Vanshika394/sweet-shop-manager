import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth, apiRequest } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Candy, LogOut, Search, ShoppingCart, Plus, Package, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Sweet } from '@shared/schema';
import heroImage from '@assets/generated_images/vibrant_colorful_candy_assortment_hero_background.png';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [purchaseSweet, setPurchaseSweet] = useState<Sweet | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [editSweet, setEditSweet] = useState<Sweet | null>(null);
  const [addSweetOpen, setAddSweetOpen] = useState(false);
  const [restockSweet, setRestockSweet] = useState<Sweet | null>(null);
  const [restockQuantity, setRestockQuantity] = useState(1);

  const { data: sweets, isLoading } = useQuery<Sweet[]>({
    queryKey: ['sweets'],
    queryFn: () => apiRequest('/api/sweets'),
  });

  const purchaseMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      apiRequest(`/api/sweets/${id}/purchase`, {
        method: 'POST',
        body: JSON.stringify({ quantity }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      toast.success('Purchase successful!');
      setPurchaseSweet(null);
      setPurchaseQuantity(1);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Purchase failed');
    },
  });

  const createSweetMutation = useMutation({
    mutationFn: (data: any) =>
      apiRequest('/api/sweets', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      toast.success('Sweet added successfully!');
      setAddSweetOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add sweet');
    },
  });

  const updateSweetMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      apiRequest(`/api/sweets/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      toast.success('Sweet updated successfully!');
      setEditSweet(null);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update sweet');
    },
  });

  const deleteSweetMutation = useMutation({
    mutationFn: (id: number) =>
      apiRequest(`/api/sweets/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      toast.success('Sweet deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete sweet');
    },
  });

  const restockMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      apiRequest(`/api/sweets/${id}/restock`, {
        method: 'POST',
        body: JSON.stringify({ quantity }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      toast.success('Restock successful!');
      setRestockSweet(null);
      setRestockQuantity(1);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Restock failed');
    },
  });

  const filteredSweets = sweets?.filter((sweet) =>
    sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sweet.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSweet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createSweetMutation.mutate({
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: parseInt(formData.get('price') as string),
      quantity: parseInt(formData.get('quantity') as string),
      description: formData.get('description') as string || undefined,
      imageUrl: formData.get('imageUrl') as string || undefined,
    });
  };

  const handleUpdateSweet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editSweet) return;
    const formData = new FormData(e.currentTarget);
    updateSweetMutation.mutate({
      id: editSweet.id,
      data: {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        price: parseInt(formData.get('price') as string),
        quantity: parseInt(formData.get('quantity') as string),
        description: formData.get('description') as string || undefined,
        imageUrl: formData.get('imageUrl') as string || undefined,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      <div
        className="relative bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/80 to-purple-600/80"></div>
        <div className="relative z-10 text-center text-white">
          <div className="flex justify-center mb-4">
            <Candy className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold mb-2">Sweet Shop</h1>
          <p className="text-xl">Indulge in delightful treats</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome, {user?.username}!
              {user?.isAdmin && <Badge className="ml-2 bg-secondary">Admin</Badge>}
            </h2>
          </div>
          <div className="flex gap-2">
            {user?.isAdmin && (
              <Button
                data-testid="button-add-sweet"
                onClick={() => setAddSweetOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Sweet
              </Button>
            )}
            <Button
              data-testid="button-logout"
              onClick={logout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              data-testid="input-search"
              type="text"
              placeholder="Search sweets by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSweets?.map((sweet) => (
              <Card key={sweet.id} data-testid={`card-sweet-${sweet.id}`} className="overflow-hidden border-2 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-br from-pink-100 to-purple-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl" data-testid={`text-sweet-name-${sweet.id}`}>
                        {sweet.name}
                      </CardTitle>
                      <CardDescription>
                        <Badge variant="secondary" data-testid={`text-sweet-category-${sweet.id}`}>
                          {sweet.category}
                        </Badge>
                      </CardDescription>
                    </div>
                    {user?.isAdmin && (
                      <div className="flex gap-1">
                        <Button
                          data-testid={`button-edit-${sweet.id}`}
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditSweet(sweet)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          data-testid={`button-delete-${sweet.id}`}
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this sweet?')) {
                              deleteSweetMutation.mutate(sweet.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                {sweet.imageUrl && (
                  <img 
                    src={sweet.imageUrl} 
                    alt={sweet.name} 
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                )}
                {sweet.description && (
                  <p className="text-sm text-muted-foreground mb-3">{sweet.description}</p>
                )}
                <div className="flex justify-between items-center mb-2"></div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-primary" data-testid={`text-sweet-price-${sweet.id}`}>
                      ${(sweet.price / 100).toFixed(2)}
                    </span>
                    <span className="text-sm" data-testid={`text-sweet-quantity-${sweet.id}`}>
                      {sweet.quantity > 0 ? (
                        <Badge variant="outline" className="bg-green-50">
                          {sweet.quantity} in stock
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50">
                          Out of stock
                        </Badge>
                      )}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    data-testid={`button-purchase-${sweet.id}`}
                    onClick={() => {
                      setPurchaseSweet(sweet);
                      setPurchaseQuantity(1);
                    }}
                    disabled={sweet.quantity === 0}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> Purchase
                  </Button>
                  {user?.isAdmin && (
                    <Button
                      data-testid={`button-restock-${sweet.id}`}
                      onClick={() => {
                        setRestockSweet(sweet);
                        setRestockQuantity(1);
                      }}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Package className="w-4 h-4" /> Restock
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {filteredSweets?.length === 0 && (
          <div className="text-center py-12">
            <Candy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No sweets found</p>
          </div>
        )}
      </div>

      <Dialog open={!!purchaseSweet} onOpenChange={(open) => !open && setPurchaseSweet(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Purchase {purchaseSweet?.name}</DialogTitle>
            <DialogDescription>
              Price: ${((purchaseSweet?.price || 0) / 100).toFixed(2)} each
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                data-testid="input-purchase-quantity"
                type="number"
                min="1"
                max={purchaseSweet?.quantity}
                value={purchaseQuantity}
                onChange={(e) => setPurchaseQuantity(parseInt(e.target.value))}
              />
            </div>
            <div className="text-lg font-bold">
              Total: ${(((purchaseSweet?.price || 0) / 100) * purchaseQuantity).toFixed(2)}
            </div>
          </div>
          <DialogFooter>
            <Button
              data-testid="button-confirm-purchase"
              onClick={() => {
                if (purchaseSweet) {
                  purchaseMutation.mutate({ id: purchaseSweet.id, quantity: purchaseQuantity });
                }
              }}
              disabled={purchaseMutation.isPending}
            >
              {purchaseMutation.isPending ? 'Processing...' : 'Confirm Purchase'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addSweetOpen} onOpenChange={setAddSweetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Sweet</DialogTitle>
            <DialogDescription>Create a new sweet product</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSweet}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" data-testid="input-sweet-name" required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" data-testid="input-sweet-category" required />
              </div>
              <div>
                <Label htmlFor="price">Price (in cents)</Label>
                <Input id="price" name="price" data-testid="input-sweet-price" type="number" min="1" required />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" name="quantity" data-testid="input-sweet-quantity" type="number" min="0" required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" data-testid="input-sweet-description" />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" data-testid="input-sweet-imageurl" type="url" />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit" data-testid="button-submit-sweet" disabled={createSweetMutation.isPending}>
                {createSweetMutation.isPending ? 'Adding...' : 'Add Sweet'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editSweet} onOpenChange={(open) => !open && setEditSweet(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Sweet</DialogTitle>
            <DialogDescription>Update sweet information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSweet}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" name="name" data-testid="input-edit-name" defaultValue={editSweet?.name} required />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Input id="edit-category" name="category" data-testid="input-edit-category" defaultValue={editSweet?.category} required />
              </div>
              <div>
                <Label htmlFor="edit-price">Price (in cents)</Label>
                <Input id="edit-price" name="price" data-testid="input-edit-price" type="number" min="1" defaultValue={editSweet?.price} required />
              </div>
              <div>
                <Label htmlFor="edit-quantity">Quantity</Label>
                <Input id="edit-quantity" name="quantity" data-testid="input-edit-quantity" type="number" min="0" defaultValue={editSweet?.quantity} required />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Input id="edit-description" name="description" data-testid="input-edit-description" defaultValue={editSweet?.description || ''} />
              </div>
              <div>
                <Label htmlFor="edit-imageUrl">Image URL</Label>
                <Input id="edit-imageUrl" name="imageUrl" data-testid="input-edit-imageurl" type="url" defaultValue={editSweet?.imageUrl || ''} />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit" data-testid="button-update-sweet" disabled={updateSweetMutation.isPending}>
                {updateSweetMutation.isPending ? 'Updating...' : 'Update Sweet'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!restockSweet} onOpenChange={(open) => !open && setRestockSweet(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restock {restockSweet?.name}</DialogTitle>
            <DialogDescription>Add inventory to this sweet</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="restock-quantity">Quantity to Add</Label>
              <Input
                id="restock-quantity"
                data-testid="input-restock-quantity"
                type="number"
                min="1"
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(parseInt(e.target.value))}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Current stock: {restockSweet?.quantity} → New stock: {(restockSweet?.quantity || 0) + restockQuantity}
            </div>
          </div>
          <DialogFooter>
            <Button
              data-testid="button-confirm-restock"
              onClick={() => {
                if (restockSweet) {
                  restockMutation.mutate({ id: restockSweet.id, quantity: restockQuantity });
                }
              }}
              disabled={restockMutation.isPending}
            >
              {restockMutation.isPending ? 'Processing...' : 'Confirm Restock'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
