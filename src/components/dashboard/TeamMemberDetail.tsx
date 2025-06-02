import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  MapPin,
  Save,
  X
} from 'lucide-react';
import { TeamMember } from '@/types/team';
import { demoClients, demoContracts } from '@/data/demoData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock performance data for charts
const generatePerformanceData = (memberId: string) => {
  return [
    { month: 'Jan', revenue: 22000, contracts: 3, efficiency: 94 },
    { month: 'Feb', revenue: 24500, contracts: 4, efficiency: 96 },
    { month: 'Mar', revenue: 23800, contracts: 2, efficiency: 93 },
    { month: 'Apr', revenue: 25200, contracts: 5, efficiency: 97 },
    { month: 'Máj', revenue: 23100, contracts: 3, efficiency: 95 },
    { month: 'Jún', revenue: 26800, contracts: 4, efficiency: 98 }
  ];
};

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
  const [editedMember, setEditedMember] = useState<TeamMember | null>(null);

  const member = mockTeamMembers.find(m => m.id === memberId);

  if (!member) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Člen tímu nebol nájdený.
        </p>
        <Button onClick={() => navigate('/dashboard/team')} className="mt-4">
          Späť na tím
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

  const performanceData = generatePerformanceData(member.id);
  
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

  const handleEditClick = () => {
    setEditedMember({ ...member });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedMember) {
      console.log('Ukladám zmeny pre člena tímu:', editedMember);
      // TODO: Save to state management
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedMember(null);
    setIsEditing(false);
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
          {!isEditing ? (
            <Button 
              onClick={handleEditClick}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editovať
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button 
                onClick={handleSaveEdit}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Uložiť
              </Button>
              <Button 
                onClick={handleCancelEdit}
                variant="outline"
              >
                <X className="h-4 w-4 mr-2" />
                Zrušiť
              </Button>
            </div>
          )}
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
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Meno</Label>
                        <Input
                          id="firstName"
                          value={editedMember?.firstName || ''}
                          onChange={(e) => setEditedMember(prev => prev ? {...prev, firstName: e.target.value} : null)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Priezvisko</Label>
                        <Input
                          id="lastName"
                          value={editedMember?.lastName || ''}
                          onChange={(e) => setEditedMember(prev => prev ? {...prev, lastName: e.target.value} : null)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedMember?.email || ''}
                        onChange={(e) => setEditedMember(prev => prev ? {...prev, email: e.target.value} : null)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefón</Label>
                      <Input
                        id="phone"
                        value={editedMember?.phone || ''}
                        onChange={(e) => setEditedMember(prev => prev ? {...prev, phone: e.target.value} : null)}
                      />
                    </div>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
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
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="position">Pozícia</Label>
                      <Input
                        id="position"
                        value={editedMember?.position || ''}
                        onChange={(e) => setEditedMember(prev => prev ? {...prev, position: e.target.value} : null)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Oddelenie</Label>
                      <Input
                        id="department"
                        value={editedMember?.department || ''}
                        onChange={(e) => setEditedMember(prev => prev ? {...prev, department: e.target.value} : null)}
                      />
                    </div>
                    {member.salary && (
                      <div>
                        <Label htmlFor="salary">Plat</Label>
                        <Input
                          id="salary"
                          type="number"
                          value={editedMember?.salary || ''}
                          onChange={(e) => setEditedMember(prev => prev ? {...prev, salary: parseInt(e.target.value)} : null)}
                        />
                      </div>
                    )}
                    {member.commissionRate && (
                      <div>
                        <Label htmlFor="commissionRate">Provízia</Label>
                        <Input
                          id="commissionRate"
                          type="number"
                          value={editedMember?.commissionRate || ''}
                          onChange={(e) => setEditedMember(prev => prev ? {...prev, commissionRate: parseInt(e.target.value)} : null)}
                        />
                      </div>
                    )}
                    <div>
                      <Label htmlFor="lastActivity">Posledná aktivita</Label>
                      <Input
                        id="lastActivity"
                        type="date"
                        value={editedMember?.lastActivity || ''}
                        onChange={(e) => setEditedMember(prev => prev ? {...prev, lastActivity: e.target.value} : null)}
                      />
                    </div>
                  </div>
                ) : (
                  <>
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
                    {member.commissionRate && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Provízia</p>
                        <p className="font-medium">{member.commissionRate}%</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-500">Posledná aktivita</p>
                      <p className="font-medium">
                        {member.lastActivity 
                          ? new Date(member.lastActivity).toLocaleDateString('sk-SK')
                          : 'Nikdy'
                        }
                      </p>
                    </div>
                  </>
                )}
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
                {isEditing ? (
                  <Textarea
                    value={editedMember?.notes || ''}
                    onChange={(e) => setEditedMember(prev => prev ? {...prev, notes: e.target.value} : null)}
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">{member.notes}</p>
                )}
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Mesačný vývoj tržieb</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`€${value}`, 'Tržby']} />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Efektivita v čase</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Efektivita']} />
                        <Bar dataKey="efficiency" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800">Celkové tržby</h4>
                  <p className="text-2xl font-bold text-green-600">€{member.performance.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600">Za celé obdobie</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Priemerná efektivita</h4>
                  <p className="text-2xl font-bold text-blue-600">{member.performance.efficiency}%</p>
                  <p className="text-sm text-blue-600">Mesačný priemer</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Provízia mesačne</h4>
                  <p className="text-2xl font-bold text-purple-600">
                    €{Math.round(member.performance.monthlyRevenue * (member.commissionRate! / 100)).toLocaleString()}
                  </p>
                  <p className="text-sm text-purple-600">Pri {member.commissionRate}% sadzbe</p>
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
                  <div key={merchant.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{merchant.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3" />
                          {merchant.industry} • {merchant.address}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <Mail className="h-3 w-3" />
                          {merchant.email}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="secondary">{merchant.status === 'active' ? 'Aktívny' : 'Neaktívny'}</Badge>
                          <span className="text-xs text-gray-500">
                            Člen od: {new Date(merchant.joinedDate).toLocaleDateString('sk-SK')}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold text-green-600 text-lg">€{merchant.monthlyRevenue.toLocaleString()}/mes</p>
                        <p className="text-sm text-gray-500">{merchant.devicesCount} zariadení</p>
                        <p className="text-xs text-gray-400">Celkom: €{merchant.monthlyVolume.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {assignedMerchants.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Žiadni pridelení merchanti
                  </div>
                )}
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
                  <div key={contract.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{contract.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{contract.clientName}</p>
                        <p className="text-sm text-gray-500 mt-1">{contract.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>
                            {contract.status === 'active' ? 'Aktívna' : 'Neaktívna'}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(contract.startDate).toLocaleDateString('sk-SK')} - {new Date(contract.endDate).toLocaleDateString('sk-SK')}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold text-green-600 text-lg">€{contract.value.toLocaleString()}</p>
                        {contract.monthlyFee && (
                          <p className="text-sm text-gray-500">€{contract.monthlyFee}/mes</p>
                        )}
                        <p className="text-xs text-gray-400">{contract.contractNumber}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {createdContracts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Žiadne vytvorené zmluvy
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
