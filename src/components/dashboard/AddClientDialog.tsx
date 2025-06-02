
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Client } from '@/types/dashboard';

interface AddClientDialogProps {
  onClientAdded: (newClient: Client) => void;
}

export const AddClientDialog: React.FC<AddClientDialogProps> = ({ onClientAdded }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    organizationId: user?.role === 'admin' ? 'org-1' : user?.organizationId || '',
    contactPerson: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.businessType) {
      toast.error('Vyplňte všetky povinné polia');
      return;
    }

    // Only ISO Organizácia (admin) can create clients
    if (user?.role !== 'admin') {
      toast.error('Nemáte oprávnenie na pridanie klienta');
      return;
    }

    // Create new client object
    const newClient: Client = {
      id: `client-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      businessPartnerId: 'bp-1',
      locationsCount: 0,
      devicesCount: 0,
      totalRevenue: 0,
      monthlyRevenue: 0,
      expectedRevenue: 0,
      commissionRate: 2.5,
      calculatedCommission: 0,
      contractViolation: false,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      industry: formData.businessType,
      address: formData.address,
      contactPerson: formData.contactPerson,
      services: []
    };

    console.log('Creating client:', newClient);
    toast.success('Klient bol úspešne pridaný');
    
    onClientAdded(newClient);
    
    setFormData({
      name: '',
      email: '',
      businessType: '',
      organizationId: 'org-1',
      contactPerson: '',
      phone: '',
      address: ''
    });
    
    setOpen(false);
  };

  // Only show dialog for ISO Organizácia
  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Pridať klienta
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Pridať nového klienta</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Názov spoločnosti *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Zadajte názov spoločnosti..."
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="client@example.com"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="businessType">Typ podnikania *</Label>
            <Select 
              value={formData.businessType} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Vyberte typ podnikania" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Maloobchod</SelectItem>
                <SelectItem value="restaurant">Reštaurácia</SelectItem>
                <SelectItem value="service">Služby</SelectItem>
                <SelectItem value="e-commerce">E-commerce</SelectItem>
                <SelectItem value="healthcare">Zdravotníctvo</SelectItem>
                <SelectItem value="other">Iné</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="contactPerson">Kontaktná osoba</Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
              placeholder="Meno kontaktnej osoby"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Telefón</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+421 9XX XXX XXX"
            />
          </div>
          
          <div>
            <Label htmlFor="address">Adresa</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Ulica, mesto"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Zrušiť
            </Button>
            <Button type="submit">
              Pridať klienta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
