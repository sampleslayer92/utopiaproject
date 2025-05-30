
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, TrendingUp, DollarSign, Target, Award, Building, FileText, Clock } from 'lucide-react';
import { ActionPanel } from './ActionPanel';

// Mock data for team members and their performance
const teamMembers = [
  { id: 'team-1', name: 'Peter Fekiač', monthlyRevenue: 15000, merchants: 5, efficiency: 92 },
  { id: 'team-2', name: 'Ladislav Mathis', monthlyRevenue: 12000, merchants: 4, efficiency: 88 },
  { id: 'team-3', name: 'Richie Plichta ❤️', monthlyRevenue: 8000, merchants: 3, efficiency: 95 },
];

const monthlyData = [
  { month: 'Jan', revenue: 28000, contracts: 12 },
  { month: 'Feb', revenue: 32000, contracts: 15 },
  { month: 'Mar', revenue: 35000, contracts: 18 },
  { month: 'Apr', revenue: 31000, contracts: 14 },
  { month: 'May', revenue: 38000, contracts: 20 },
  { month: 'Jun', revenue: 35000, contracts: 16 },
];

const revenueByTeamMember = teamMembers.map(member => ({
  name: member.name.split(' ')[0],
  revenue: member.monthlyRevenue,
  merchants: member.merchants
}));

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

export const BusinessPartnerDashboard: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<string>('all');

  const filteredData = selectedMember === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.id === selectedMember);

  const totalRevenue = filteredData.reduce((sum, member) => sum + member.monthlyRevenue, 0);
  const totalMerchants = filteredData.reduce((sum, member) => sum + member.merchants, 0);
  const averageEfficiency = filteredData.reduce((sum, member) => sum + member.efficiency, 0) / filteredData.length;

  return (
    <div className="space-y-6">
      {/* Action Panel */}
      <ActionPanel />

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Filtrovanie údajov
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Vybrať člena tímu:
              </label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Vybrať člena tímu..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všetci členovia tímu</SelectItem>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedMember !== 'all' && (
              <div className="text-right">
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  Zobrazujú sa údaje pre: {teamMembers.find(m => m.id === selectedMember)?.name}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Celkový tím</p>
                <p className="text-3xl font-bold">{filteredData.length}</p>
                <p className="text-blue-100 text-sm">
                  {selectedMember === 'all' ? 'členov' : 'vybraný člen'}
                </p>
              </div>
              <Users className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Mesačné tržby</p>
                <p className="text-3xl font-bold">€{totalRevenue.toLocaleString()}</p>
                <p className="text-green-100 text-sm">+12% vs. minulý mesiac</p>
              </div>
              <DollarSign className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Spravovaní merchanti</p>
                <p className="text-3xl font-bold">{totalMerchants}</p>
                <p className="text-purple-100 text-sm">Aktívne obsluhovaní</p>
              </div>
              <Building className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Efektivita</p>
                <p className="text-3xl font-bold">{averageEfficiency.toFixed(1)}%</p>
                <p className="text-orange-100 text-sm">Priemerná výkonnosť</p>
              </div>
              <Target className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {selectedMember === 'all' ? 'Výkonnosť tímu' : 'Individuálna výkonnosť'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={selectedMember === 'all' ? revenueByTeamMember : [{
                name: teamMembers.find(m => m.id === selectedMember)?.name.split(' ')[0] || '',
                revenue: teamMembers.find(m => m.id === selectedMember)?.monthlyRevenue || 0,
                merchants: teamMembers.find(m => m.id === selectedMember)?.merchants || 0
              }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `€${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Tržby' : 'Merchanti'
                ]} />
                <Bar dataKey="revenue" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Efektivita tímu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredData.map(member => ({
                    name: member.name.split(' ')[0],
                    value: member.efficiency,
                    revenue: member.monthlyRevenue
                  }))}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Efektivita']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Nedávna aktivita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Peter Fekiač podpísal novú zmluvu</p>
                  <p className="text-xs text-gray-500">pred 2 hodinami</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Ladislav Mathis pridal nového merchanta</p>
                  <p className="text-xs text-gray-500">pred 4 hodinami</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Richie Plichta ❤️ aktualizoval merchant profil</p>
                  <p className="text-xs text-gray-500">pred 6 hodinami</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Mesačný trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `€${value.toLocaleString()}` : value,
                  name === 'revenue' ? 'Tržby' : 'Zmluvy'
                ]} />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="contracts" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
