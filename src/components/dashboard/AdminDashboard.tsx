
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  Bell,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock data for charts
const revenueData = [
  { month: 'Jan', revenue: 42000, target: 40000 },
  { month: 'Feb', revenue: 45000, target: 42000 },
  { month: 'Mar', revenue: 48000, target: 45000 },
  { month: 'Apr', revenue: 52000, target: 48000 },
  { month: 'Máj', revenue: 49000, target: 50000 },
  { month: 'Jún', revenue: 59000, target: 55000 }
];

const ticketData = [
  { name: 'Pon', open: 12, resolved: 8 },
  { name: 'Uto', open: 8, resolved: 12 },
  { name: 'Str', open: 15, resolved: 10 },
  { name: 'Štv', open: 6, resolved: 14 },
  { name: 'Pia', open: 10, resolved: 12 },
  { name: 'Sob', open: 4, resolved: 6 },
  { name: 'Ned', open: 2, resolved: 3 }
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Vitajte Marián Lapoš</h1>
            <p className="text-blue-100">
              Máte nové upozornenia a úlohy na dnes. Prehľad vašej organizácie nájdete nižšie.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">€59k</div>
              <div className="text-sm text-blue-200">Mesačné tržby</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">145</div>
              <div className="text-sm text-blue-200">Aktívni klienti</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Celkom klientov</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-green-600">+12% tento mesiac</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Aktívne zmluvy</p>
                <p className="text-2xl font-bold">89</p>
                <p className="text-xs text-green-600">+5 nových</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Konverzia</p>
                <p className="text-2xl font-bold">68%</p>
                <p className="text-xs text-green-600">+3.2% oproti minulému</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Priemerná marža</p>
                <p className="text-2xl font-bold">24.5%</p>
                <p className="text-xs text-green-600">+1.2% oproti cieľu</p>
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
              Vývoj tržieb
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="target" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Tikety (týždeň)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ticketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="open" stroke="#ff7300" strokeWidth={2} />
                  <Line type="monotone" dataKey="resolved" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Nedávne upozornenia
              </span>
              <Badge variant="secondary">5 nových</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Urgentný tiket #T-2024-089</p>
                  <p className="text-xs text-gray-600">Pizza Mizza má problém s platobným terminálom</p>
                  <p className="text-xs text-gray-500">pred 15 min</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Nová zmluva podpísaná</p>
                  <p className="text-xs text-gray-600">Bistro Centrum - zmluva na 24 mesiacov</p>
                  <p className="text-xs text-gray-500">pred 2 hod</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Nový obchodný partner</p>
                  <p className="text-xs text-gray-600">TechPay s.r.o. sa zaregistroval do systému</p>
                  <p className="text-xs text-gray-500">pred 4 hod</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Dnešné úlohy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Kontrola nových žiadostí</p>
                    <p className="text-xs text-gray-600">5 nových žiadostí čaká na schválenie</p>
                  </div>
                </div>
                <Badge variant="destructive">Vysoká</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Mesačný report</p>
                    <p className="text-xs text-gray-600">Pripraviť report pre stakeholderov</p>
                  </div>
                </div>
                <Badge variant="secondary">Stredná</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Tímový meeting</p>
                    <p className="text-xs text-gray-600">Týždenné stretnutie o 14:00</p>
                  </div>
                </div>
                <Badge variant="outline">Nízka</Badge>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                Zobraziť všetky úlohy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
