
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Save, Download, X } from 'lucide-react';
import { toast } from 'sonner';

interface ContractFormData {
  // Základné informácie
  title: string;
  contractNumber: string;
  type: string;
  status: string;
  description: string;
  
  // Klient informácie
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  contactPerson: string;
  
  // Finančné údaje
  value: number;
  currency: string;
  paymentTerms: string;
  
  // Dátumy
  startDate: string;
  endDate: string;
  
  // Služby a produkty
  services: string[];
  products: string[];
  
  // Obchodník
  assignedSalesperson: string;
}

interface ContractFormProps {
  contract?: any;
  isEdit?: boolean;
  onSave: (data: ContractFormData) => void;
  onCancel: () => void;
}

export const ContractForm: React.FC<ContractFormProps> = ({ 
  contract, 
  isEdit = false, 
  onSave, 
  onCancel 
}) => {
  const form = useForm<ContractFormData>({
    defaultValues: contract || {
      title: '',
      contractNumber: '',
      type: 'service',
      status: 'pending',
      description: '',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      clientAddress: '',
      contactPerson: '',
      value: 0,
      currency: 'EUR',
      paymentTerms: 'monthly',
      startDate: '',
      endDate: '',
      services: [],
      products: [],
      assignedSalesperson: ''
    }
  });

  const [selectedServices, setSelectedServices] = useState<string[]>(contract?.services || []);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(contract?.products || []);

  const availableServices = [
    'POS Systém',
    'Online platby',
    'Inventúra',
    'CRM systém',
    'Analytika',
    'Technická podpora'
  ];

  const availableProducts = [
    'POS terminál',
    'Platobný terminál',
    'Tablet',
    'Tlačiareň',
    'Čítačka kariet',
    'Mobilná aplikácia'
  ];

  const teamMembers = [
    { id: 'team-1', name: 'Peter Manažér' },
    { id: 'team-2', name: 'Mária Obchodná' },
    { id: 'team-3', name: 'Tomáš Technik' },
    { id: 'team-4', name: 'Jana Konzultantka' }
  ];

  const handleSubmit = (data: ContractFormData) => {
    const contractData = {
      ...data,
      services: selectedServices,
      products: selectedProducts
    };
    
    onSave(contractData);
    toast.success(isEdit ? 'Zmluva bola úspešne aktualizovaná' : 'Nová zmluva bola vytvorená');
  };

  const handleGeneratePDF = () => {
    toast.success('PDF zmluva sa generuje...');
    // Tu by bola implementácia generovania PDF
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const toggleProduct = (product: string) => {
    setSelectedProducts(prev => 
      prev.includes(product) 
        ? prev.filter(p => p !== product)
        : [...prev, product]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {isEdit ? 'Upraviť zmluvu' : 'Nová zmluva'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isEdit ? 'Aktualizujte údaje zmluvy' : 'Vytvorte novú zmluvu pre merchanta'}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Zrušiť
          </Button>
          {isEdit && (
            <Button variant="outline" onClick={handleGeneratePDF}>
              <Download className="h-4 w-4 mr-2" />
              Generovať PDF
            </Button>
          )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Základné informácie */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Základné informácie</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Názov zmluvy</FormLabel>
                      <FormControl>
                        <Input placeholder="Názov zmluvy..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contractNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Číslo zmluvy</FormLabel>
                      <FormControl>
                        <Input placeholder="CT-2024-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Typ zmluvy</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Vyberte typ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hardware">Hardware</SelectItem>
                          <SelectItem value="software">Software</SelectItem>
                          <SelectItem value="service">Služby</SelectItem>
                          <SelectItem value="maintenance">Údržba</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Vyberte status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Čakajúca</SelectItem>
                          <SelectItem value="active">Aktívna</SelectItem>
                          <SelectItem value="expired">Expirovaná</SelectItem>
                          <SelectItem value="terminated">Ukončená</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Popis</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Popis zmluvy..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Klient informácie */}
            <Card>
              <CardHeader>
                <CardTitle>Informácie o klientovi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Názov klienta</FormLabel>
                      <FormControl>
                        <Input placeholder="Názov firmy..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefón</FormLabel>
                      <FormControl>
                        <Input placeholder="+421 xxx xxx xxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clientAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresa</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Adresa klienta..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kontaktná osoba</FormLabel>
                      <FormControl>
                        <Input placeholder="Meno kontaktnej osoby..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Finančné údaje */}
            <Card>
              <CardHeader>
                <CardTitle>Finančné údaje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hodnota zmluvy</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mena</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Vyberte menu" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="CZK">CZK</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platobné podmienky</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Vyberte platobné podmienky" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Mesačne</SelectItem>
                          <SelectItem value="quarterly">Štvrťročne</SelectItem>
                          <SelectItem value="yearly">Ročne</SelectItem>
                          <SelectItem value="one-time">Jednorazovo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Dátumy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Časové údaje</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dátum začiatku</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dátum ukončenia</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignedSalesperson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priradený obchodník</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Vyberte obchodníka" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teamMembers.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Služby a produkty */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Služby</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {availableServices.map((service) => (
                    <div
                      key={service}
                      onClick={() => toggleService(service)}
                      className="cursor-pointer"
                    >
                      <Badge
                        variant={selectedServices.includes(service) ? "default" : "outline"}
                        className="mr-2 mb-2"
                      >
                        {service}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Produkty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {availableProducts.map((product) => (
                    <div
                      key={product}
                      onClick={() => toggleProduct(product)}
                      className="cursor-pointer"
                    >
                      <Badge
                        variant={selectedProducts.includes(product) ? "default" : "outline"}
                        className="mr-2 mb-2"
                      >
                        {product}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit button */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Zrušiť
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {isEdit ? 'Aktualizovať zmluvu' : 'Vytvoriť zmluvu'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
