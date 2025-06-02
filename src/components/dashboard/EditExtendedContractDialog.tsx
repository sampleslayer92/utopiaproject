
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExtendedContract } from '@/types/contract';
import { Separator } from '@/components/ui/separator';
import { Building, User, CreditCard, Euro, FileText } from 'lucide-react';

interface EditExtendedContractDialogProps {
  contract: ExtendedContract | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contract: ExtendedContract) => void;
}

export const EditExtendedContractDialog: React.FC<EditExtendedContractDialogProps> = ({
  contract,
  open,
  onOpenChange,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<ExtendedContract>>({});

  useEffect(() => {
    if (contract) {
      setFormData(contract);
    } else {
      setFormData({});
    }
  }, [contract]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contract && formData.contractNumber && formData.type && formData.value && formData.startDate && formData.endDate) {
      onSave({
        ...contract,
        ...formData,
        value: Number(formData.value),
        monthlyFee: Number(formData.monthlyFee),
        commissionRate: Number(formData.commissionRate),
        updatedAt: new Date().toISOString()
      } as ExtendedContract);
      onOpenChange(false);
    }
  };

  const handleChange = (field: keyof ExtendedContract, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCompanyChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      onboardingData: {
        ...prev.onboardingData!,
        company: {
          ...prev.onboardingData!.company,
          [field]: value
        }
      }
    }));
  };

  if (!contract) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Editovať zmluvu - {contract.contractNumber}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Základné</TabsTrigger>
              <TabsTrigger value="company">Spoločnosť</TabsTrigger>
              <TabsTrigger value="products">Produkty</TabsTrigger>
              <TabsTrigger value="persons">Osoby</TabsTrigger>
              <TabsTrigger value="financial">Financie</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Základné údaje zmluvy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contractNumber">Číslo zmluvy</Label>
                      <Input
                        id="contractNumber"
                        value={formData.contractNumber || ''}
                        onChange={(e) => handleChange('contractNumber', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Typ zmluvy</Label>
                      <Input
                        id="type"
                        value={formData.type || ''}
                        onChange={(e) => handleChange('type', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Začiatok platnosti</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate || ''}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Koniec platnosti</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate || ''}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="value">Celková hodnota (€)</Label>
                      <Input
                        id="value"
                        type="number"
                        value={formData.value || ''}
                        onChange={(e) => handleChange('value', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyFee">Mesačný poplatok (€)</Label>
                      <Input
                        id="monthlyFee"
                        type="number"
                        value={formData.monthlyFee || ''}
                        onChange={(e) => handleChange('monthlyFee', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="commissionRate">Provízia (%)</Label>
                      <Input
                        id="commissionRate"
                        type="number"
                        step="0.001"
                        value={(formData.commissionRate || 0) * 100}
                        onChange={(e) => handleChange('commissionRate', parseFloat(e.target.value) / 100)}
                        required
                      />
                    </div>
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

                  <div>
                    <Label htmlFor="notes">Poznámky</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes || ''}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Údaje o spoločnosti</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ico">IČO</Label>
                      <Input
                        id="ico"
                        value={formData.onboardingData?.company?.ico || ''}
                        onChange={(e) => handleCompanyChange('ico', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dic">DIČ</Label>
                      <Input
                        id="dic"
                        value={formData.onboardingData?.company?.dic || ''}
                        onChange={(e) => handleCompanyChange('dic', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="nazovSpolocnosti">Názov spoločnosti</Label>
                    <Input
                      id="nazovSpolocnosti"
                      value={formData.onboardingData?.company?.nazovSpolocnosti || ''}
                      onChange={(e) => handleCompanyChange('nazovSpolocnosti', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sidlo">Sídlo</Label>
                    <Input
                      id="sidlo"
                      value={formData.onboardingData?.company?.sidlo || ''}
                      onChange={(e) => handleCompanyChange('sidlo', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="predmetCinnosti">Predmet činnosti</Label>
                    <Textarea
                      id="predmetCinnosti"
                      value={formData.onboardingData?.company?.predmetCinnosti || ''}
                      onChange={(e) => handleCompanyChange('predmetCinnosti', e.target.value)}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Zariadenia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {formData.onboardingData?.zariadenia?.filter(z => z.selected).map((zariadenie, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <p className="font-medium">{zariadenie.nazov}</p>
                            <p className="text-sm text-gray-500">Počet: {zariadenie.pocetKs}</p>
                          </div>
                          <Badge variant="outline">{zariadenie.typNakupu}</Badge>
                        </div>
                      )) || <p className="text-gray-500">Žiadne zariadenia</p>}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Licencie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {formData.onboardingData?.licencie?.filter(l => l.selected).map((licencia, index) => (
                        <div key={index} className="p-2 border rounded">
                          <p className="font-medium">{licencia.nazov}</p>
                        </div>
                      )) || <p className="text-gray-500">Žiadne licencie</p>}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="persons" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Obchodné osoby</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {formData.onboardingData?.obchodneOsoby?.map((osoba, index) => (
                        <div key={index} className="p-3 border rounded">
                          <p className="font-medium">{osoba.meno}</p>
                          <p className="text-sm text-gray-600">{osoba.funkcia}</p>
                          <p className="text-sm">{osoba.email}</p>
                          <p className="text-sm">{osoba.telefon}</p>
                        </div>
                      )) || <p className="text-gray-500">Žiadne obchodné osoby</p>}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Technické osoby</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {formData.onboardingData?.technickeOsoby?.map((osoba, index) => (
                        <div key={index} className="p-3 border rounded">
                          <p className="font-medium">{osoba.meno}</p>
                          <p className="text-sm text-gray-600">{osoba.funkcia}</p>
                          <p className="text-sm">{osoba.email}</p>
                          <p className="text-sm">{osoba.telefon}</p>
                        </div>
                      )) || <p className="text-gray-500">Žiadne technické osoby</p>}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Euro className="h-5 w-5" />
                    <span>Fakturačné údaje</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fakturacnyEmail">Fakturačný email</Label>
                      <Input
                        id="fakturacnyEmail"
                        value={formData.onboardingData?.fakturacneUdaje?.fakturacnyEmail || ''}
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="iban">IBAN</Label>
                      <Input
                        id="iban"
                        value={formData.onboardingData?.fakturacneUdaje?.iban || ''}
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="fakturacnaAdresa">Fakturačná adresa</Label>
                    <Input
                      id="fakturacnaAdresa"
                      value={formData.onboardingData?.fakturacneUdaje?.fakturacnaAdresa || ''}
                      readOnly
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sposobUhrady">Spôsob úhrady</Label>
                      <Input
                        id="sposobUhrady"
                        value={formData.onboardingData?.fakturacneUdaje?.sposobUhrady || ''}
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="frekvencia">Frekvencia</Label>
                      <Input
                        id="frekvencia"
                        value={formData.onboardingData?.fakturacneUdaje?.frekvencia || ''}
                        readOnly
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="flex justify-end space-x-2">
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
