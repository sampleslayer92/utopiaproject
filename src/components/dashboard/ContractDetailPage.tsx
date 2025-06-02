
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
  Euro
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { demoContracts, getClientName, ContractData } from '@/data/demoData';
import { EditContractDialog } from './EditContractDialog';

export const ContractDetailPage: React.FC = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [contract, setContract] = useState<ContractData | null>(null);

  React.useEffect(() => {
    if (contractId) {
      const foundContract = demoContracts.find(c => c.id === contractId);
      setContract(foundContract || null);
    }
  }, [contractId]);

  if (!user || !contract) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Zmluva sa nenašla alebo nemáte oprávnenie na zobrazenie.
        </p>
      </div>
    );
  }

  const handleSaveContract = (updatedContract: ContractData) => {
    setContract(updatedContract);
    // Here you would typically update the contract in your data store
    console.log('Contract updated:', updatedContract);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const clientName = getClientName(contract.clientId);

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
              {contract.contractNumber} - {contract.type}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Klient: {clientName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className={getStatusColor(contract.status)}>
            {contract.status === 'active' && 'Aktívna'}
            {contract.status === 'pending' && 'Čakajúca'}
            {contract.status === 'expired' && 'Expirovaná'}
          </Badge>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Stiahnuť PDF</span>
          </Button>
          <Button 
            onClick={() => setIsEditDialogOpen(true)}
            className="flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Upraviť</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Prehľad</TabsTrigger>
          <TabsTrigger value="client">Klient</TabsTrigger>
          <TabsTrigger value="financial">Financie</TabsTrigger>
          <TabsTrigger value="devices">Zariadenia</TabsTrigger>
          <TabsTrigger value="history">História</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contract Details */}
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
                    <p className="font-semibold capitalize">{contract.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Začiatok platnosti
                    </label>
                    <p className="font-semibold">
                      {new Date(contract.startDate).toLocaleDateString('sk-SK')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Koniec platnosti
                    </label>
                    <p className="font-semibold">
                      {new Date(contract.endDate).toLocaleDateString('sk-SK')}
                    </p>
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

            {/* Financial Info */}
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

        <TabsContent value="client" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Informácie o klientovi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Názov klienta
                  </label>
                  <p className="text-lg font-semibold">{clientName}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>info@{clientName.toLowerCase().replace(/\s+/g, '')}.sk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>+421 900 123 456</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>Hlavná 123, Bratislava</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span>Kontaktná osoba: Ján Novák</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Finančný prehľad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-400">
                    Zaplatené tento mesiac
                  </h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    €{contract.monthlyFee.toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-400">
                    Celkové tržby
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    €{(contract.value * 0.7).toLocaleString()}
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-400">
                    Naša provízia
                  </h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    €{(contract.value * contract.commissionRate).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Zariadenia</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contract.devices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{device}</p>
                        <p className="text-sm text-gray-500">Sériové číslo: {contract.id}-{index + 1}</p>
                      </div>
                    </div>
                    <Badge variant="outline">Aktívne</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
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
                    {new Date(contract.startDate).toLocaleDateString('sk-SK')} - {contract.signedBy}
                  </p>
                </div>
                <div className="border-l-2 border-green-500 pl-4">
                  <p className="font-medium">Zmluva aktivovaná</p>
                  <p className="text-sm text-gray-500">
                    {new Date(contract.startDate).toLocaleDateString('sk-SK')} - Systém
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <EditContractDialog
        contract={contract}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveContract}
      />
    </div>
  );
};
