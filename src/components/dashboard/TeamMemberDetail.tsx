
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Phone, 
  Calendar, 
  TrendingUp, 
  Users, 
  FileText, 
  Target,
  Award,
  DollarSign,
  MapPin
} from 'lucide-react';
import { TeamMember } from '@/types/team';
import { demoClients, demoContracts } from '@/data/demoData';

const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    firstName: 'Peter',
    lastName: 'Fekiač',
    email: 'peter.fekiac@iso-org.sk',
    phone: '+421 900 123 456',
    position: 'Senior Account Manager',
    department: 'Sales',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2023-01-15',
    performance: {
      monthlyRevenue: 23800,
      totalRevenue: 286000,
      merchantsManaged: 3,
      contractsSigned: 12,
      efficiency: 95
    },
    assignedMerchants: ['merchant-1', 'merchant-2', 'merchant-6'],
    lastActivity: '2024-11-28T14:30:00Z',
    permissions: ['view_merchants', 'edit_contracts', 'create_reports', 'manage_team'],
    salary: 3200,
    commissionRate: 8,
    notes: 'Výborný senior account manager s dlhoročnými skúsenosťami. Špecializuje sa na veľkých klientov v reštauračnom a retail sektore. Má najvyšší conversion rate v tíme.'
  },
  {
    id: 'team-2',
    firstName: 'Ladislav',
    lastName: 'Mathis',
    email: 'ladislav.mathis@iso-org.sk',
    phone: '+421 900 234 567',
    position: 'Account Manager',
    department: 'Sales',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2023-06-01',
    performance: {
      monthlyRevenue: 18800,
      totalRevenue: 131600,
      merchantsManaged: 3,
      contractsSigned: 8,
      efficiency: 92
    },
    assignedMerchants: ['merchant-3', 'merchant-5', 'merchant-7'],
    lastActivity: '2024-11-28T16:45:00Z',
    permissions: ['view_merchants', 'edit_contracts', 'create_reports'],
    salary: 2800,
    commissionRate: 6,
    notes: 'Rýchlo sa rozvíjajúci account manager so silnými komunikačnými schopnosťami. Špecializuje sa na tech a retail segmenty. Výborný v cross-selling produktov.'
  },
  {
    id: 'team-3',
    firstName: 'Richie',
    lastName: 'Plichta ❤️',
    email: 'richie.plichta@iso-org.sk',
    phone: '+421 900 345 678',
    position: 'Technical Support Manager',
    department: 'Support',
    businessPartnerId: 'bp-1',
    status: 'active',
    hireDate: '2023-03-20',
    performance: {
      monthlyRevenue: 16600,
      totalRevenue: 132800,
      merchantsManaged: 2,
      contractsSigned: 6,
      efficiency: 98
    },
    assignedMerchants: ['merchant-4', 'merchant-8'],
    lastActivity: '2024-11-28T12:20:00Z',
    permissions: ['view_merchants', 'technical_support', 'maintenance_contracts'],
    salary: 3000,
    commissionRate: 5,
    notes: 'Expert na technické riešenia s najvyššou customer satisfaction v tíme. Špecializuje sa na komplexné integrácie a maintenance zmluvy. Výborný problem solver.'
  }
];

export const TeamMemberDetail: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const member = mockTeamMembers.find(m => m.id === memberId);

  if (!member) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Člen tímu nebol nájdený.
        </p>
        <Button onClick={() => navigate('/dashboard/team')} className="mt-4">
          Späť na team
        </Button>
      </div>
    );
  }

  // Get assigned merchants
  const assignedMerchants = demoClients.filter(client => 
    member.assignedMerchants.includes(client.id)
  );

  // Get contracts created by this team member
  const createdContracts = demoContracts.filter(contract => 
    contract.createdBy === member.id
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard/team')}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Späť
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {member.firstName} {member.lastName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {member.position} • {member.department}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(member.status)}>
            {member.status === 'active' ? 'Aktívny' : 
             member.status === 'inactive' ? 'Neaktívny' : 'Na dovolenke'}
          </Badge>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editovať
          </Button>
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesačné tržby</p>
                <p className="text-2xl font-bold">€{member.performance.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Spravovaní merchanti</p>
                <p className="text-2xl font-bold">{member.performance.merchantsManaged}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Podpísané zmluvy</p>
                <p className="text-2xl font-bold">{member.performance.contractsSigned}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Efektivita</p>
                <p className="text-2xl font-bold">{member.performance.efficiency}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Prehľad</TabsTrigger>
          <TabsTrigger value="performance">Výkonnosť</TabsTrigger>
          <TabsTrigger value="merchants">Merchanti</TabsTrigger>
          <TabsTrigger value="contracts">Zmluvy</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Osobné informácie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Meno</p>
                    <p className="font-medium">{member.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Priezvisko</p>
                    <p className="font-medium">{member.lastName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{member.email}</span>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{member.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Nastúpil: {new Date(member.hireDate).toLocaleDateString('sk-SK')}</span>
                </div>
              </CardContent>
            </Card>

            {/* Work Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Pracovné informácie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pozícia</p>
                  <p className="font-medium">{member.position}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Oddelenie</p>
                  <p className="font-medium">{member.department}</p>
                </div>
                {member.salary && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Plat</p>
                    <p className="font-medium">€{member.salary.toLocaleString()}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">Provízia</p>
                  <p className="font-medium">{member.commissionRate}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Posledná aktivita</p>
                  <p className="font-medium">
                    {member.lastActivity 
                      ? new Date(member.lastActivity).toLocaleDateString('sk-SK')
                      : 'Nikdy'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notes */}
          {member.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Poznámky</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{member.notes}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Výkonnostné metriky
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Celkové tržby</p>
                    <p className="text-2xl font-bold text-green-600">€{member.performance.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mesačné tržby</p>
                    <p className="text-xl font-bold text-blue-600">€{member.performance.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mesačná provízia</p>
                    <p className="text-lg font-bold text-purple-600">
                      €{Math.round(member.performance.monthlyRevenue * (member.commissionRate! / 100)).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Efektivita</p>
                    <div className="flex items-center mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-3 mr-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" 
                          style={{ width: `${member.performance.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-bold">{member.performance.efficiency}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Priemerná hodnota zmluvy</p>
                    <p className="text-lg font-bold text-orange-600">
                      €{Math.round(member.performance.totalRevenue / member.performance.contractsSigned).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pridelení merchanti ({assignedMerchants.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedMerchants.map((merchant) => (
                  <div key={merchant.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{merchant.name}</h3>
                        <p className="text-sm text-gray-600">{merchant.industry} • {merchant.address}</p>
                        <p className="text-sm text-gray-500">{merchant.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">€{merchant.monthlyRevenue.toLocaleString()}/mes</p>
                        <p className="text-sm text-gray-500">{merchant.devicesCount} zariadení</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vytvorené zmluvy ({createdContracts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {createdContracts.map((contract) => (
                  <div key={contract.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{contract.title}</h3>
                        <p className="text-sm text-gray-600">{contract.clientName}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(contract.startDate).toLocaleDateString('sk-SK')} - {new Date(contract.endDate).toLocaleDateString('sk-SK')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">€{contract.value.toLocaleString()}</p>
                        <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>
                          {contract.status === 'active' ? 'Aktívna' : 'Neaktívna'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
