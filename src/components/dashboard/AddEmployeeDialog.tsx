
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TeamMember } from '@/types/team';

interface AddEmployeeDialogProps {
  onAddEmployee?: (employee: TeamMember) => void;
}

export const AddEmployeeDialog: React.FC<AddEmployeeDialogProps> = ({ onAddEmployee }) => {
  const [open, setOpen] = useState(false);
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
    notes: ''
  });

  const availablePermissions = [
    { id: 'view_merchants', label: 'Zobrazenie merchantov' },
    { id: 'edit_contracts', label: 'Editácia zmlúv' },
    { id: 'create_reports', label: 'Vytváranie reportov' },
    { id: 'manage_team', label: 'Správa tímu' },
    { id: 'technical_support', label: 'Technická podpora' },
    { id: 'maintenance_contracts', label: 'Údržbové zmluvy' }
  ];

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
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.position) {
      toast({
        title: "Chyba",
        description: "Prosím vyplňte všetky povinné polia.",
        variant: "destructive"
      });
      return;
    }

    const newEmployee: TeamMember = {
      id: `team-${Date.now()}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      department: formData.department,
      businessPartnerId: 'bp-1',
      status: 'active',
      hireDate: new Date().toISOString().split('T')[0],
      performance: {
        monthlyRevenue: 0,
        totalRevenue: 0,
        merchantsManaged: 0,
        contractsSigned: 0,
        efficiency: 85
      },
      assignedMerchants: [],
      permissions: formData.permissions,
      salary: formData.salary ? parseInt(formData.salary) : undefined,
      commissionRate: formData.commissionRate ? parseFloat(formData.commissionRate) : undefined,
      notes: formData.notes
    };

    onAddEmployee?.(newEmployee);
    
    toast({
      title: "Úspech",
      description: "Nový zamestnanec bol pridaný do tímu.",
    });

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      salary: '',
      commissionRate: '',
      permissions: [],
      notes: ''
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105">
          <Plus className="h-5 w-5 mr-2" />
          Nový zamestnanec
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pridať nového zamestnanca</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Meno *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="Peter"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Priezvisko *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Novák"
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
                placeholder="peter.novak@iso-org.sk"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="position">Pozícia *</Label>
              <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte pozíciu" />
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
                  <SelectValue placeholder="Vyberte oddelenie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sales">Predaj</SelectItem>
                  <SelectItem value="Support">Podpora</SelectItem>
                  <SelectItem value="Technical">Technické</SelectItem>
                  <SelectItem value="Management">Vedenie</SelectItem>
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
                placeholder="2800"
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
                placeholder="6.5"
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
              placeholder="Dodatočné informácie o zamestnancovi..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Zrušiť
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              Pridať zamestnanca
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
