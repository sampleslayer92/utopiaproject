
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
import { Calendar, FileText, Save, Download, X, Building, MapPin, Users, CreditCard, FileSignature, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ContractFormData {
  // Základné informácie
  title: string;
  contractNumber: string;
  type: string;
  status: string;
  description: string;
  
  // Firemné údaje
  companyInfo: {
    name: string;
    ico: string;
    dic: string;
    address: string;
    email: string;
    phone: string;
  };
  
  // Prevádzky
  locations: {
    id: string;
    name: string;
    address: string;
    contact: string;
  }[];
  
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
  
  // Osoby
  persons: {
    name: string;
    position: string;
    email: string;
    phone: string;
  }[];
  
  // Fakturácia
  billing: {
    invoiceAddress: string;
    paymentMethod: string;
    paymentTerms: string;
  };
  
  // Obchodník
  assignedSalesperson: string;
  
  // Digitálny podpis (read-only)
  digitalSignature?: {
    signedAt: string;
    signedBy: string;
    documentHash: string;
  };
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
      companyInfo: {
        name: '',
        ico: '',
        dic: '',
        address: '',
        email: '',
        phone: ''
      },
      locations: [],
      value: 0,
      currency: 'EUR',
      paymentTerms: 'monthly',
      startDate: '',
      endDate: '',
      services: [],
      products: [],
      persons: [],
      billing: {
        invoiceAddress: '',
        paymentMethod: 'bank_transfer',
        paymentTerms: 'net_30'
      },
      assignedSalesperson: ''
    }
  });

  const [selectedServices, setSelectedServices] = useState<string[]>(contract?.services || []);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(contract?.products || []);
  const [locations, setLocations] = useState(contract?.locations || []);
  const [persons, setPersons] = useState(contract?.persons || []);

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
      products: selectedProducts,
      locations,
      persons
    };
    
    onSave(contractData);
    toast.success(isEdit ? 'Zmluva bola úspešne aktualizovaná' : 'Nová zmluva bola vytvorená');
  };

  const handleGeneratePDF = () => {
    toast.success('PDF zmluva sa generuje...');
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

  const addLocation = () => {
    setLocations(prev => [...prev, {
      id: `loc-${Date.now()}`,
      name: '',
      address: '',
      contact: ''
    }]);
  };

  const removeLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const updateLocation = (id: string, field: string, value: string) => {
    setLocations(prev => prev.map(loc => 
      loc.id === id ? { ...loc, [field]: value } : loc
    ));
  };

  const addPerson = () => {
    setPersons(prev => [...prev, {
      name: '',
      position: '',
      email: '',
      phone: ''
    }]);
  };

  const removePerson = (index: number) => {
    setPersons(prev => prev.filter((_, i) => i !== index));
  };

  const updatePerson = (index: number, field: string, value: string) => {
    setPersons(prev => prev.map((person, i) => 
      i === index ? { ...person, [field]: value } : person
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {isEdit ? 'Upraviť zmluvu' : 'Nová zmluva'}
          </h2>
          <p className="text-gray-600">
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
          {/* Základné informácie */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Základné informácie</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="md:col-span-2">
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
              </div>
            </CardContent>
          </Card>

          {/* Firemné údaje */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Firemné údaje</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyInfo.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Názov firmy</FormLabel>
                    <FormControl>
                      <Input placeholder="Názov firmy..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyInfo.ico"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IČO</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyInfo.dic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DIČ</FormLabel>
                    <FormControl>
                      <Input placeholder="SK1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyInfo.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@firma.sk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyInfo.phone"
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

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="companyInfo.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresa</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Adresa firmy..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Prevádzky */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Prevádzky</span>
                </div>
                <Button type="button" onClick={addLocation} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Pridať prevádzku
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {locations.map((location) => (
                <div key={location.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                  <Input
                    placeholder="Názov prevádzky"
                    value={location.name}
                    onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Adresa"
                    value={location.address}
                    onChange={(e) => updateLocation(location.id, 'address', e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Kontakt"
                      value={location.contact}
                      onChange={(e) => updateLocation(location.id, 'contact', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeLocation(location.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {locations.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Žiadne prevádzky. Kliknite na "Pridať prevádzku" pre pridanie novej.
                </p>
              )}
            </CardContent>
          </Card>

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

          {/* Osoby */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Kontaktné osoby</span>
                </div>
                <Button type="button" onClick={addPerson} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Pridať osobu
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {persons.map((person, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <Input
                    placeholder="Meno a priezvisko"
                    value={person.name}
                    onChange={(e) => updatePerson(index, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Pozícia"
                    value={person.position}
                    onChange={(e) => updatePerson(index, 'position', e.target.value)}
                  />
                  <Input
                    placeholder="Email"
                    value={person.email}
                    onChange={(e) => updatePerson(index, 'email', e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Telefón"
                      value={person.phone}
                      onChange={(e) => updatePerson(index, 'phone', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removePerson(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {persons.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Žiadne kontaktné osoby. Kliknite na "Pridať osobu" pre pridanie novej.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Fakturácia */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Fakturácia</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="billing.invoiceAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fakturačná adresa</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Fakturačná adresa..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="billing.paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spôsob platby</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Vyberte spôsob platby" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bank_transfer">Bankový prevod</SelectItem>
                        <SelectItem value="card">Kartou</SelectItem>
                        <SelectItem value="cash">Hotovosť</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billing.paymentTerms"
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
                        <SelectItem value="net_14">14 dní</SelectItem>
                        <SelectItem value="net_30">30 dní</SelectItem>
                        <SelectItem value="net_60">60 dní</SelectItem>
                        <SelectItem value="immediate">Okamžite</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            </CardContent>
          </Card>

          {/* Časové údaje a obchodník */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Časové údaje a priradenie</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Digitálny podpis - read-only */}
          {isEdit && contract?.digitalSignature && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileSignature className="h-5 w-5" />
                  <span>Digitálny podpis</span>
                  <Badge variant="secondary">Read-only</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Podpísané dňa</Label>
                  <p className="text-sm">{new Date(contract.digitalSignature.signedAt).toLocaleString('sk-SK')}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Podpísal</Label>
                  <p className="text-sm">{contract.digitalSignature.signedBy}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Hash dokumentu</Label>
                  <p className="text-xs font-mono text-gray-600">{contract.digitalSignature.documentHash}</p>
                </div>
              </CardContent>
            </Card>
          )}

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
