
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Download, 
  Filter,
  Calendar,
  FileText
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 45000, merchants: 15, contracts: 8 },
  { month: 'Feb', revenue: 52000, merchants: 18, contracts: 12 },
  { month: 'Mar', revenue: 48000, merchants: 16, contracts: 9 },
  { month: 'Apr', revenue: 61000, merchants: 22, contracts: 15 },
  { month: 'Máj', revenue: 55000, merchants: 20, contracts: 11 },
  { month: 'Jún', revenue: 67000, merchants: 25, contracts: 18 },
];

const teamPerformanceData = [
  { name: 'Peter Novák', revenue: 15000, efficiency: 92 },
  { name: 'Jana Kováčová', revenue: 12000, efficiency: 88 },
  { name: 'Martin Svoboda', revenue: 8000, efficiency: 95 },
];

const departmentData = [
  { name: 'Sales', value: 70, color: '#3B82F6' },
  { name: 'Support', value: 20, color: '#10B981' },
  { name: 'Management', value: 10, color: '#F59E0B' },
];

export const ReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  if (!user || user.role !== 'business_partner') {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reporty a analytika
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Komplexné prehľady výkonnosti vášho tímu a obchodu
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtre
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkové tržby</p>
                <p className="text-2xl font-bold">€328,000</p>
                <p className="text-sm text-green-600">+12% vs min. mesiac</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktívni merchanti</p>
                <p className="text-2xl font-bold">116</p>
                <p className="text-sm text-blue-600">+8 nových</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Nové zmluvy</p>
                <p className="text-2xl font-bold">73</p>
                <p className="text-sm text-purple-600">+15% vs min. mesiac</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Priemerná efektivita</p>
                <p className="text-2xl font-bold">91.7%</p>
                <p className="text-sm text-orange-600">+2.3% vs min. mesiac</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Tento týždeň</SelectItem>
                  <SelectItem value="month">Tento mesiac</SelectItem>
                  <SelectItem value="quarter">Tento štvrťrok</SelectItem>
                  <SelectItem value="year">Tento rok</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všetky oddelenia</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Prehľad</TabsTrigger>
          <TabsTrigger value="team">Tím</TabsTrigger>
          <TabsTrigger value="merchants">Merchanti</TabsTrigger>
          <TabsTrigger value="financial">Finančné</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Mesačné tržby
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'Tržby']} />
                    <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribúcia tímu</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Výkonnosť tímu</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={teamPerformanceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'Tržby']} />
                  <Bar dataKey="revenue" fill="#10B981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rast počtu merchantov</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="merchants" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
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
                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">Celkové príjmy</h3>
                  <p className="text-2xl font-bold text-green-600">€328,000</p>
                  <p className="text-sm text-green-600">Tento rok</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Mesačný priemer</h3>
                  <p className="text-2xl font-bold text-blue-600">€54,667</p>
                  <p className="text-sm text-blue-600">Posledných 6 mesiacov</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">Prognóza</h3>
                  <p className="text-2xl font-bold text-purple-600">€72,000</p>
                  <p className="text-sm text-purple-600">Budúci mesiac</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
