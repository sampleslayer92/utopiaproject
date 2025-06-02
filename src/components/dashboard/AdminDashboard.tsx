
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Building2, TrendingUp, DollarSign, Plus, Settings, BarChart3, Shield, Search, Target, Award, Eye } from 'lucide-react';
import { DashboardCard } from '@/types/dashboard';
import { TeamMember } from '@/types/team';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';

const dashboardData: DashboardCard[] = [
  { title: 'Celkom klientů', value: 145, change: '+8', trend: 'up', icon: Users },
  { title: 'Aktivní zařízení', value: 2847, change: '+23', trend: 'up', icon: Building2 },
  { title: 'Měsíční tržby', value: '€48,392', change: '+12%', trend: 'up', icon: TrendingUp },
  { title: 'Tým výkonnosť', value: '94.2%', change: '+2.1%', trend: 'up', icon: Target },
];

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
    notes: 'Výborný senior account manager s dlhoročnými skúsenosťami.'
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
    notes: 'Rýchlo sa rozvíjajúci account manager so silnými komunikačnými schopnosťami.'
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
    notes: 'Expert na technické riešenia s najvyššou customer satisfaction v tíme.'
  }
];

// Mock earnings data for the chart
const generateEarningsData = (period: string, teamMember: string = 'all') => {
  const baseData = {
    'day': Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      earnings: Math.floor(Math.random() * 2000) + 500,
      teamMember: teamMember
    })),
    'week': Array.from({ length: 7 }, (_, i) => ({
      time: ['Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota', 'Nedeľa'][i],
      earnings: Math.floor(Math.random() * 15000) + 5000,
      teamMember: teamMember
    })),
    'month': Array.from({ length: 30 }, (_, i) => ({
      time: `${i + 1}`,
      earnings: Math.floor(Math.random() * 8000) + 2000,
      teamMember: teamMember
    })),
    'year': Array.from({ length: 12 }, (_, i) => ({
      time: ['Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún', 'Júl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'][i],
      earnings: Math.floor(Math.random() * 50000) + 20000,
      teamMember: teamMember
    }))
  };
  return baseData[period as keyof typeof baseData] || baseData.month;
};

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [timePeriod, setTimePeriod] = useState('month');
  const [selectedTeamMember, setSelectedTeamMember] = useState('all');

  const filteredTeamMembers = mockTeamMembers.filter(member => {
    const matchesSearch = `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'all' || member.position.includes(positionFilter);
    return matchesSearch && matchesPosition;
  });

  const earningsData = generateEarningsData(timePeriod, selectedTeamMember);
  const totalRevenue = mockTeamMembers.reduce((sum, member) => sum + member.performance.monthlyRevenue, 0);
  const averageEfficiency = mockTeamMembers.reduce((sum, member) => sum + member.performance.efficiency, 0) / mockTeamMembers.length;
  const topPerformer = mockTeamMembers.reduce((top, member) => 
    member.performance.monthlyRevenue > top.performance.monthlyRevenue ? member : top
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

  const handleMemberClick = (memberId: string) => {
    navigate(`/dashboard/team/${memberId}`);
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-full">
      {/* Enhanced Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Administrátorský panel</h1>
                  <p className="text-blue-100 text-lg mt-1">
                    Vitajte späť! Máte plnú kontrolu nad systémom.
                  </p>
                </div>
              </div>
              <p className="text-blue-100 max-w-2xl">
                Spravujte tím, monitorujte výkonnosť a dohliadajte na celý ekosystém.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg" 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nový člen tímu
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Settings className="h-5 w-5 mr-2" />
                Systémové nastavenia
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Detailný report
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full"></div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, index) => {
          const IconComponent = item.icon;
          const gradients = [
            'from-blue-500 to-blue-600',
            'from-green-500 to-green-600', 
            'from-purple-500 to-purple-600',
            'from-orange-500 to-orange-600'
          ];
          return (
            <Card key={index} className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradients[index]}`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${gradients[index]}`}>
                  {IconComponent && <IconComponent className="h-5 w-5 text-white" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.value}</div>
                {item.change && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">
                      {item.change} oproti minulému mesiacu
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Earnings Chart */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Celkový zárobok
            </CardTitle>
            <div className="flex gap-3">
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Deň</SelectItem>
                  <SelectItem value="week">Týždeň</SelectItem>
                  <SelectItem value="month">Mesiac</SelectItem>
                  <SelectItem value="year">Rok</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedTeamMember} onValueChange={setSelectedTeamMember}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Celý tím</SelectItem>
                  {mockTeamMembers.map(member => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.firstName} {member.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  formatter={(value) => [`€${value}`, 'Zárobok']}
                  labelStyle={{ color: 'black' }}
                />
                <Bar dataKey="earnings" fill="url(#earningsGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Výkonnosť tímu
            </CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Hľadať podľa mena..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-48"
                />
              </div>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrovať podľa pozície" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všetky pozície</SelectItem>
                  <SelectItem value="Senior Account Manager">Senior Account Manager</SelectItem>
                  <SelectItem value="Account Manager">Account Manager</SelectItem>
                  <SelectItem value="Technical Support Manager">Technical Support Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meno</TableHead>
                <TableHead>Pozícia</TableHead>
                <TableHead>Merchanti</TableHead>
                <TableHead>Mesačné tržby</TableHead>
                <TableHead>Provízia</TableHead>
                <TableHead>Efektivita</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeamMembers.map((member) => (
                <TableRow 
                  key={member.id}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleMemberClick(member.id)}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{member.firstName} {member.lastName}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.performance.merchantsManaged}</TableCell>
                  <TableCell>€{member.performance.monthlyRevenue.toLocaleString()}</TableCell>
                  <TableCell>{member.commissionRate}%</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${member.performance.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{member.performance.efficiency}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status === 'active' ? 'Aktívny' : 
                       member.status === 'inactive' ? 'Neaktívny' : 'Na dovolenke'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMemberClick(member.id);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
