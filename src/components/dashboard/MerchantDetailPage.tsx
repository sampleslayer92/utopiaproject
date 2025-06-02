
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  CreditCard, 
  Settings, 
  FileText, 
  Edit, 
  Save, 
  X,
  User,
  Smartphone,
  DollarSign
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Extended merchant interface with onboarding data
interface ExtendedMerchant {
  id: string;
  // Basic info
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
  
  // Company info from onboarding
  ico: string;
  nazovSpolocnosti: string;
  dic: string;
  icDph: string;
  sidlo: string;
  zapisVOrsr: string;
  predmetCinnosti: string;
  
  // Business info
  nazovPrevadzky: string;
  adresaPrevadzky: string;
  mesto: string;
  psc: string;
  typPrevadzky: "Kamenná" | "Mobilná" | "Online" | "Iná";
  predmetPodnikania: string;
  otvaracieHodiny: string;
  sezonnost: boolean;
  trvanieSezony: number;
  odhadovanyRocnyObrat: number;
  priemernaVyskaTransakcie: number;
  ocakavanyObratKariet: number;
  hasWifi: boolean;
  hasSimCard: boolean;
  hasEthernet: boolean;
  
  // Financial info
  monthlyRevenue: number;
  totalRevenue: number;
  devicesCount: number;
  locationsCount: number;
  
  // Contacts
  obchodneOsoby: Array<{
    id: string;
    meno: string;
    email: string;
    telefon: string;
    funkcia: string;
  }>;
  
  technickeOsoby: Array<{
    id: string;
    meno: string;
    email: string;
    telefon: string;
    funkcia: string;
  }>;
  
  // Billing
  fakturacnyEmail: string;
  fakturacnaAdresa: string;
  iban: string;
  sposobUhrady: "Faktúra" | "Strhnutie z obratu" | "Predfaktúra";
  frekvencia: "Mesačne" | "Ročne" | "Polročne";
  
  createdAt: string;
  lastActivity: string;
}

// Mock data with full onboarding information
const mockMerchantDetail: ExtendedMerchant = {
  id: 'client-1',
  name: 'Reštaurácia U Jána',
  email: 'jan@restaurant.sk',
  phone: '+421 900 123 456',
  status: 'active',
  
  // Company info
  ico: '12345678',
  nazovSpolocnosti: 'Reštaurácia U Jána s.r.o.',
  dic: '2023456789',
  icDph: 'SK2023456789',
  sidlo: 'Hlavná 15, 811 01 Bratislava',
  zapisVOrsr: 'Obchodný register Okresného súdu Bratislava I, oddiel: Sro, vložka číslo: 12345/B',
  predmetCinnosti: 'Poskytovanie služieb v oblasti stravovania',
  
  // Business info
  nazovPrevadzky: 'Reštaurácia U Jána - Hlavná prevádzka',
  adresaPrevadzky: 'Hlavná 15, Bratislava',
  mesto: 'Bratislava',
  psc: '811 01',
  typPrevadzky: 'Kamenná',
  predmetPodnikania: 'Reštauračné služby a gastronómia',
  otvaracieHodiny: 'Po-Ne 10:00-22:00',
  sezonnost: false,
  trvanieSezony: 0,
  odhadovanyRocnyObrat: 180000,
  priemernaVyskaTransakcie: 25,
  ocakavanyObratKariet: 70,
  hasWifi: true,
  hasSimCard: false,
  hasEthernet: true,
  
  // Financial
  monthlyRevenue: 3800,
  totalRevenue: 45000,
  devicesCount: 8,
  locationsCount: 2,
  
  // Contacts
  obchodneOsoby: [
    {
      id: 'contact-1',
      meno: 'Ján Novák',
      email: 'jan.novak@restaurant.sk',
      telefon: '+421 900 123 456',
      funkcia: 'Majiteľ'
    }
  ],
  
  technickeOsoby: [
    {
      id: 'tech-1',
      meno: 'Peter Technický',
      email: 'peter.tech@restaurant.sk',
      telefon: '+421 905 654 321',
      funkcia: 'IT správca'
    }
  ],
  
  // Billing
  fakturacnyEmail: 'faktury@restaurant.sk',
  fakturacnaAdresa: 'Hlavná 15, 811 01 Bratislava',
  iban: 'SK89 0200 0000 0012 3456 7890',
  sposobUhrady: 'Faktúra',
  frekvencia: 'Mesačne',
  
  createdAt: '2024-01-15',
  lastActivity: '2024-11-28T14:30:00Z'
};

