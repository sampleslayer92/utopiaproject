
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddBusinessPartnerDialogProps {
  onPartnerAdded?: () => void;
}

export const AddBusinessPartnerDialog: React.FC<AddBusinessPartnerDialogProps> = ({ onPartnerAdded }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    region: '',
    tier: 'bronze'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.region) {
      toast.error('Vyplňte všetky povinné polia');
      return;
    }

    // Create business partner logic here
    console.log('Creating business partner:', formData);
    toast.success('Obchodný partner bol úspešne pridaný');
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      region: '',
      tier: 'bronze'
    });
    
    setOpen(false);
    onPartnerAdded?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Pridať partnera
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Pridať nového obchodného partnera</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Meno/Názov firmy *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Zadajte meno alebo názov firmy..."
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
              placeholder="partner@example.com"
              required
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
          
          <div>
            <Label htmlFor="region">Región *</Label>
            <Select 
              value={formData.region} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Vyberte región" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bratislava">Bratislava</SelectItem>
                <SelectItem value="Praha">Praha</SelectItem>
                <SelectItem value="Košice">Košice</SelectItem>
                <SelectItem value="Brno">Brno</SelectItem>
                <SelectItem value="Žilina">Žilina</SelectItem>
                <SelectItem value="Banská Bystrica">Banská Bystrica</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="tier">Úroveň partnera</Label>
            <Select 
              value={formData.tier} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, tier: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bronze">Bronze</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Zrušiť
            </Button>
            <Button type="submit">
              Pridať partnera
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
