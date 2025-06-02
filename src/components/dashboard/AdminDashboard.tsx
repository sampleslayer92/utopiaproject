
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  TrendingUp, 
  Award,
  Target,
  BarChart3,
  Settings,
  FileText,
  Activity,
  DollarSign,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';
import { AddEmployeeDialog } from './AddEmployeeDialog';

// Mock data pre tímovú výkonnosť s filtrovaním
const teamPerformanceData = [
  { month: 'Jan', peter: 85, ladislav: 78, richie: 92, maria: 75, jan: 68 },
  { month: 'Feb', peter: 88, ladislav: 82, richie: 95, maria: 78, jan: 72 },
  { month: 'Mar', peter: 92, ladislav: 85, richie: 88, maria: 82, jan: 76 },
  { month: 'Apr', peter: 95, ladislav: 88, richie: 98, maria: 85, jan: 80 },
  { month: 'Máj', peter: 90, ladislav: 92, richie: 96, maria: 87, jan: 84 },
  { month: 'Jún', peter: 97, ladislav: 89, richie: 99, maria: 89, jan: 87 }
];

const revenueAndProfitData = [
  { month: 'Jan', revenue: 59200, profit: 18760, expenses: 40440 },
  { month: 'Feb', revenue: 63400, profit: 20288, expenses: 43112 },
  { month: 'Mar', revenue: 68800, profit: 22016, expenses: 46784 },
  { month: 'Apr', revenue: 72600, profit: 23232, expenses: 49368 },
  { month: 'Máj', revenue: 69800, profit: 22336, expenses: 47464 },
  { month: 'Jún', revenue: 76200, profit: 24384, expenses: 51816 }
];

const monthlyRevenueData = [
  { name: 'Peter Fekiač', revenue: 23800, contracts: 12, efficiency: 95 },
  { name: 'Ladislav Mathis', revenue: 18800, contracts: 8, efficiency: 92 },
  { name: 'Richie Plichta', revenue: 16600, contracts: 6, efficiency: 98 },
  { name: 'Mária Novotná', revenue: 14200, contracts: 4, efficiency: 87 },
  { name: 'Ján Kováč', revenue: 12800, contracts: 3, efficiency: 89 }
];

