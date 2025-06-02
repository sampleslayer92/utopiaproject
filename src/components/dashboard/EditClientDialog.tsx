
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Client } from '@/types/dashboard';

interface EditClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onSave: (client: Client) => void;
}

export const EditClientDialog: React.FC<EditClientDialogProps> = ({ 
  open, 
  onOpenChange, 
  client, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: '',
    contactPerson: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || '',
        email: client.email || '',
        businessType: client.industry || '',
        contactPerson: client.contactPerson || '',
        phone: client.phone || '',
        address: client.address || ''
      });
    }
  }, [client]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.businessType) {
      toast.error('Vyplňte všetky povinné polia');
      return;
    }

    if (!client) return;

    const updatedClient: Client = {
      ...client,
      name: formData.name,
      email: formData.email,
      industry: formData.businessType,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      address: formData.address
    };

    onSave(updatedClient);
    toast.success('Klient bol úspešne upravený');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upraviť klienta</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Názov spoločnosti *</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Zadajte názov spoločnosti..."
              required
            />
          </div>
          
          <div>
            <Label htmlFor="edit-email">Email *</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="client@example.com"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="edit-businessType">Typ podnikania *</Label>
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
            <Label htmlFor="edit-contactPerson">Kontaktná osoba</Label>
            <Input
              id="edit-contactPerson"
              value={formData.contactPerson}
              onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
              placeholder="Meno kontaktnej osoby"
            />
          </div>
          
          <div>
            <Label htmlFor="edit-phone">Telefón</Label>
            <Input
              id="edit-phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+421 9XX XXX XXX"
            />
          </div>
          
          <div>
            <Label htmlFor="edit-address">Adresa</Label>
            <Input
              id="edit-address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Ulica, mesto"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Zrušiť
            </Button>
            <Button type="submit">
              Uložiť zmeny
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
