
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddMerchantDialogProps {
  onAddMerchant?: (merchant: any) => void;
}

export const AddMerchantDialog: React.FC<AddMerchantDialogProps> = ({ onAddMerchant }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    address: '',
    industry: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.industry) {
      toast({
        title: "Chyba",
        description: "Prosím vyplňte všetky povinné polia.",
        variant: "destructive"
      });
      return;
    }

    // Create new merchant object
    const newMerchant = {
      id: `usr-client-${Date.now()}`,
      ...formData,
      status: 'active' as const,
      joinedDate: new Date().toISOString().split('T')[0],
      monthlyVolume: 0,
      monthlyRevenue: 0,
      devicesCount: 0,
      organizationId: 'org-1'
    };

    onAddMerchant?.(newMerchant);
    
    toast({
      title: "Úspech",
      description: "Nový merchant bol pridaný do systému.",
    });

    setFormData({
      name: '',
      businessName: '',
      email: '',
      phone: '',
      address: '',
      industry: '',
      notes: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105">
          <Plus className="h-5 w-5 mr-2" />
          Nový merchant
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Pridať nového merchanta</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Názov podniku *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="napr. Reštaurácia U Jána"
                required
              />
            </div>
            <div>
              <Label htmlFor="businessName">Obchodné meno</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="napr. Reštaurácia U Jána s.r.o."
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="kontakt@merchant.sk"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefón</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+421 900 123 456"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Adresa</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Hlavná 15, 811 01 Bratislava"
            />
          </div>

          <div>
            <Label htmlFor="industry">Odvetvie *</Label>
            <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Vyberte odvetvie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restaurant">Reštaurácia</SelectItem>
                <SelectItem value="retail">Maloobchod</SelectItem>
                <SelectItem value="hospitality">Hotelierstvo</SelectItem>
                <SelectItem value="pharmacy">Lekáreň</SelectItem>
                <SelectItem value="services">Služby</SelectItem>
                <SelectItem value="other">Iné</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Poznámky</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Dodatočné informácie o merchantovi..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Zrušiť
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              Pridať merchanta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
