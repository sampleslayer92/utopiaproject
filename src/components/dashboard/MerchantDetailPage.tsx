import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  DollarSign,
  Euro,
  Smartphone,
  Settings,
  FileText,
  Users,
  Activity,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  CreditCard,
  ShoppingCart,
  BarChart3,
  PieChart
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Contract } from '@/types/dashboard';
import { AddContractDialog } from './AddContractDialog';
import { ConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';

// Enhanced mock data for merchant detail
const mockMerchantData = {
  id: 'client-1',
  name: 'Reštaurácia U Jána',
  email: 'jan@restaurant.sk',
  phone: '+421 900 123 456',
  address: 'Hlavná 15, Bratislava',
  website: 'www.restaurant-jana.sk',
  contactPerson: 'Ján Novák',
  industry: 'restaurant',
  status: 'active',
  createdAt: '2024-01-15',
  totalRevenue: 142000,
  monthlyRevenue: 12400,
  commissionRate: 2.5,
  calculatedCommission: 310,
  assignedTeamMember: {
    id: 'team-1',
    name: 'Peter Manažér',
    email: 'peter@utopia.sk',
    phone: '+421 905 111 222'
  },
  // Enhanced business info
  businessInfo: {
    ico: '12345678',
    dic: 'SK2023456789',
    icdph: 'SK2023456789',
    legalForm: 's.r.o.',
    foundedDate: '2020-03-15',
    employeeCount: 25,
    bankAccount: 'SK89 1100 0000 0012 3456 7890',
    vatPayer: true
  },
  // Financial metrics
  financialMetrics: {
    averageTransactionValue: 45.80,
    monthlyTransactions: 2750,
    conversionRate: 78.5,
    customerRetentionRate: 85.2,
    averageOrderValue: 52.30,
    profitMargin: 22.5,
    paymentMethodsBreakdown: {
      card: 65,
      cash: 25,
      online: 10
    }
  },
  // Goals and targets
  goals: {
    monthlyRevenueTarget: 15000,
    yearlyRevenueTarget: 180000,
    transactionGrowthTarget: 15,
    currentProgress: 12400,
    achievementRate: 82.7
  },
  // Revenue breakdown by category
  revenueBreakdown: {
    pos: 4800,
    onlinePayments: 3200,
    inventory: 2100,
    licenses: 1500,
    maintenance: 800
  },
  // Monthly revenue data for charts
  monthlyRevenueData: [
    { month: 'Jan', revenue: 8500, transactions: 1850, growth: 12 },
    { month: 'Feb', revenue: 9200, transactions: 2020, growth: 8.2 },
    { month: 'Mar', revenue: 10100, transactions: 2150, growth: 9.8 },
    { month: 'Apr', revenue: 11200, transactions: 2380, growth: 10.9 },
    { month: 'May', revenue: 11800, transactions: 2520, growth: 5.4 },
    { month: 'Jun', revenue: 12400, transactions: 2750, growth: 5.1 }
  ],
  // Transaction trends
  transactionTrends: [
    { date: '2024-06-01', amount: 1250, count: 45 },
    { date: '2024-06-02', amount: 1380, count: 52 },
    { date: '2024-06-03', amount: 980, count: 38 },
    { date: '2024-06-04', amount: 1450, count: 58 },
    { date: '2024-06-05', amount: 1620, count: 61 },
    { date: '2024-06-06', amount: 1720, count: 65 },
    { date: '2024-06-07', amount: 1580, count: 59 }
  ],
  activeServices: [
    { 
      id: 'service-1', 
      name: 'POS Systém', 
      status: 'active', 
      monthlyFee: 89,
      commission: 22.25,
      description: 'Pokladničný systém s online synchronizáciou',
      installDate: '2024-01-15',
      usage: 95.2,
      uptime: 99.8
    },
    { 
      id: 'service-2', 
      name: 'Online platby', 
      status: 'active', 
      monthlyFee: 45,
      commission: 11.25,
      description: 'Platobná brána pre online objednávky',
      installDate: '2024-02-01',
      usage: 87.6,
      uptime: 99.5
    },
    { 
      id: 'service-3', 
      name: 'Inventúra', 
      status: 'active', 
      monthlyFee: 29,
      commission: 7.25,
      description: 'Automatická správa skladu a zásob',
      installDate: '2024-03-10',
      usage: 76.3,
      uptime: 98.9
    }
  ],
  locations: [
    { 
      id: 'loc-1', 
      name: 'Hlavná pobočka', 
      address: 'Hlavná 15, Bratislava', 
      status: 'active',
      devicesCount: 5,
      monthlyRevenue: 8900,
      manager: 'Ján Novák',
      phone: '+421 900 123 456'
    },
    { 
      id: 'loc-2', 
      name: 'Pobočka Centrum', 
      address: 'Námestie 8, Bratislava', 
      status: 'active',
      devicesCount: 3,
      monthlyRevenue: 3500,
      manager: 'Anna Kováčová',
      phone: '+421 905 987 654'
    }
  ],
  devices: [
    {
      id: 'dev-1',
      name: 'POS Terminal 1',
      type: 'POS',
      location: 'Hlavná pobočka',
      status: 'online',
      lastSeen: '2024-11-28T16:45:00Z',
      monthlyRevenue: 4200,
      uptime: 99.8,
      transactions: 1250
    },
    {
      id: 'dev-2',
      name: 'Payment Terminal 1',
      type: 'Payment',
      location: 'Hlavná pobočka',
      status: 'online',
      lastSeen: '2024-11-28T16:40:00Z',
      monthlyRevenue: 3200,
      uptime: 99.5,
      transactions: 890
    },
    {
      id: 'dev-3',
      name: 'POS Terminal 2',
      type: 'POS',
      location: 'Pobočka Centrum',
      status: 'offline',
      lastSeen: '2024-11-28T14:20:00Z',
      monthlyRevenue: 1800,
      uptime: 95.2,
      transactions: 610
    }
  ],
  contracts: [
    {
      id: 'contract-1',
      client: 'Reštaurácia U Jána',
      title: 'Základný POS balík',
      type: 'subscription' as const,
      status: 'active' as const,
      value: 1068,
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      terms: 'Štandardné podmienky pre POS systém s mesačným poplatkom.'
    }
  ],
  // Activity history
  activityHistory: [
    {
      id: 'act-1',
      date: '2024-11-28',
      type: 'transaction',
      description: 'Vysoké tržby - €1,720 (65 transakcií)',
      value: 1720,
      status: 'success'
    },
    {
      id: 'act-2',
      date: '2024-11-27',
      type: 'service',
      description: 'Aktualizácia POS systému na verziu 2.1.5',
      value: 0,
      status: 'info'
    },
    {
      id: 'act-3',
      date: '2024-11-25',
      type: 'payment',
      description: 'Mesačný poplatok uhradený - €163',
      value: 163,
      status: 'success'
    },
    {
      id: 'act-4',
      date: '2024-11-24',
      type: 'device',
      description: 'POS Terminal 2 offline - technická porucha',
      value: 0,
      status: 'warning'
    },
    {
      id: 'act-5',
      date: '2024-11-20',
      type: 'contract',
      description: 'Predĺženie zmluvy o ďalší rok',
      value: 12816,
      status: 'success'
    }
  ],
  // Outstanding invoices
  outstandingInvoices: [
    {
      id: 'inv-1',
      number: 'INV-2024-001256',
      amount: 163,
      dueDate: '2024-12-15',
      status: 'pending',
      description: 'Mesačné poplatky - December 2024'
    }
  ],
  // Performance metrics
  performanceMetrics: {
    monthlyGrowth: 5.1,
    yearlyGrowth: 45.8,
    customerSatisfaction: 4.6,
    systemUptime: 99.1,
    supportTickets: 2,
    responseTime: 1.2
  }
};

export const MerchantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Contract management state - explicitly type as Contract[]
  const [contracts, setContracts] = useState<Contract[]>(mockMerchantData.contracts);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [showAddContractDialog, setShowAddContractDialog] = useState(false);
  const [deletingContract, setDeletingContract] = useState<Contract | null>(null);
  const [showDeleteContractDialog, setShowDeleteContractDialog] = useState(false);

  const merchant = mockMerchantData; // In real app, fetch by id

  // Chart data preparation
  const revenueBreakdownData = [
    { name: 'POS Systém', value: merchant.revenueBreakdown.pos, color: '#3b82f6' },
    { name: 'Online platby', value: merchant.revenueBreakdown.onlinePayments, color: '#10b981' },
    { name: 'Inventúra', value: merchant.revenueBreakdown.inventory, color: '#8b5cf6' },
    { name: 'Licencie', value: merchant.revenueBreakdown.licenses, color: '#f59e0b' },
    { name: 'Údržba', value: merchant.revenueBreakdown.maintenance, color: '#ef4444' }
  ];

  const paymentMethodsData = [
    { name: 'Kartou', value: merchant.financialMetrics.paymentMethodsBreakdown.card, color: '#3b82f6' },
    { name: 'Hotovosť', value: merchant.financialMetrics.paymentMethodsBreakdown.cash, color: '#10b981' },
    { name: 'Online', value: merchant.financialMetrics.paymentMethodsBreakdown.online, color: '#8b5cf6' }
  ];

  // Contract handler functions
  const handleEditContract = (contract: Contract) => {
    setEditingContract(contract);
  };

  const handleDeleteContract = (contract: Contract) => {
    setDeletingContract(contract);
    setShowDeleteContractDialog(true);
  };

  const handleSaveContract = (updatedContract: Contract) => {
    setContracts(prev => prev.map(contract => 
      contract.id === updatedContract.id ? updatedContract : contract
    ));
    toast({
      title: "Zmluva aktualizovaná",
      description: "Zmluva bola úspešne aktualizovaná.",
    });
  };

  const handleAddContract = (newContract: Contract) => {
    setContracts(prev => [...prev, newContract]);
    toast({
      title: "Zmluva pridaná",
      description: "Nová zmluva bola úspešne pridaná.",
    });
  };

  const handleConfirmDeleteContract = () => {
    if (deletingContract) {
      setContracts(prev => prev.filter(contract => contract.id !== deletingContract.id));
      toast({
        title: "Zmluva vymazaná",
        description: "Zmluva bola úspešne vymazaná.",
      });
      setDeletingContract(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'online':
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'offline':
      case 'inactive':
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'warning':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getIndustryLabel = (industry: string) => {
    switch (industry) {
      case 'restaurant': return 'Reštaurácia';
      case 'retail': return 'Maloobchod';
      case 'hospitality': return 'Hotelierstvo';
      case 'fitness': return 'Fitness';
      case 'beauty': return 'Kaderníctvo';
      default: return 'Iné';
    }
  };

  const getRevenueTargetProgress = () => {
    return Math.round((merchant.goals.currentProgress / merchant.goals.monthlyRevenueTarget) * 100);
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
          onClick={() => navigate('/dashboard/merchants')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Späť na zoznam</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {merchant.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Detail merchanta a správa služieb
          </p>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesačné tržby</p>
                <p className="text-2xl font-bold">€{merchant.monthlyRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{merchant.performanceMetrics.monthlyGrowth}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Euro className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Moja provízia</p>
                <p className="text-2xl font-bold text-green-600">€{merchant.calculatedCommission.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{merchant.commissionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Priemerná transakcia</p>
                <p className="text-2xl font-bold">€{merchant.financialMetrics.averageTransactionValue.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{merchant.financialMetrics.monthlyTransactions} transakcií</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Konverzný pomer</p>
                <p className="text-2xl font-bold">{merchant.financialMetrics.conversionRate}%</p>
                <p className="text-xs text-gray-500">Zákaznícka spokojnosť: {merchant.performanceMetrics.customerSatisfaction}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status systému</p>
                <p className="text-2xl font-bold">{merchant.performanceMetrics.systemUptime}%</p>
                <Badge className={getStatusColor(merchant.status)}>
                  {merchant.status === 'active' ? 'Aktívny' : 'Neaktívny'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Prehľad</TabsTrigger>
          <TabsTrigger value="analytics">Analytika</TabsTrigger>
          <TabsTrigger value="financial">Financie</TabsTrigger>
          <TabsTrigger value="services">Služby</TabsTrigger>
          <TabsTrigger value="locations">Lokácie</TabsTrigger>
          <TabsTrigger value="devices">Zariadenia</TabsTrigger>
          <TabsTrigger value="contracts">Zmluvy</TabsTrigger>
          <TabsTrigger value="activity">Aktivita</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
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
                    <p className="text-sm font-medium text-gray-500">Názov</p>
                    <p className="font-medium">{merchant.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Odvetvie</p>
                    <Badge variant="outline">{getIndustryLabel(merchant.industry)}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">IČO</p>
                    <p className="font-medium">{merchant.businessInfo.ico}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">DIČ</p>
                    <p className="font-medium">{merchant.businessInfo.dic}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Počet zamestnancov</p>
                    <p className="font-medium">{merchant.businessInfo.employeeCount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Založené</p>
                    <p className="font-medium">{new Date(merchant.businessInfo.foundedDate).toLocaleDateString('sk-SK')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Goals Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Mesačné ciele</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tržby</span>
                    <span className="text-sm text-gray-500">
                      €{merchant.goals.currentProgress.toLocaleString()} / €{merchant.goals.monthlyRevenueTarget.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={getRevenueTargetProgress()} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">{getRevenueTargetProgress()}% z cieľa</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ročný cieľ</p>
                    <p className="text-lg font-bold">€{merchant.goals.yearlyRevenueTarget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Úspešnosť</p>
                    <p className="text-lg font-bold text-green-600">{merchant.goals.achievementRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assigned Team Member */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Priradený obchodník</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{merchant.assignedTeamMember.name}</p>
                    <p className="text-sm text-gray-500">{merchant.assignedTeamMember.email}</p>
                    <p className="text-sm text-gray-500">{merchant.assignedTeamMember.phone}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Kontaktovať
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Rýchle štatistiky</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lokácie:</span>
                  <span className="font-medium">{merchant.locations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Zariadenia:</span>
                  <span className="font-medium">{merchant.devices.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Aktívne služby:</span>
                  <span className="font-medium">{merchant.activeServices.filter(s => s.status === 'active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kontrakty:</span>
                  <span className="font-medium">{contracts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Retenčný pomer:</span>
                  <span className="font-medium text-green-600">{merchant.financialMetrics.customerRetentionRate}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Breakdown tržieb podľa služieb
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

            {/* Monthly Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Mesačný trend tržieb
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={merchant.monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value, name) => [
                          name === 'revenue' ? `€${value.toLocaleString()}` : value,
                          name === 'revenue' ? 'Tržby' : 'Transakcie'
                        ]}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Rozdelenie platobných metód</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={paymentMethodsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {paymentMethodsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Posledné transakcie (7 dní)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={merchant.transactionTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('sk-SK', { day: 'numeric', month: 'short' })} />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(date) => new Date(date).toLocaleDateString('sk-SK')}
                        formatter={(value, name) => [
                          name === 'amount' ? `€${value.toLocaleString()}` : value,
                          name === 'amount' ? 'Suma' : 'Počet'
                        ]}
                      />
                      <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Finančný prehľad</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Celkové tržby</p>
                    <p className="text-lg font-bold">€{merchant.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Marža</p>
                    <p className="text-lg font-bold text-green-600">{merchant.financialMetrics.profitMargin}%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Priemerná objednávka</p>
                    <p className="text-lg font-bold">€{merchant.financialMetrics.averageOrderValue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ročný rast</p>
                    <p className="text-lg font-bold text-green-600">+{merchant.performanceMetrics.yearlyGrowth}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Outstanding Invoices */}
            <Card>
              <CardHeader>
                <CardTitle>Nevyrovnané faktúry</CardTitle>
              </CardHeader>
              <CardContent>
                {merchant.outstandingInvoices.length > 0 ? (
                  <div className="space-y-3">
                    {merchant.outstandingInvoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div>
                          <p className="font-medium">{invoice.number}</p>
                          <p className="text-sm text-gray-500">{invoice.description}</p>
                          <p className="text-sm text-gray-500">Splatnosť: {new Date(invoice.dueDate).toLocaleDateString('sk-SK')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">€{invoice.amount.toLocaleString()}</p>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status === 'pending' ? 'Čakajúca' : 'Zaplatená'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Žiadne nevyrovnané faktúry</p>
                )}
              </CardContent>
            </Card>

            {/* Commission Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Breakdown mojej provízie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {merchant.activeServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500">€{service.monthlyFee}/mesiac</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">€{service.commission.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{merchant.commissionRate}%</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Celková provízia:</span>
                    <span className="text-green-600">€{merchant.calculatedCommission.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bank Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Bankové údaje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Bankový účet</p>
                  <p className="font-medium font-mono">{merchant.businessInfo.bankAccount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">IČ DPH</p>
                  <p className="font-medium">{merchant.businessInfo.icdph}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Plátca DPH</p>
                  <Badge variant={merchant.businessInfo.vatPayer ? "default" : "secondary"}>
                    {merchant.businessInfo.vatPayer ? 'Áno' : 'Nie'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktívne služby</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Služba</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Mesačný poplatok</TableHead>
                    <TableHead>Využitie</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>Moja provízia</TableHead>
                    <TableHead>Akcie</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {merchant.activeServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-500">{service.description}</p>
                          <p className="text-xs text-gray-400">Inštalované: {new Date(service.installDate).toLocaleDateString('sk-SK')}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {service.status === 'active' ? 'Aktívna' : 'Neaktívna'}
                        </Badge>
                      </TableCell>
                      <TableCell>€{service.monthlyFee}</TableCell>
                      <TableCell>
                        <div className="w-16">
                          <Progress value={service.usage} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">{service.usage.toFixed(1)}%</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-16">
                          <Progress value={service.uptime} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">{service.uptime.toFixed(1)}%</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-green-600 font-medium">€{service.commission.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lokácie</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Názov</TableHead>
                    <TableHead>Adresa</TableHead>
                    <TableHead>Manažér</TableHead>
                    <TableHead>Zariadenia</TableHead>
                    <TableHead>Mesačné tržby</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {merchant.locations.map((location) => (
                    <TableRow key={location.id}>
                      <TableCell className="font-medium">{location.name}</TableCell>
                      <TableCell>{location.address}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{location.manager}</p>
                          <p className="text-sm text-gray-500">{location.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{location.devicesCount}</TableCell>
                      <TableCell>€{location.monthlyRevenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(location.status)}>
                          {location.status === 'active' ? 'Aktívna' : 'Neaktívna'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zariadenia</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Názov</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Lokácia</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>Transakcie</TableHead>
                    <TableHead>Mesačné tržby</TableHead>
                    <TableHead>Posledná aktivita</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {merchant.devices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">{device.name}</TableCell>
                      <TableCell>{device.type}</TableCell>
                      <TableCell>{device.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(device.status)}>
                          {device.status === 'online' ? 'Online' : 'Offline'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="w-16">
                          <Progress value={device.uptime} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">{device.uptime.toFixed(1)}%</p>
                        </div>
                      </TableCell>
                      <TableCell>{device.transactions.toLocaleString()}</TableCell>
                      <TableCell>€{device.monthlyRevenue.toLocaleString()}</TableCell>
                      <TableCell>{new Date(device.lastSeen).toLocaleString('sk-SK')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Zmluvy</CardTitle>
                <Button onClick={() => setShowAddContractDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Pridať zmluvu
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Názov</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Hodnota</TableHead>
                    <TableHead>Platnosť</TableHead>
                    <TableHead>Akcie</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.title}</TableCell>
                      <TableCell>{contract.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(contract.status)}>
                          {contract.status === 'active' ? 'Aktívna' : 'Neaktívna'}
                        </Badge>
                      </TableCell>
                      <TableCell>€{contract.value.toLocaleString()}</TableCell>
                      <TableCell>
                        {new Date(contract.startDate).toLocaleDateString('sk-SK')} - {new Date(contract.endDate).toLocaleDateString('sk-SK')}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditContract(contract)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteContract(contract)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>História aktivít</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {merchant.activityHistory.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.status === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                      activity.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                      activity.status === 'info' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      'bg-gray-100 dark:bg-gray-900/30'
                    }`}>
                      {activity.type === 'transaction' ? <DollarSign className="h-5 w-5 text-green-600" /> :
                       activity.type === 'service' ? <Settings className="h-5 w-5 text-blue-600" /> :
                       activity.type === 'payment' ? <CreditCard className="h-5 w-5 text-purple-600" /> :
                       activity.type === 'device' ? <Smartphone className="h-5 w-5 text-orange-600" /> :
                       <FileText className="h-5 w-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString('sk-SK')}</p>
                    </div>
                    {activity.value > 0 && (
                      <div className="text-right">
                        <p className="font-bold text-green-600">€{activity.value.toLocaleString()}</p>
                      </div>
                    )}
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status === 'success' ? 'Úspech' :
                       activity.status === 'warning' ? 'Varovanie' :
                       activity.status === 'info' ? 'Info' : 'Chyba'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Contract Management Dialogs */}
      <AddContractDialog
        open={showAddContractDialog}
        onOpenChange={setShowAddContractDialog}
        onAdd={handleAddContract}
        client={merchant.name}
      />

      <ConfirmDeleteDialog
        open={showDeleteContractDialog}
        onOpenChange={setShowDeleteContractDialog}
        onConfirm={handleConfirmDeleteContract}
        title="Vymazať zmluvu"
        description={`Ste si istí, že chcete vymazať zmluvu "${deletingContract?.title}"? Táto akcia sa nedá vrátiť späť.`}
      />
    </div>
  );
};
