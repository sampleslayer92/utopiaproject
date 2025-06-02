import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  DollarSign,
  Users,
  FileText,
  Activity,
  TrendingUp,
  Award,
  MapPin,
  PieChart
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// Enhanced mock data for team member detail
const mockTeamMemberData = {
  id: 'team-1',
  firstName: 'Peter',
  lastName: 'Manažér',
  email: 'peter@utopia.sk',
  phone: '+421 905 111 222',
  position: 'Senior Obchodný Manažér',
  department: 'Predaj',
  businessPartnerId: 'bp-1',
  status: 'active',
  hireDate: '2023-01-15',
  avatar: '',
  performance: {
    monthlyRevenue: 28500,
    totalRevenue: 342000,
    merchantsManaged: 8,
    contractsSigned: 12,
    efficiency: 92
  },
  assignedMerchants: ['client-1', 'client-4'],
  lastActivity: '2024-11-28T16:30:00Z',
  permissions: ['view_merchants', 'create_contracts', 'manage_devices'],
  salary: 2800,
  commissionRate: 3.5,
  notes: 'Výborný obchodník s dlhoročnými skúsenosťami. Špecializuje sa na reštauračný segment.',
  personalInfo: {
    address: 'Obchodná 25, Bratislava',
    emergencyContact: '+421 907 999 888',
    emergencyContactName: 'Anna Manažérová (manželka)',
    birthDate: '1985-03-15',
    nationalId: 'SK1234567890'
  },
  contractsByStatus: {
    draft: 3,
    signed: 12,
    rejected: 5,
    expired: 0
  },
  revenueBreakdown: {
    services: 8500,
    devices: 15000,
    commissions: 3200,
    licenses: 1800
  },
  contractsData: [
    {
      id: 'c1',
      clientName: 'Reštaurácia U Jána',
      type: 'Zariadenia',
      value: 12800,
      status: 'signed',
      date: '2024-01-15',
      commission: 448
    },
    {
      id: 'c2',
      clientName: 'Fitness Centrum Power',
      type: 'Služby',
      value: 4800,
      status: 'signed',
      date: '2024-02-20',
      commission: 168
    },
    {
      id: 'c3',
      clientName: 'Kavička s.r.o.',
      type: 'Licencie',
      value: 2400,
      status: 'draft',
      date: '2024-03-10',
      commission: 0
    }
  ],
  kpiData: {
    conversionRate: 60,
    averageContractValue: 6667,
    monthlyGrowth: 12
  },
  workHistory: [
    {
      date: '2024-01-15',
      action: 'Podpísaná zmluva s Reštaurácia U Jána',
      value: 12800,
      type: 'contract'
    },
    {
      date: '2024-02-20',
      action: 'Pridanie nového merchanta - Fitness Centrum Power',
      value: 0,
      type: 'merchant'
    },
    {
      date: '2024-03-10',
      action: 'Predĺženie zmluvy s existujúcim klientom',
      value: 4800,
      type: 'contract'
    }
  ],
  managedMerchants: [
    {
      id: 'client-1',
      name: 'Reštaurácia U Jána',
      monthlyRevenue: 3800,
      status: 'active',
      lastContact: '2024-11-25',
      contractValue: 12800
    },
    {
      id: 'client-4',
      name: 'Fitness Centrum Power',
      monthlyRevenue: 2800,
      status: 'active',
      lastContact: '2024-11-20',
      contractValue: 4800
    }
  ],
  goals: {
    monthlyTarget: 30000,
    yearlyTarget: 360000,
    currentProgress: 28500,
    contractsTarget: 15,
    contractsSigned: 12
  }
};

