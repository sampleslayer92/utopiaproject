
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface CreateTicketDialogProps {
  onTicketCreated?: () => void;
}

export const CreateTicketDialog: React.FC<CreateTicketDialogProps> = ({ onTicketCreated }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    deviceId: '',
    locationId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.priority) {
      toast.error('Vyplňte všetky povinné polia');
      return;
    }

    // Create ticket logic here
    console.log('Creating ticket:', formData);
    toast.success('Tiket bol úspešne vytvorený');
    
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: '',
      deviceId: '',
      locationId: ''
    });
    
    setOpen(false);
    onTicketCreated?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nový tiket
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Vytvoriť nový tiket</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Názov tiketu *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Stručný popis problému..."
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Kategória *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Vyberte kategóriu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technický problém</SelectItem>
                <SelectItem value="device_issue">Problém zariadenia</SelectItem>
                <SelectItem value="billing">Fakturácia</SelectItem>
                <SelectItem value="general">Všeobecný</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="priority">Priorita *</Label>
            <Select 
              value={formData.priority} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Vyberte prioritu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Nízka</SelectItem>
                <SelectItem value="medium">Stredná</SelectItem>
                <SelectItem value="high">Vysoká</SelectItem>
                <SelectItem value="critical">Kritická</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Podrobný popis *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Opíšte problém podrobne..."
              rows={4}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Zrušiť
            </Button>
            <Button type="submit">
              Vytvoriť tiket
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
