
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { TeamMember } from '@/types/team';

interface EditTeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMember | null;
  onSave: (member: TeamMember) => void;
}

export const EditTeamMemberDialog: React.FC<EditTeamMemberDialogProps> = ({
  open,
  onOpenChange,
  member,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: '',
    commissionRate: '',
    permissions: [] as string[],
    notes: '',
    status: 'active' as 'active' | 'inactive' | 'on_leave'
  });

  const availablePermissions = [
    { id: 'view_merchants', label: 'Zobrazenie merchantov' },
    { id: 'edit_contracts', label: 'Editácia zmlúv' },
    { id: 'create_reports', label: 'Vytváranie reportov' },
    { id: 'manage_team', label: 'Správa tímu' },
    { id: 'technical_support', label: 'Technická podpora' },
    { id: 'maintenance_contracts', label: 'Údržbové zmluvy' }
  ];

  useEffect(() => {
    if (member) {
      setFormData({
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phone: member.phone || '',
        position: member.position,
        department: member.department,
        salary: member.salary?.toString() || '',
        commissionRate: member.commissionRate?.toString() || '',
        permissions: member.permissions,
        notes: member.notes || '',
        status: member.status
      });
    }
  }, [member]);

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId]
      });
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(p => p !== permissionId)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!member) return;
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Chyba",
        description: "Prosím vyplňte všetky povinné polia.",
        variant: "destructive"
      });
      return;
    }

    const updatedMember: TeamMember = {
      ...member,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      department: formData.department,
      salary: formData.salary ? parseInt(formData.salary) : undefined,
      commissionRate: formData.commissionRate ? parseFloat(formData.commissionRate) : undefined,
      permissions: formData.permissions,
      notes: formData.notes,
      status: formData.status
    };

    onSave(updatedMember);
    
    toast({
      title: "Úspech",
      description: "Člen tímu bol úspešne upravený.",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upraviť člena tímu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Meno *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Priezvisko *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
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
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefón</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="position">Pozícia</Label>
              <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Senior Account Manager">Senior Account Manager</SelectItem>
                  <SelectItem value="Account Manager">Account Manager</SelectItem>
                  <SelectItem value="Technical Support Manager">Technical Support Manager</SelectItem>
                  <SelectItem value="Sales Representative">Sales Representative</SelectItem>
                  <SelectItem value="Customer Success Manager">Customer Success Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">Oddelenie</Label>
              <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sales">Predaj</SelectItem>
                  <SelectItem value="Support">Podpora</SelectItem>
                  <SelectItem value="Technical">Technické</SelectItem>
                  <SelectItem value="Management">Vedenie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'active' | 'inactive' | 'on_leave') => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktívny</SelectItem>
                  <SelectItem value="inactive">Neaktívny</SelectItem>
                  <SelectItem value="on_leave">Na dovolenke</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salary">Plat (€)</Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="commissionRate">Provízia (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                step="0.1"
                value={formData.commissionRate}
                onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>Povolenia</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {availablePermissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission.id}
                    checked={formData.permissions.includes(permission.id)}
                    onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                  />
                  <Label htmlFor={permission.id} className="text-sm">
                    {permission.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Poznámky</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
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