export const MerchantDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [merchantData, setMerchantData] = useState<ExtendedMerchant>(mockMerchantDetail);

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving merchant data:', merchantData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setMerchantData(mockMerchantDetail);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  // Only admins and business partners can see this page
  if (!user || (user.role !== 'admin' && user.role !== 'business_partner')) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Nemáte oprávnenie na zobrazenie tejto stránky.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard/merchants')}
          >
            ← Späť na zoznam
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {merchantData.name}
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className={getStatusColor(merchantData.status)}>
                {merchantData.status === 'active' ? 'Aktívny' : 
                 merchantData.status === 'inactive' ? 'Neaktívny' : 'Pozastavený'}
              </Badge>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-500">
                Vytvorený {new Date(merchantData.createdAt).toLocaleDateString('sk-SK')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Zrušiť
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Uložiť
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Editovať
            </Button>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesačné tržby</p>
                <p className="text-2xl font-bold">€{merchantData.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Smartphone className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Zariadenia</p>
                <p className="text-2xl font-bold">{merchantData.devicesCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lokácie</p>
                <p className="text-2xl font-bold">{merchantData.locationsCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkové tržby</p>
                <p className="text-2xl font-bold">€{merchantData.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company">Spoločnosť</TabsTrigger>
          <TabsTrigger value="business">Prevádzka</TabsTrigger>
          <TabsTrigger value="contacts">Kontakty</TabsTrigger>
          <TabsTrigger value="billing">Fakturácia</TabsTrigger>
          <TabsTrigger value="activity">Aktivita</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Informácie o spoločnosti
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nazovSpolocnosti">Názov spoločnosti</Label>
                  {isEditing ? (
                    <Input 
                      id="nazovSpolocnosti"
                      value={merchantData.nazovSpolocnosti}
                      onChange={(e) => setMerchantData({...merchantData, nazovSpolocnosti: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.nazovSpolocnosti}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="ico">IČO</Label>
                  {isEditing ? (
                    <Input 
                      id="ico"
                      value={merchantData.ico}
                      onChange={(e) => setMerchantData({...merchantData, ico: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.ico}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="dic">DIČ</Label>
                  {isEditing ? (
                    <Input 
                      id="dic"
                      value={merchantData.dic}
                      onChange={(e) => setMerchantData({...merchantData, dic: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.dic}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="icDph">IČ DPH</Label>
                  {isEditing ? (
                    <Input 
                      id="icDph"
                      value={merchantData.icDph}
                      onChange={(e) => setMerchantData({...merchantData, icDph: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.icDph}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="sidlo">Sídlo</Label>
                {isEditing ? (
                  <Textarea 
                    id="sidlo"
                    value={merchantData.sidlo}
                    onChange={(e) => setMerchantData({...merchantData, sidlo: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.sidlo}</p>
                )}
              </div>
              <div>
                <Label htmlFor="zapisVOrsr">Zápis v OR SR</Label>
                {isEditing ? (
                  <Textarea 
                    id="zapisVOrsr"
                    value={merchantData.zapisVOrsr}
                    onChange={(e) => setMerchantData({...merchantData, zapisVOrsr: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.zapisVOrsr}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Informácie o prevádzke
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nazovPrevadzky">Názov prevádzky</Label>
                  {isEditing ? (
                    <Input 
                      id="nazovPrevadzky"
                      value={merchantData.nazovPrevadzky}
                      onChange={(e) => setMerchantData({...merchantData, nazovPrevadzky: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.nazovPrevadzky}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="typPrevadzky">Typ prevádzky</Label>
                  {isEditing ? (
                    <Select 
                      value={merchantData.typPrevadzky}
                      onValueChange={(value: "Kamenná" | "Mobilná" | "Online" | "Iná") => 
                        setMerchantData({...merchantData, typPrevadzky: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kamenná">Kamenná</SelectItem>
                        <SelectItem value="Mobilná">Mobilná</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Iná">Iná</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.typPrevadzky}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="mesto">Mesto</Label>
                  {isEditing ? (
                    <Input 
                      id="mesto"
                      value={merchantData.mesto}
                      onChange={(e) => setMerchantData({...merchantData, mesto: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.mesto}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="psc">PSČ</Label>
                  {isEditing ? (
                    <Input 
                      id="psc"
                      value={merchantData.psc}
                      onChange={(e) => setMerchantData({...merchantData, psc: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.psc}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="otvaracieHodiny">Otváracie hodiny</Label>
                  {isEditing ? (
                    <Input 
                      id="otvaracieHodiny"
                      value={merchantData.otvaracieHodiny}
                      onChange={(e) => setMerchantData({...merchantData, otvaracieHodiny: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.otvaracieHodiny}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="odhadovanyRocnyObrat">Odhadovaný ročný obrat (€)</Label>
                  {isEditing ? (
                    <Input 
                      id="odhadovanyRocnyObrat"
                      type="number"
                      value={merchantData.odhadovanyRocnyObrat}
                      onChange={(e) => setMerchantData({...merchantData, odhadovanyRocnyObrat: parseInt(e.target.value)})}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">€{merchantData.odhadovanyRocnyObrat.toLocaleString()}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="adresaPrevadzky">Adresa prevádzky</Label>
                {isEditing ? (
                  <Textarea 
                    id="adresaPrevadzky"
                    value={merchantData.adresaPrevadzky}
                    onChange={(e) => setMerchantData({...merchantData, adresaPrevadzky: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.adresaPrevadzky}</p>
                )}
              </div>
              <div>
                <Label htmlFor="predmetPodnikania">Predmet podnikania</Label>
                {isEditing ? (
                  <Textarea 
                    id="predmetPodnikania"
                    value={merchantData.predmetPodnikania}
                    onChange={(e) => setMerchantData({...merchantData, predmetPodnikania: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.predmetPodnikania}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Obchodné osoby
                </CardTitle>
              </CardHeader>
              <CardContent>
                {merchantData.obchodneOsoby.map((osoba) => (
                  <div key={osoba.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label>Meno</Label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{osoba.meno}</p>
                    </div>
                    <div>
                      <Label>Funkcia</Label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{osoba.funkcia}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{osoba.email}</p>
                    </div>
                    <div>
                      <Label>Telefón</Label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{osoba.telefon}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Technické osoby
                </CardTitle>
              </CardHeader>
              <CardContent>
                {merchantData.technickeOsoby.map((osoba) => (
                  <div key={osoba.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label>Meno</Label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{osoba.meno}</p>
                    </div>
                    <div>
                      <Label>Funkcia</Label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{osoba.funkcia}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{osoba.email}</p>
                    </div>
                    <div>
                      <Label>Telefón</Label>
                      <p className="text-sm text-gray-900 dark:text-white mt-1">{osoba.telefon}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Fakturačné údaje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fakturacnyEmail">Fakturačný email</Label>
                  {isEditing ? (
                    <Input 
                      id="fakturacnyEmail"
                      type="email"
                      value={merchantData.fakturacnyEmail}
                      onChange={(e) => setMerchantData({...merchantData, fakturacnyEmail: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.fakturacnyEmail}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="iban">IBAN</Label>
                  {isEditing ? (
                    <Input 
                      id="iban"
                      value={merchantData.iban}
                      onChange={(e) => setMerchantData({...merchantData, iban: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.iban}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="sposobUhrady">Spôsob úhrady</Label>
                  {isEditing ? (
                    <Select 
                      value={merchantData.sposobUhrady}
                      onValueChange={(value: "Faktúra" | "Strhnutie z obratu" | "Predfaktúra") => 
                        setMerchantData({...merchantData, sposobUhrady: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Faktúra">Faktúra</SelectItem>
                        <SelectItem value="Strhnutie z obratu">Strhnutie z obratu</SelectItem>
                        <SelectItem value="Predfaktúra">Predfaktúra</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.sposobUhrady}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="frekvencia">Frekvencia</Label>
                  {isEditing ? (
                    <Select 
                      value={merchantData.frekvencia}
                      onValueChange={(value: "Mesačne" | "Ročne" | "Polročne") => 
                        setMerchantData({...merchantData, frekvencia: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mesačne">Mesačne</SelectItem>
                        <SelectItem value="Ročne">Ročne</SelectItem>
                        <SelectItem value="Polročne">Polročne</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.frekvencia}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="fakturacnaAdresa">Fakturačná adresa</Label>
                {isEditing ? (
                  <Textarea 
                    id="fakturacnaAdresa"
                    value={merchantData.fakturacnaAdresa}
                    onChange={(e) => setMerchantData({...merchantData, fakturacnaAdresa: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{merchantData.fakturacnaAdresa}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                História aktivity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Posledná aktivita</p>
                    <p className="text-sm text-gray-500">
                      {new Date(merchantData.lastActivity).toLocaleString('sk-SK')}
                    </p>
                  </div>
                  <Badge variant="outline">Aktívny</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Registrácia dokončená</p>
                    <p className="text-sm text-gray-500">
                      {new Date(merchantData.createdAt).toLocaleString('sk-SK')}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Dokončené</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Onboarding spustený</p>
                    <p className="text-sm text-gray-500">
                      {new Date(merchantData.createdAt).toLocaleString('sk-SK')}
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Spustený</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
