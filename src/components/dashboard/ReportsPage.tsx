
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign, Users, CreditCard, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const monthlyData = [
  { name: 'Jan', revenue: 45000, transactions: 1200, clients: 45 },
  { name: 'Feb', revenue: 52000, transactions: 1350, clients: 48 },
  { name: 'Mar', revenue: 48000, transactions: 1280, clients: 50 },
  { name: 'Apr', revenue: 61000, transactions: 1450, clients: 53 },
  { name: 'Máj', revenue: 58000, transactions: 1380, clients: 55 },
  { name: 'Jún', revenue: 67000, transactions: 1520, clients: 58 },
];

const transactionTypeData = [
  { name: 'Kartové platby', value: 68, color: '#8884d8' },
  { name: 'Bezkontaktné', value: 25, color: '#82ca9d' },
  { name: 'Mobilné platby', value: 7, color: '#ffc658' },
];

export const ReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  // Only admins (ISO Organizácia) can view reports
  if (!user || user.role !== 'admin') {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Prístup zamietnutý
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Reporty sú dostupné len pre ISO Organizáciu. Ako klient nemáte oprávnenie na zobrazenie týchto dát.
          </p>
        </div>
      </div>
    );
  }

  const currentRevenue = 67000;
  const previousRevenue = 58000;
  const revenueGrowth = ((currentRevenue - previousRevenue) / previousRevenue) * 100;

  const currentTransactions = 1520;
  const previousTransactions = 1380;
  const transactionGrowth = ((currentTransactions - previousTransactions) / previousTransactions) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reporty
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Komplexné analýzy a štatistiky výkonnosti
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Týždeň</SelectItem>
              <SelectItem value="month">Mesiac</SelectItem>
              <SelectItem value="quarter">Štvrťrok</SelectItem>
              <SelectItem value="year">Rok</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Prehľad</SelectItem>
              <SelectItem value="financial">Finančné</SelectItem>
              <SelectItem value="clients">Klienti</SelectItem>
              <SelectItem value="transactions">Transakcie</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Vlastný rozsah
          </Button>
          
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mesačné tržby</p>
                <p className="text-2xl font-bold">€{currentRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  {revenueGrowth > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${revenueGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(revenueGrowth).toFixed(1)}%
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Transakcie</p>
                <p className="text-2xl font-bold">{currentTransactions.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  {transactionGrowth > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${transactionGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(transactionGrowth).toFixed(1)}%
                  </span>
                </div>
              </div>
              <CreditCard className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktívni klienti</p>
                <p className="text-2xl font-bold">58</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">5.5%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Priemerná transakcia</p>
                <p className="text-2xl font-bold">€{Math.round(currentRevenue / currentTransactions)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">2.1%</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mesačné tržby</CardTitle>
            <CardDescription>Vývoj tržieb za posledných 6 mesiacov</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value?.toLocaleString()}`, 'Tržby']} />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Typy platieb</CardTitle>
            <CardDescription>Rozloženie platieb podľa typu</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transactionTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {transactionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trend transakcií</CardTitle>
            <CardDescription>Počet transakcií za posledných 6 mesiacov</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [value?.toLocaleString(), 'Transakcie']} />
                <Line type="monotone" dataKey="transactions" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
