
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Contract } from '@/types/dashboard';
import { v4 as uuidv4 } from 'uuid';

interface AddContractDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (contract: Contract) => void;
  clientId: string;
  businessPartnerId: string;
}

export const AddContractDialog: React.FC<AddContractDialogProps> = ({
  open,
  onOpenChange,
  onAdd,
  clientId,
  businessPartnerId
}) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'subscription' as Contract['type'],
    value: '',
    status: 'pending' as Contract['status'],
    startDate: '',
    endDate: '',
    terms: '',
    autoRenewal: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.type && formData.value && formData.startDate && formData.endDate) {
      const newContract: Contract = {
        id: uuidv4(),
        clientId,
        businessPartnerId,
        title: formData.title,
        type: formData.type,
        value: Number(formData.value),
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate,
        terms: formData.terms,
        autoRenewal: formData.autoRenewal
      };
      onAdd(newContract);
      onOpenChange(false);
      setFormData({
        title: '',
        type: 'subscription',
        value: '',
        status: 'pending',
        startDate: '',
        endDate: '',
        terms: '',
        autoRenewal: false
      });
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Pridať novú zmluvu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Názov zmluvy</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Typ</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte typ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subscription">Predplatné</SelectItem>
                  <SelectItem value="lease">Prenájom</SelectItem>
                  <SelectItem value="purchase">Kúpa</SelectItem>
                  <SelectItem value="maintenance">Údržba</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value">Hodnota (€)</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => handleChange('value', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktívna</SelectItem>
                  <SelectItem value="pending">Čakajúca</SelectItem>
                  <SelectItem value="expired">Vypršaná</SelectItem>
                  <SelectItem value="cancelled">Zrušená</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Začiatok platnosti</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">Koniec platnosti</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="terms">Podmienky</Label>
            <Textarea
              id="terms"
              value={formData.terms}
              onChange={(e) => handleChange('terms', e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Zrušiť
            </Button>
            <Button type="submit">
              Pridať zmluvu
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
