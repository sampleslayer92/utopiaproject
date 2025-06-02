
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
  UserPlus,
  Settings,
  FileText,
  Calendar,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { AddEmployeeDialog } from './AddEmployeeDialog';

// Mock data pre tímovú výkonnosť
const teamPerformanceData = [
  { month: 'Jan', peter: 85, ladislav: 78, richie: 92 },
  { month: 'Feb', peter: 88, ladislav: 82, richie: 95 },
  { month: 'Mar', peter: 92, ladislav: 85, richie: 88 },
  { month: 'Apr', peter: 95, ladislav: 88, richie: 98 },
  { month: 'Máj', peter: 90, ladislav: 92, richie: 96 },
  { month: 'Jún', peter: 97, ladislav: 89, richie: 99 }
];

const monthlyRevenueData = [
  { name: 'Peter Fekiač', revenue: 23800, contracts: 12, efficiency: 95 },
  { name: 'Ladislav Mathis', revenue: 18800, contracts: 8, efficiency: 92 },
  { name: 'Richie Plichta', revenue: 16600, contracts: 6, efficiency: 98 }
];

const departmentData = [
  { name: 'Sales', value: 45, color: '#3b82f6' },
  { name: 'Support', value: 30, color: '#10b981' },
  { name: 'Management', value: 25, color: '#f59e0b' }
];

export const AdminDashboard: React.FC = () => {
  const [periodFilter, setPeriodFilter] = useState('6months');
  const [memberFilter, setMemberFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const handleAddEmployee = (employee: any) => {
    console.log('New employee added:', employee);
  };

  return (
    <div className="space-y-6">
      {/* Action Panel */}
      <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Správa tímu</h2>
                <p className="text-blue-100 text-sm">
                  Analyzujte výkonnosť vašich zamestnancov a optimalizujte procesy
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
                <FileText className="h-4 w-4 mr-2" />
                Výkonnostný report
              </Button>
              <Button variant="outline" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
                <Settings className="h-4 w-4 mr-2" />
                Nastavenia tímu
              </Button>
              <AddEmployeeDialog onAddEmployee={handleAddEmployee} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
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
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
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
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">3</p>
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
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">95%</p>
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
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">26</p>
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
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Top performer</p>
                <p className="text-lg font-bold text-orange-900 dark:text-orange-100">Richie Plichta</p>
                <div className="flex items-center mt-2">
                  <Award className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-sm text-orange-600">98% efektivita</span>
                </div>
              </div>
              <div className="p-3 bg-orange-600 rounded-full">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Vývoj efektivity tímu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={teamPerformanceData}>
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
                  <Line 
                    type="monotone" 
                    dataKey="peter" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    name="Peter Fekiač"
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ladislav" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    name="Ladislav Mathis"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="richie" 
                    stroke="#f59e0b" 
                    strokeWidth={3} 
                    name="Richie Plichta"
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Rozdelenie tímu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Mesačné výkony tímu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="url(#colorGradient)" 
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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
                        <Calendar className="h-4 w-4 mr-1" />
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