export const AdminDashboard: React.FC = () => {
  const [periodFilter, setPeriodFilter] = useState('6months');
  const [memberFilter, setMemberFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const handleAddEmployee = (employee: any) => {
    console.log('New employee added:', employee);
  };

  // Funkcionalita filtra - filtrovanie dát na základe vybraných filtrov
  const getFilteredPerformanceData = () => {
    let data = [...teamPerformanceData];
    
    // Filter by period
    if (periodFilter === '1month') {
      data = data.slice(-1);
    } else if (periodFilter === '3months') {
      data = data.slice(-3);
    } else if (periodFilter === '6months') {
      data = data.slice(-6);
    }
    
    return data;
  };

  const getFilteredRevenueData = () => {
    let data = [...revenueAndProfitData];
    
    if (periodFilter === '1month') {
      data = data.slice(-1);
    } else if (periodFilter === '3months') {
      data = data.slice(-3);
    } else if (periodFilter === '6months') {
      data = data.slice(-6);
    }
    
    return data;
  };

  const applyFilters = () => {
    // Trigger re-render with new filtered data
    console.log('Applying filters:', { periodFilter, memberFilter, roleFilter });
  };

  // Get lines to display based on member filter
  const getPerformanceLines = () => {
    if (memberFilter === 'all') {
      return (
        <>
          <Line type="monotone" dataKey="peter" stroke="#3b82f6" strokeWidth={3} name="Peter Fekiač" />
          <Line type="monotone" dataKey="ladislav" stroke="#10b981" strokeWidth={3} name="Ladislav Mathis" />
          <Line type="monotone" dataKey="richie" stroke="#f59e0b" strokeWidth={3} name="Richie Plichta" />
          <Line type="monotone" dataKey="maria" stroke="#ef4444" strokeWidth={3} name="Mária Novotná" />
          <Line type="monotone" dataKey="jan" stroke="#8b5cf6" strokeWidth={3} name="Ján Kováč" />
        </>
      );
    } else {
      return <Line type="monotone" dataKey={memberFilter} stroke="#3b82f6" strokeWidth={3} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Panel */}
      <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <BarChart3 className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Admin Dashboard</h2>
                <p className="text-blue-100 text-sm">
                  Komplexný prehľad výkonnosti tímu a obchodných výsledkov
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
                <Download className="h-4 w-4 mr-2" />
                Export reportu
              </Button>
              <Button variant="outline" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
                <Settings className="h-4 w-4 mr-2" />
                Nastavenia
              </Button>
              <AddEmployeeDialog onAddEmployee={handleAddEmployee} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Functional Filters */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Časové obdobie
              </label>
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Posledný mesiac</SelectItem>
                  <SelectItem value="3months">Posledné 3 mesiace</SelectItem>
                  <SelectItem value="6months">Posledných 6 mesiacov</SelectItem>
                  <SelectItem value="1year">Posledný rok</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Člen tímu
              </label>
              <Select value={memberFilter} onValueChange={setMemberFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Celý tím</SelectItem>
                  <SelectItem value="peter">Peter Fekiač</SelectItem>
                  <SelectItem value="ladislav">Ladislav Mathis</SelectItem>
                  <SelectItem value="richie">Richie Plichta</SelectItem>
                  <SelectItem value="maria">Mária Novotná</SelectItem>
                  <SelectItem value="jan">Ján Kováč</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Funkcia
              </label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všetky funkcie</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={applyFilters} className="w-full bg-blue-600 hover:bg-blue-700">
                <Activity className="h-4 w-4 mr-2" />
                Aplikovať filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Aktívni členovia</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">5</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">100% aktívnych</span>
                </div>
              </div>
              <div className="p-3 bg-blue-600 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Priemerná efektivita</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">92%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+3% oproti minulému</span>
                </div>
              </div>
              <div className="p-3 bg-green-600 rounded-full">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Celkom zmluv</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">33</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+8 tento mesiac</span>
                </div>
              </div>
              <div className="p-3 bg-purple-600 rounded-full">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Mesačné tržby</p>
                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">€86.2K</p>
                <div className="flex items-center mt-2">
                  <DollarSign className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-sm text-orange-600">+12% MoM</span>
                </div>
              </div>
              <div className="p-3 bg-orange-600 rounded-full">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section - Vývoj efektivity tímu a Tržby & Zisky */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Vývoj efektivity tímu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getFilteredPerformanceData()}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  {getPerformanceLines()}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Tržby a zisky
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={getFilteredRevenueData()}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: any, name: string) => [
                      `€${value.toLocaleString()}`,
                      name === 'revenue' ? 'Tržby' : 
                      name === 'profit' ? 'Zisk' : 'Náklady'
                    ]}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Tržby" />
                  <Bar dataKey="profit" fill="#10b981" name="Zisk" />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Náklady" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Team Performance Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Detailná výkonnosť členov tímu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyRevenueData.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{member.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        {member.contracts} zmluv
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        €{member.revenue.toLocaleString()} tržby
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">Efektivita</p>
                    <Badge 
                      variant="secondary" 
                      className={`text-white ${
                        member.efficiency >= 95 ? 'bg-green-500' : 
                        member.efficiency >= 90 ? 'bg-blue-500' : 'bg-orange-500'
                      }`}
                    >
                      {member.efficiency}%
                    </Badge>
                  </div>
                  <div className="w-24">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          member.efficiency >= 95 ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                          member.efficiency >= 90 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 
                          'bg-gradient-to-r from-orange-400 to-orange-600'
                        }`}
                        style={{ width: `${member.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
