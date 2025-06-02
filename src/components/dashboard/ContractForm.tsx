
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
import { Calendar, FileText, Save, Download, X, Building, MapPin, Users, CreditCard, FileSignature } from 'lucide-react';
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

  // Rozšírené firemné údaje
  companyName: string;
  ico: string;
  dic: string;
  companyAddress: string;
  
  // Prevádzky
  locations: Array<{
    name: string;
    address: string;
    type: string;
    contactPerson: string;
  }>;
  
  // Osoby
  persons: Array<{
    name: string;
    position: string;
    email: string;
    phone: string;
    role: string;
  }>;
  
  // Fakturácia
  billingAddress: string;
  billingEmail: string;
  paymentMethod: string;
  bankAccount: string;
  
  // Digitálny podpis (read-only)
  signatureData?: {
    signedBy: string;
    signedAt: string;
    ipAddress: string;
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
      assignedSalesperson: '',
      companyName: '',
      ico: '',
      dic: '',
      companyAddress: '',
      locations: [],
      persons: [],
      billingAddress: '',
      billingEmail: '',
      paymentMethod: 'bank_transfer',
      bankAccount: ''
    }
  });

  const [selectedServices, setSelectedServices] = useState<string[]>(contract?.services || []);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(contract?.products || []);
  const [locations, setLocations] = useState(contract?.locations || [{ name: '', address: '', type: 'main', contactPerson: '' }]);
  const [persons, setPersons] = useState(contract?.persons || [{ name: '', position: '', email: '', phone: '', role: 'contact' }]);

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

  const addLocation = () => {
    setLocations([...locations, { name: '', address: '', type: 'branch', contactPerson: '' }]);
  };

  const removeLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const addPerson = () => {
    setPersons([...persons, { name: '', position: '', email: '', phone: '', role: 'authorized' }]);
  };

  const removePerson = (index: number) => {
    setPersons(persons.filter((_, i) => i !== index));
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
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Názov spoločnosti</FormLabel>
                    <FormControl>
                      <Input placeholder="Názov spoločnosti..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ico"
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
                name="dic"
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

              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="companyAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresa spoločnosti</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Adresa spoločnosti..." {...field} />
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
                <Button type="button" variant="outline" size="sm" onClick={addLocation}>
                  Pridať prevádzku
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <Input
                    placeholder="Názov prevádzky"
                    value={location.name}
                    onChange={(e) => {
                      const newLocations = [...locations];
                      newLocations[index].name = e.target.value;
                      setLocations(newLocations);
                    }}
                  />
                  <Input
                    placeholder="Adresa"
                    value={location.address}
                    onChange={(e) => {
                      const newLocations = [...locations];
                      newLocations[index].address = e.target.value;
                      setLocations(newLocations);
                    }}
                  />
                  <Select
                    value={location.type}
                    onValueChange={(value) => {
                      const newLocations = [...locations];
                      newLocations[index].type = value;
                      setLocations(newLocations);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Hlavná</SelectItem>
                      <SelectItem value="branch">Pobočka</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Kontaktná osoba"
                      value={location.contactPerson}
                      onChange={(e) => {
                        const newLocations = [...locations];
                        newLocations[index].contactPerson = e.target.value;
                        setLocations(newLocations);
                      }}
                    />
                    {locations.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeLocation(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Osoby */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Osoby</span>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addPerson}>
                  Pridať osobu
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {persons.map((person, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
                  <Input
                    placeholder="Meno a priezvisko"
                    value={person.name}
                    onChange={(e) => {
                      const newPersons = [...persons];
                      newPersons[index].name = e.target.value;
                      setPersons(newPersons);
                    }}
                  />
                  <Input
                    placeholder="Pozícia"
                    value={person.position}
                    onChange={(e) => {
                      const newPersons = [...persons];
                      newPersons[index].position = e.target.value;
                      setPersons(newPersons);
                    }}
                  />
                  <Input
                    placeholder="Email"
                    value={person.email}
                    onChange={(e) => {
                      const newPersons = [...persons];
                      newPersons[index].email = e.target.value;
                      setPersons(newPersons);
                    }}
                  />
                  <Input
                    placeholder="Telefón"
                    value={person.phone}
                    onChange={(e) => {
                      const newPersons = [...persons];
                      newPersons[index].phone = e.target.value;
                      setPersons(newPersons);
                    }}
                  />
                  <div className="flex gap-2">
                    <Select
                      value={person.role}
                      onValueChange={(value) => {
                        const newPersons = [...persons];
                        newPersons[index].role = value;
                        setPersons(newPersons);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contact">Kontakt</SelectItem>
                        <SelectItem value="authorized">Oprávnená osoba</SelectItem>
                        <SelectItem value="technical">Technický kontakt</SelectItem>
                      </SelectContent>
                    </Select>
                    {persons.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePerson(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
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

          {/* Fakturácia */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Fakturácia</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="billingAddress"
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

              <FormField
                control={form.control}
                name="billingEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email pre faktúry</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="billing@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
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
                        <SelectItem value="card">Platobná karta</SelectItem>
                        <SelectItem value="cash">Hotovosť</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bankAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Číslo účtu</FormLabel>
                    <FormControl>
                      <Input placeholder="SK89 1200 0000 1987 4263 7541" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Digitálny podpis (read-only pre editáciu) */}
          {isEdit && contract?.signatureData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileSignature className="h-5 w-5" />
                  <span>Digitálny podpis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><strong>Podpísal:</strong> {contract.signatureData.signedBy}</p>
                  <p><strong>Dátum:</strong> {new Date(contract.signatureData.signedAt).toLocaleString('sk-SK')}</p>
                  <p><strong>IP adresa:</strong> {contract.signatureData.ipAddress}</p>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Platne podpísané
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Finančné údaje a ostatné */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
