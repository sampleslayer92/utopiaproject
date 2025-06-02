import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  TrendingUp, 
  Award,
  Target,
  BarChart3,
  Settings,
  DollarSign,
  Download,
  Calendar,
  Plus,
  ArrowUpRight,
  Bell,
  CheckCircle,
  Clock
} from 'lucide-react';
import { AddEmployeeDialog } from './AddEmployeeDialog';
import { RecentTeamActivity } from './RecentTeamActivity';
import { TeamEfficiencyChart } from './TeamEfficiencyChart';
import { RevenueBreakdownChart } from './RevenueBreakdownChart';
import { DashboardFilters } from '@/types/activity';
import { getTeamActivities } from '@/services/dashboardDataService';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const AdminDashboard: React.FC = () => {
  const [filters] = useState<DashboardFilters>({
    period: 'quarter',
    teamMember: 'all',
    actionType: 'all'
  });

  const handleAddEmployee = (employee: any) => {
    console.log('New employee added:', employee);
  };

  const activities = getTeamActivities(filters);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Dobrý deň, Marián!</h1>
                  <p className="text-blue-100 text-lg mt-1">
                    Vitajte späť v administrátorskom rozhraní
                  </p>
                </div>
              </div>
              <p className="text-blue-100 max-w-2xl">
                Máte <span className="font-bold">3 nové notifikácie</span> a <span className="font-bold">5 čakajúcich úloh</span> na dnešný deň. Váš tím dosiahol <span className="font-bold">92% efektivitu</span> tento mesiac.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg" 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nový klient
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent hover:bg-white/10 border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="h-5 w-5 mr-2" />
                Stiahnuť report
              </Button>
              <AddEmployeeDialog onAddEmployee={handleAddEmployee} />
            </div>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Aktívni členovia</p>
                <p className="text-3xl font-bold text-blue-600 mb-1">5</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">+2 tento mesiac</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Priemerná efektivita</p>
                <p className="text-3xl font-bold text-green-600 mb-1">92%</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">+3% oproti minulému</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Celkom zmluv</p>
                <p className="text-3xl font-bold text-purple-600 mb-1">33</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">+8 tento mesiac</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Mesačné tržby</p>
                <p className="text-3xl font-bold text-orange-600 mb-1">€86.2K</p>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-orange-600 font-medium">+12% MoM</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks & Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Dnešné úlohy</span>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                Zobraziť všetky
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Onboarding nového klienta - Kaviareň Mlynská', priority: 'high', due: '10:30', completed: false },
                { title: 'Kontrola mesačných reportov', priority: 'medium', due: '12:00', completed: false },
                { title: 'Aktualizácia cenníka služieb', priority: 'medium', due: '14:00', completed: false },
                { title: 'Telefonát s partnerom - TechSolutions', priority: 'high', due: '15:30', completed: false },
                { title: 'Príprava prezentácie pre vedenie', priority: 'low', due: '16:45', completed: true }
              ].map((task, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${task.completed ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      task.completed 
                        ? 'bg-green-100 text-green-600' 
                        : task.priority === 'high' 
                          ? 'bg-red-100 text-red-600' 
                          : task.priority === 'medium' 
                            ? 'bg-orange-100 text-orange-600' 
                            : 'bg-blue-100 text-blue-600'
                    }`}>
                      {task.completed ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                    </div>
                    <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={task.completed ? "secondary" : "outline"} className="text-xs">
                      {task.due}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      {task.completed ? <CheckCircle className="h-4 w-4 text-green-500" /> : <CheckCircle className="h-4 w-4 text-gray-400" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Nadchádzajúce udalosti</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Týždenný meeting tímu', time: '9:00 - 10:00', type: 'internal' },
                { title: 'Prezentácia pre nového klienta', time: '11:30 - 12:30', type: 'client' },
                { title: 'Školenie - Nové produkty', time: '14:00 - 15:30', type: 'training' },
                { title: 'Stretnutie s partnerom', time: '16:00 - 17:00', type: 'partner' }
              ].map((event, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className={`w-2 h-10 rounded-full ${
                    event.type === 'internal' ? 'bg-blue-500' :
                    event.type === 'client' ? 'bg-green-500' :
                    event.type === 'training' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Pridať udalosť
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance Goals */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Plnenie mesačných cieľov
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tržby</span>
                <span className="text-sm text-gray-500">€86.2K / €100K</span>
              </div>
              <Progress value={86} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>86% z cieľa</span>
                <span>Zostáva 3 dni</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Nové zmluvy</span>
                <span className="text-sm text-gray-500">33 / 40</span>
              </div>
              <Progress value={82.5} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>82.5% z cieľa</span>
                <span>Zostáva 7 zmlúv</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Noví klienti</span>
                <span className="text-sm text-gray-500">12 / 15</span>
              </div>
              <Progress value={80} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>80% z cieľa</span>
                <span>Zostávajú 3 klienti</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section - Team Efficiency and Revenue Breakdown with local filters */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TeamEfficiencyChart />
        <RevenueBreakdownChart />
      </div>

      {/* Recent Team Activity */}
      <RecentTeamActivity activities={activities} />
    </div>
  );
};