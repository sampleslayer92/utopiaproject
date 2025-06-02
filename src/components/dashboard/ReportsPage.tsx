import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, DollarSign, FileText, Download, Filter, Calendar, Clock, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TeamEfficiencyChart } from './TeamEfficiencyChart';
import { RevenueBreakdownChart } from './RevenueBreakdownChart';
import { TeamPerformanceTable } from './TeamPerformanceTable';
import { SectionHeader } from '@/components/ui/section-header';

// Mock data for existing reports
const performanceData = [
  { month: 'Jan', revenue: 42000, contracts: 15, merchants: 8 },
  { month: 'Feb', revenue: 45000, contracts: 18, merchants: 12 },
  { month: 'Mar', revenue: 48000, contracts: 22, merchants: 15 },
  { month: 'Apr', revenue: 52000, contracts: 20, merchants: 18 },
  { month: 'Máj', revenue: 49000, contracts: 25, merchants: 20 },
  { month: 'Jún', revenue: 59000, contracts: 28, merchants: 24 }
];

const industryData = [
  { name: 'Reštaurácie', value: 35, color: '#8884d8' },
  { name: 'Maloobchod', value: 28, color: '#82ca9d' },
  { name: 'Hotelierstvo', value: 20, color: '#ffc658' },
  { name: 'Lekárne', value: 10, color: '#ff7300' },
  { name: 'Služby', value: 7, color: '#0088fe' }
];

const teamPerformanceData = [
  { name: 'Peter Fekiač', revenue: 23800, efficiency: 95, contracts: 12 },
  { name: 'Ladislav Mathis', revenue: 18800, efficiency: 92, contracts: 8 },
  { name: 'Richie Plichta', revenue: 16600, efficiency: 98, contracts: 6 }
];

export const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('management');
  const [dateRange, setDateRange] = useState('6months');
  const [teamMemberFilter, setTeamMemberFilter] = useState('all');

  const reportTypes = [
    { id: 'management', name: 'Manažérsky prehľad', icon: TrendingUp },
    { id: 'performance', name: 'Výkonnostný report', icon: TrendingUp },
    { id: 'financial', name: 'Finančný report', icon: DollarSign },
    { id: 'team', name: 'Report tímu', icon: Users },
    { id: 'clients', name: 'Klientsky report', icon: FileText }
  ];

  const exportReport = (format: string) => {
    console.log(`Exportujem report vo formáte: ${format}`);
    // TODO: Implement actual export functionality
  };

  const stats = [
    {
      label: 'Celkové tržby',
      value: '€295,000',
      icon: DollarSign,
      color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
    },
    {
      label: 'Aktívne reporty',
      value: 12,
      icon: BarChart3,
      color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Mesačný rast',
      value: '+12%',
      icon: TrendingUp,
      color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
    }
  ];

  const actions = (
    <>
      <Button variant="outline" className="flex items-center space-x-2">
        <Clock className="h-4 w-4" />
        <span>Naplánovaný report</span>
      </Button>
      <Button variant="outline" className="flex items-center space-x-2">
        <Settings className="h-4 w-4" />
        <span>Nastavenia reportov</span>
      </Button>
      <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
        <BarChart3 className="h-4 w-4 mr-2" />
        Generovať report
      </Button>
    </>
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={BarChart3}
        title="Detailné reporty"
        description="Komplexná analýza výkonnosti a kľúčových metrík"
        stats={stats}
        actions={actions}
      />

      {/* Report Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Typ reportu a filtre
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={dateRange} onValueChange={setDateRange}>
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
              <Select value={teamMemberFilter} onValueChange={setTeamMemberFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Celý tím</SelectItem>
                  <SelectItem value="team-1">Peter Fekiač</SelectItem>
                  <SelectItem value="team-2">Ladislav Mathis</SelectItem>
                  <SelectItem value="team-3">Richie Plichta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <div className="flex space-x-2 w-full">
                <Button variant="outline" onClick={() => exportReport('pdf')} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" onClick={() => exportReport('excel')} className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Excel
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedReport === 'management' && (
        <div className="space-y-6">
          {/* Team Efficiency and Revenue Breakdown */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <TeamEfficiencyChart />
            <RevenueBreakdownChart />
          </div>
          
          {/* Team Performance Table */}
          <TeamPerformanceTable />
        </div>
      )}

      {/* Performance Report */}
      {selectedReport === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Vývoj výkonnosti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rozdelenie klientov podľa odvetvia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {industryData.map((entry, index) => (
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
      )}

      {/* Team Report */}
      {selectedReport === 'team' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Porovnanie výkonnosti tímu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamPerformanceData}>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamPerformanceData.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Mesačné tržby:</span>
                    <span className="font-semibold">€{member.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Efektivita:</span>
                    <Badge variant="secondary">{member.efficiency}%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Zmluvy:</span>
                    <span className="font-semibold">{member.contracts}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Financial Report */}
      {selectedReport === 'financial' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Celkové tržby</p>
                  <p className="text-2xl font-bold">€295,000</p>
                  <p className="text-xs text-green-600">+12% oproti minulému obdobiu</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Priemerná marža</p>
                  <p className="text-2xl font-bold">24.5%</p>
                  <p className="text-xs text-blue-600">+2.1% oproti minulému obdobiu</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Počet transakcií</p>
                  <p className="text-2xl font-bold">12,847</p>
                  <p className="text-xs text-purple-600">+8% oproti minulému obdobiu</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Aktívni klienti</p>
                  <p className="text-2xl font-bold">145</p>
                  <p className="text-xs text-orange-600">+5 nových klientov</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Client Report */}
      {selectedReport === 'clients' && (
        <Card>
          <CardHeader>
            <CardTitle>Klientska analýza</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800">Nový klienti</h3>
                  <p className="text-2xl font-bold text-green-600">24</p>
                  <p className="text-sm text-green-600">Za posledných 30 dní</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Retention rate</h3>
                  <p className="text-2xl font-bold text-blue-600">94.2%</p>
                  <p className="text-sm text-blue-600">12-mesačný priemer</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800">LTV</h3>
                  <p className="text-2xl font-bold text-purple-600">€18,500</p>
                  <p className="text-sm text-purple-600">Priemerná hodnota klienta</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
