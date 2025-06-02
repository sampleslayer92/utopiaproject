
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Edit, 
  Download, 
  Calendar,
  User,
  Building,
  CreditCard,
  FileText,
  MapPin,
  Phone,
  Mail,
  Euro,
  Settings,
  Users,
  Package
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getExtendedContract } from '@/data/extendedContractData';
import { EditExtendedContractDialog } from './EditExtendedContractDialog';
import { ExtendedContract } from '@/types/contract';
import { toast } from 'sonner';

export const ContractDetailPage: React.FC = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [contract, setContract] = useState<ExtendedContract | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  React.useEffect(() => {
    if (contractId) {
      const foundContract = getExtendedContract(contractId);
      setContract(foundContract || null);
    }
  }, [contractId]);

  const handleSaveContract = (updatedContract: ExtendedContract) => {
    setContract(updatedContract);
    toast.success('Zmluva bola úspešne aktualizovaná');
  };

  if (!user || !contract) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Zmluva sa nenašla alebo nemáte oprávnenie na zobrazenie.
        </p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'cancelled': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sk-SK');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/dashboard/contracts')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Späť na zmluvy</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {contract.contractNumber}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Klient: {contract.clientName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className={getStatusColor(contract.status)}>
            {contract.status === 'active' && 'Aktívna'}
            {contract.status === 'pending' && 'Čakajúca'}
            {contract.status === 'expired' && 'Expirovaná'}
            {contract.status === 'cancelled' && 'Zrušená'}
          </Badge>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Stiahnuť PDF</span>
          </Button>
          <Button 
            onClick={() => setEditDialogOpen(true)}
            className="flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Upraviť</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Prehľad</TabsTrigger>
          <TabsTrigger value="company">Spoločnosť</TabsTrigger>
          <TabsTrigger value="operation">Prevádzka</TabsTrigger>
          <TabsTrigger value="products">Produkty</TabsTrigger>
          <TabsTrigger value="persons">Osoby</TabsTrigger>
          <TabsTrigger value="financial">Financie</TabsTrigger>
          <TabsTrigger value="history">História</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Detaily zmluvy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Číslo zmluvy
                    </label>
                    <p className="font-semibold">{contract.contractNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Typ zmluvy
                    </label>
                    <p className="font-semibold">{contract.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Začiatok platnosti
                    </label>
                    <p className="font-semibold">{formatDate(contract.startDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Koniec platnosti
                    </label>
                    <p className="font-semibold">{formatDate(contract.endDate)}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Poznámky
                  </label>
                  <p className="text-sm">{contract.notes || 'Žiadne poznámky'}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Euro className="h-5 w-5" />
                  <span>Finančné údaje</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Celková hodnota
                    </label>
                    <p className="text-2xl font-bold text-green-600">
                      €{contract.value.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Mesačný poplatok
                    </label>
                    <p className="text-xl font-semibold">
                      €{contract.monthlyFee.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Provízia
                    </label>
                    <p className="font-semibold">
                      {(contract.commissionRate * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Podpísal
                    </label>
                    <p className="font-semibold">{contract.signedBy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Údaje o spoločnosti</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Názov spoločnosti
                    </label>
                    <p className="text-lg font-semibold">{contract.onboardingData.company.nazovSpolocnosti}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      IČO
                    </label>
                    <p className="font-medium">{contract.onboardingData.company.ico}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      DIČ
                    </label>
                    <p className="font-medium">{contract.onboardingData.company.dic}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      IČ DPH
                    </label>
                    <p className="font-medium">{contract.onboardingData.company.icDph}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Sídlo spoločnosti
                    </label>
                    <p className="font-medium">{contract.onboardingData.company.sidlo}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Zápis v OR SR
                    </label>
                    <p className="font-medium text-sm">{contract.onboardingData.company.zapisVOrsr}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Predmet činnosti
                    </label>
                    <p className="font-medium">{contract.onboardingData.company.predmetCinnosti}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operation" className="space-y-6">
          {contract.onboardingData.prevadzky.map((prevadzka, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{prevadzka.nazovPrevadzky}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Adresa prevádzky
                      </label>
                      <p className="font-medium">{prevadzka.adresaPrevadzky}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Mesto
                        </label>
                        <p className="font-medium">{prevadzka.mesto}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          PSČ
                        </label>
                        <p className="font-medium">{prevadzka.psc}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{prevadzka.telefon}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{prevadzka.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Typ prevádzky
                      </label>
                      <p className="font-medium">{prevadzka.typPrevadzky}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Otváracie hodiny
                      </label>
                      <p className="font-medium">{prevadzka.otvaracieHodiny}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Ročný obrat
                        </label>
                        <p className="font-medium">€{prevadzka.odhadovanyRocnyObrat.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Priemerná transakcia
                        </label>
                        <p className="font-medium">€{prevadzka.priemernaVyskaTransakcie}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connectivity info */}
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-3">Pripojenie</h4>
                  <div className="flex space-x-4">
                    <Badge variant={prevadzka.hasWifi ? "default" : "secondary"}>
                      WiFi: {prevadzka.hasWifi ? "Áno" : "Nie"}
                    </Badge>
                    <Badge variant={prevadzka.hasSimCard ? "default" : "secondary"}>
                      SIM: {prevadzka.hasSimCard ? "Áno" : "Nie"}
                    </Badge>
                    <Badge variant={prevadzka.hasEthernet ? "default" : "secondary"}>
                      Ethernet: {prevadzka.hasEthernet ? "Áno" : "Nie"}
                    </Badge>
                  </div>
                </div>

                {/* Bank accounts */}
                {prevadzka.bankovyUcet && prevadzka.bankovyUcet.length > 0 && (
                  <div className="mt-6 pt-4 border-t">
                    <h4 className="font-medium mb-3">Bankové účty</h4>
                    <div className="space-y-2">
                      {prevadzka.bankovyUcet.map((ucet, ucetIndex) => (
                        <div key={ucetIndex} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="font-medium">{ucet.nazov}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">IBAN: {ucet.iban}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Mena: {ucet.mena}</p>
                          {ucet.swift && <p className="text-sm text-gray-600 dark:text-gray-400">SWIFT: {ucet.swift}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Devices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Zariadenia</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contract.onboardingData.zariadenia.filter(z => z.selected).map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{device.nazov}</p>
                          <p className="text-sm text-gray-500">
                            Počet: {device.pocetKs} | {device.typNakupu} | {device.viazanost} mesiacov
                          </p>
                          {device.seriove_cislo && (
                            <p className="text-sm text-gray-500">SN: {device.seriove_cislo}</p>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline">{device.frekvenciaPlatby}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Software Licenses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Softvérové licencie</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {contract.onboardingData.licencie.filter(l => l.selected).map((license, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <p className="font-medium">{license.nazov}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Platobné metódy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {contract.onboardingData.platobneMetody.filter(p => p.selected).map((method, index) => (
                    <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="font-medium">{method.nazov}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Services */}
            <Card>
              <CardHeader>
                <CardTitle>Doplnkové služby</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {contract.onboardingData.doplnkoveSluzby.filter(s => s.selected).map((service, index) => (
                    <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="font-medium">{service.nazov}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="persons" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Business Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Obchodné kontakty</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contract.onboardingData.obchodneOsoby.map((person, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <User className="h-5 w-5 text-blue-500 mt-1" />
                        <div className="flex-1">
                          <p className="font-semibold">{person.meno}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{person.funkcia}</p>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{person.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{person.telefon}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technical Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Technické kontakty</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contract.onboardingData.technickeOsoby.map((person, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <User className="h-5 w-5 text-green-500 mt-1" />
                        <div className="flex-1">
                          <p className="font-semibold">{person.meno}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{person.funkcia}</p>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{person.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{person.telefon}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Authorized Persons */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Oprávnené osoby</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contract.onboardingData.opravneneOsoby.map((person, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-lg">{person.meno}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{person.funkcia}</p>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm"><span className="font-medium">Rodné číslo:</span> {person.rodneCislo}</p>
                            <p className="text-sm"><span className="font-medium">Občianstvo:</span> {person.obcianstvo}</p>
                            <p className="text-sm"><span className="font-medium">Doklad:</span> {person.typDokladu} - {person.cisloDokladu}</p>
                          </div>
                        </div>
                        <div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{person.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{person.telefon}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{person.adresaTrvalehoBydliska}</span>
                            </div>
                          </div>
                          {person.politickyExponovana && (
                            <Badge variant="destructive" className="mt-2">
                              Politicky exponovaná osoba
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Euro className="h-5 w-5" />
                <span>Fakturačné údaje</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Fakturačný email
                    </label>
                    <p className="font-medium">{contract.onboardingData.fakturacneUdaje.fakturacnyEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Fakturačná adresa
                    </label>
                    <p className="font-medium">{contract.onboardingData.fakturacneUdaje.fakturacnaAdresa}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      IBAN
                    </label>
                    <p className="font-medium font-mono">{contract.onboardingData.fakturacneUdaje.iban}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Spôsob úhrady
                    </label>
                    <p className="font-medium">{contract.onboardingData.fakturacneUdaje.sposobUhrady}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Frekvencia fakturácie
                    </label>
                    <p className="font-medium">{contract.onboardingData.fakturacneUdaje.frekvencia}</p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                      Finančný súhrn
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Mesačný poplatok:</span>
                        <span className="font-semibold">€{contract.monthlyFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celková hodnota zmluvy:</span>
                        <span className="font-semibold">€{contract.value.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Našá provízia ({(contract.commissionRate * 100).toFixed(1)}%):</span>
                        <span className="font-semibold">€{(contract.value * contract.commissionRate).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>História zmien</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-blue-500 pl-4">
                    <p className="font-medium">Zmluva vytvorená</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(contract.createdAt)} - {contract.signedBy}
                    </p>
                  </div>
                  <div className="border-l-2 border-green-500 pl-4">
                    <p className="font-medium">Zmluva aktivovaná</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(contract.startDate)} - Systém
                    </p>
                  </div>
                  <div className="border-l-2 border-purple-500 pl-4">
                    <p className="font-medium">Posledná aktualizácia</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(contract.updatedAt)} - Systém
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Dokumenty</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contract.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Nahraté: {formatDate(doc.uploadedAt)}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <EditExtendedContractDialog
        contract={contract}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveContract}
      />
    </div>
  );
};
