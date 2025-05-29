
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Smartphone, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  CreditCard, 
  Plus,
  Headphones,
  Settings,
  BarChart3
} from 'lucide-react';

export const LocationDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-full">
      {/* Enhanced Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Prevádzka panel</h1>
                  <p className="text-orange-100 text-lg mt-1">
                    Vitajte späť! Vaša prevádzka je aktívna.
                  </p>
                </div>
              </div>
              <p className="text-orange-100 max-w-2xl">
                Spravujte zariadenia, sledujte transakcie a udržujte prevádzku v chode.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg" 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Pridať zariadenie
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Headphones className="h-5 w-5 mr-2" />
                Kontakt podpory
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Report prevádzky
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Denné tržby</p>
                <p className="text-2xl font-bold text-green-600 mb-1">€2,840</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">+8.2% vs včera</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Aktívne zariadenia</p>
                <p className="text-2xl font-bold text-blue-600 mb-1">8/8</p>
                <span className="text-xs text-green-600 font-medium">Všetky online</span>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Transakcie dnes</p>
                <p className="text-2xl font-bold text-purple-600 mb-1">247</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-purple-500" />
                  <span className="text-xs text-purple-600 font-medium">+12% vs včera</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Stav systému</p>
                <p className="text-2xl font-bold text-green-600 mb-1">99.8%</p>
                <span className="text-xs text-green-600 font-medium">Výborná dostupnosť</span>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Status Cards */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700 dark:to-slate-700">
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-gray-600" />
            Status zariadení v prevádzke
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((device) => (
              <div key={device} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm bg-gradient-to-r from-green-500 to-emerald-500">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Terminal {device}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">TID: 87654{device}21</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">99.2% uptime</p>
                    <Progress value={99.2} className="w-16 h-2" />
                  </div>
                  <Badge variant="default" className="min-w-[60px] justify-center">
                    Online
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
