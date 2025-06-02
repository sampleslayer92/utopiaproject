
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
  FileText
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

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

export const AdminDashboard: React.FC = () => {
  const [periodFilter, setPeriodFilter] = useState('6months');
  const [memberFilter, setMemberFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Vitajte Marián Lapoš</h1>
            <p className="text-blue-100">
              Prehľad výkonnosti vašej organizácie a tímu. Spravujte svojich zamestnancov a analyzujte ich úspešnosť.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-blue-200">Aktívni členovia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">€59k</div>
              <div className="text-sm text-blue-200">Mesačné tržby tímu</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Panel */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Správa tímu a výkonnosti
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Analyzujte výkonnosť vašich zamestnancov a optimalizujte procesy
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Výkonnostný report</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Nastavenia tímu</span>
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <UserPlus className="h-4 w-4 mr-2" />
                Pridať člena tímu
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
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
            <div className="flex-1">
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
            <div className="flex-1">
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
          </div>
        </CardContent>
      </Card>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Aktívni členovia</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-green-600">100% aktívnych</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Priemerná efektivita</p>
                <p className="text-2xl font-bold">95%</p>
                <p className="text-xs text-green-600">+3% oproti minulému</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Celkom zmluv</p>
                <p className="text-2xl font-bold">26</p>
                <p className="text-xs text-green-600">+8 tento mesiac</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Top performer</p>
                <p className="text-lg font-bold">Richie Plichta</p>
                <p className="text-sm text-gray-500">98% efektivita</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Vývoj efektivity tímu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={teamPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="peter" stroke="#8884d8" strokeWidth={2} name="Peter Fekiač" />
                  <Line type="monotone" dataKey="ladislav" stroke="#82ca9d" strokeWidth={2} name="Ladislav Mathis" />
                  <Line type="monotone" dataKey="richie" stroke="#ffc658" strokeWidth={2} name="Richie Plichta" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Mesačné výkony tímu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Detailná výkonnosť členov tímu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyRevenueData.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-sm text-gray-600">
                      {member.contracts} zmluv • €{member.revenue.toLocaleString()} tržby
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">Efektivita</p>
                    <Badge variant="secondary">{member.efficiency}%</Badge>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                      style={{ width: `${member.efficiency}%` }}
                    ></div>
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
