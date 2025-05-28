
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Smartphone, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  CreditCard, 
  Users, 
  MapPin, 
  BarChart3,
  Plus,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { CreateTicketDialog } from './CreateTicketDialog';

const weeklyData = [
  { day: 'Pon', transactions: 450, revenue: 2340 },
  { day: 'Uto', transactions: 520, revenue: 2680 },
  { day: 'Str', transactions: 380, revenue: 1950 },
  { day: 'Štv', transactions: 620, revenue: 3200 },
  { day: 'Pia', transactions: 750, revenue: 3890 },
  { day: 'Sob', transactions: 890, revenue: 4560 },
  { day: 'Ned', transactions: 680, revenue: 3510 }
];

const devicePerformanceData = [
  { name: 'Terminal 1', transactions: 1250, uptime: 99.2, revenue: 6450 },
  { name: 'Terminal 2', transactions: 980, uptime: 97.8, revenue: 5120 },
  { name: 'Terminal 3', transactions: 1180, uptime: 98.5, revenue: 6180 },
  { name: 'Terminal 4', transactions: 750, uptime: 95.2, revenue: 3890 }
];

export const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const handleTicketCreated = () => {
    console.log('Quick ticket created');
  };

  return (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard - {user?.fullName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Prehľad výkonnosti vašich zariadení
          </p>
        </div>
        <div className="flex gap-3">
          <CreateTicketDialog onTicketCreated={handleTicketCreated} />
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Detailný report
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Denné tržby</p>
                <p className="text-2xl font-bold text-green-600">€3,890</p>
                <p className="text-xs text-green-600 mt-1">+12.5% vs včera</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Transakcie dnes</p>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
                <p className="text-xs text-blue-600 mt-1">+8.3% vs včera</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktívne zariadenia</p>
                <p className="text-2xl font-bold text-purple-600">4/4</p>
                <p className="text-xs text-green-600 mt-1">Všetky online</p>
              </div>
              <Smartphone className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Priemerná dostupnosť</p>
                <p className="text-2xl font-bold text-orange-600">98.2%</p>
                <p className="text-xs text-green-600 mt-1">Výborná</p>
              </div>
              <Zap className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Týždenný trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Transakcie"
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Tržby (€)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Výkonnosť zariadení</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={devicePerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="transactions" fill="#8b5cf6" name="Transakcie" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Status and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Status zariadení</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devicePerformanceData.map((device, index) => (
                <div key={device.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{device.name}</h4>
                      <p className="text-sm text-gray-500">TID: T{1000 + index}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm font-medium">{device.transactions} transakcií</p>
                      <p className="text-xs text-gray-500">€{device.revenue.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{device.uptime}% uptime</p>
                      <Progress value={device.uptime} className="w-20 h-2" />
                    </div>
                    <Badge variant={device.uptime > 98 ? 'default' : device.uptime > 95 ? 'secondary' : 'destructive'}>
                      {device.uptime > 98 ? 'Výborné' : device.uptime > 95 ? 'Dobré' : 'Problémy'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rýchle akcie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CreateTicketDialog onTicketCreated={handleTicketCreated}>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Nahlásiť problém
              </Button>
            </CreateTicketDialog>
            
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Mesačný report
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Správa používateľov
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Nastavenia prevádzky
            </Button>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Posledné upozornenia</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Údržba dokončená</p>
                    <p className="text-gray-500">Terminal 2 - pred 2h</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Nízka úroveň papiera</p>
                    <p className="text-gray-500">Terminal 1 - pred 4h</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Mesačný súhrn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">€89,240</p>
              <p className="text-sm text-gray-500">Celkové tržby</p>
              <p className="text-xs text-green-600">+15.2% vs minulý mesiac</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">28,947</p>
              <p className="text-sm text-gray-500">Celkové transakcie</p>
              <p className="text-xs text-blue-600">+8.7% vs minulý mesiac</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">€30.84</p>
              <p className="text-sm text-gray-500">Priemerná transakcia</p>
              <p className="text-xs text-purple-600">+2.1% vs minulý mesiac</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">97.8%</p>
              <p className="text-sm text-gray-500">Priemerná dostupnosť</p>
              <p className="text-xs text-green-600">Stabilná</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