export const TeamMemberDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const teamMember = mockTeamMemberData; // In real app, fetch by id

  // Prepare data for charts
  const revenueBreakdownData = [
    { name: 'Služby', value: teamMember.revenueBreakdown.services, color: '#3b82f6' },
    { name: 'Zariadenia', value: teamMember.revenueBreakdown.devices, color: '#10b981' },
    { name: 'Provízie', value: teamMember.revenueBreakdown.commissions, color: '#8b5cf6' },
    { name: 'Licencie', value: teamMember.revenueBreakdown.licenses, color: '#f59e0b' }
  ];

  const contractsStatusData = [
    { name: 'Návrhy', count: teamMember.contractsByStatus.draft },
    { name: 'Podpísané', count: teamMember.contractsByStatus.signed },
    { name: 'Zamietnuté', count: teamMember.contractsByStatus.rejected },
    { name: 'Expirované', count: teamMember.contractsByStatus.expired }
  ];

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

  const getContractStatusColor = (status: string) => {
    switch (status) {
      case 'signed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'draft':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'expired':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getProgressPercentage = () => {
    return Math.round((teamMember.goals.currentProgress / teamMember.goals.monthlyTarget) * 100);
  };

  const getContractProgressPercentage = () => {
    return Math.round((teamMember.goals.contractsSigned / teamMember.goals.contractsTarget) * 100);
  };

  // Only admins can see this page
  if (!user || user.role !== 'admin') {
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
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/team')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Späť na tím</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {teamMember.firstName} {teamMember.lastName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {teamMember.position} • {teamMember.department}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesačné tržby</p>
                <p className="text-2xl font-bold">€{teamMember.performance.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Konverzný pomer</p>
                <p className="text-2xl font-bold">{teamMember.kpiData.conversionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Priemerná zmluva</p>
                <p className="text-2xl font-bold">€{teamMember.kpiData.averageContractValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesačný rast</p>
                <p className="text-2xl font-bold">+{teamMember.kpiData.monthlyGrowth}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="contracts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="contracts">Zmluvy</TabsTrigger>
          <TabsTrigger value="revenue">Breakdown odmien</TabsTrigger>
          <TabsTrigger value="overview">Prehľad</TabsTrigger>
          <TabsTrigger value="merchants">Merchanti</TabsTrigger>
          <TabsTrigger value="personal">Osobné údaje</TabsTrigger>
          <TabsTrigger value="activity">Aktivita</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-6">
          {/* Contract Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{teamMember.contractsByStatus.draft}</div>
                <div className="text-sm text-gray-600">Návrhy</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{teamMember.contractsByStatus.signed}</div>
                <div className="text-sm text-gray-600">Podpísané</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{teamMember.contractsByStatus.rejected}</div>
                <div className="text-sm text-gray-600">Zamietnuté</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">{teamMember.contractsByStatus.expired}</div>
                <div className="text-sm text-gray-600">Expirované</div>
              </CardContent>
            </Card>
          </div>

          {/* Contracts Table */}
          <Card>
            <CardHeader>
              <CardTitle>Všetky zmluvy</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Klient</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Hodnota</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Dátum</TableHead>
                    <TableHead>Provízia</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMember.contractsData.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.clientName}</TableCell>
                      <TableCell>{contract.type}</TableCell>
                      <TableCell>€{contract.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getContractStatusColor(contract.status)}>
                          {contract.status === 'signed' ? 'Podpísaná' : 
                           contract.status === 'draft' ? 'Návrh' :
                           contract.status === 'rejected' ? 'Zamietnutá' : 'Expirovaná'}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(contract.date).toLocaleDateString('sk-SK')}</TableCell>
                      <TableCell>€{contract.commission.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Breakdown odmien podľa typu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={revenueBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {revenueBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `€${value.toLocaleString()}`} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailný breakdown odmien</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {revenueBreakdownData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold">€{item.value.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Celkom:</span>
                    <span>€{Object.values(teamMember.revenueBreakdown).reduce((a, b) => a + b, 0).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Základné informácie</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Meno</p>
                    <p className="font-medium">{teamMember.firstName} {teamMember.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pozícia</p>
                    <p className="font-medium">{teamMember.position}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="font-medium">{teamMember.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Telefón</p>
                    <p className="font-medium">{teamMember.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dátum nástupu</p>
                    <p className="font-medium">{new Date(teamMember.hireDate).toLocaleDateString('sk-SK')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <Badge className={getStatusColor(teamMember.status)}>
                      {teamMember.status === 'active' ? 'Aktívny' : 
                       teamMember.status === 'inactive' ? 'Neaktívny' : 'Na dovolenke'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Mesačné ciele</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tržby</span>
                    <span className="text-sm text-gray-500">
                      €{teamMember.goals.currentProgress.toLocaleString()} / €{teamMember.goals.monthlyTarget.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={getProgressPercentage()} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{getProgressPercentage()}% z cieľa</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Zmluvy</span>
                    <span className="text-sm text-gray-500">
                      {teamMember.goals.contractsSigned} / {teamMember.goals.contractsTarget}
                    </span>
                  </div>
                  <Progress value={getContractProgressPercentage()} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{getContractProgressPercentage()}% z cieľa</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="merchants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spravovaní merchanti</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Mesačné tržby</TableHead>
                    <TableHead>Hodnota zmluvy</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posledný kontakt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMember.managedMerchants.map((merchant) => (
                    <TableRow key={merchant.id}>
                      <TableCell className="font-medium">{merchant.name}</TableCell>
                      <TableCell>€{merchant.monthlyRevenue.toLocaleString()}</TableCell>
                      <TableCell>€{merchant.contractValue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(merchant.status)}>
                          {merchant.status === 'active' ? 'Aktívny' : 'Neaktívny'}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(merchant.lastContact).toLocaleDateString('sk-SK')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Osobné údaje</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Adresa</p>
                  <p className="font-medium">{teamMember.personalInfo.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Dátum narodenia</p>
                  <p className="font-medium">{new Date(teamMember.personalInfo.birthDate).toLocaleDateString('sk-SK')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Núdzový kontakt</p>
                  <p className="font-medium">{teamMember.personalInfo.emergencyContactName}</p>
                  <p className="text-sm text-gray-500">{teamMember.personalInfo.emergencyContact}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Rodné číslo</p>
                  <p className="font-medium">{teamMember.personalInfo.nationalId}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Posledná aktivita</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMember.workHistory.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      {activity.type === 'contract' ? <FileText className="h-5 w-5 text-blue-600" /> : <Users className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString('sk-SK')}</p>
                    </div>
                    {activity.value > 0 && (
                      <div className="text-right">
                        <p className="font-bold text-green-600">€{activity.value.toLocaleString()}</p>
                      </div>
                    )}
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
