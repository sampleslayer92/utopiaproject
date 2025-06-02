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
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';
import { AddEmployeeDialog } from './AddEmployeeDialog';
import { DashboardFiltersComponent } from './DashboardFilters';
import { RecentTeamActivity } from './RecentTeamActivity';
import { TeamEfficiencyChart } from './TeamEfficiencyChart';
import { RevenueBreakdownChart } from './RevenueBreakdownChart';
import { DashboardFilters } from '@/types/activity';
import { getTeamActivities, getTeamPerformanceData, getRevenueData } from '@/services/dashboardDataService';

// Mock data pre tímovú výkonnosť s filtrovaním
const teamPerformanceData = [
  { month: 'Jan', peter: 85, ladislav: 78, richie: 92, maria: 75, jan: 68 },
  { month: 'Feb', peter: 88, ladislav: 82, richie: 95, maria: 78, jan: 72 },
  { month: 'Mar', peter: 92, ladislav: 85, richie: 88, maria: 82, jan: 76 },
  { month: 'Apr', peter: 95, ladislav: 88, richie: 98, maria: 85, jan: 80 },
  { month: 'Máj', peter: 90, ladislav: 92, richie: 96, maria: 87, jan: 84 },
  { month: 'Jún', peter: 97, ladislav: 89, richie: 99, maria: 89, jan: 87 }
];

const revenueAndProfitData = [
  { month: 'Jan', revenue: 59200, profit: 18760, expenses: 40440 },
  { month: 'Feb', revenue: 63400, profit: 20288, expenses: 43112 },
  { month: 'Mar', revenue: 68800, profit: 22016, expenses: 46784 },
  { month: 'Apr', revenue: 72600, profit: 23232, expenses: 49368 },
  { month: 'Máj', revenue: 69800, profit: 22336, expenses: 47464 },
  { month: 'Jún', revenue: 76200, profit: 24384, expenses: 51816 }
];

const monthlyRevenueData = [
  { name: 'Peter Fekiač', revenue: 23800, contracts: 12, efficiency: 95 },
  { name: 'Ladislav Mathis', revenue: 18800, contracts: 8, efficiency: 92 },
  { name: 'Richie Plichta', revenue: 16600, contracts: 6, efficiency: 98 },
  { name: 'Mária Novotná', revenue: 14200, contracts: 4, efficiency: 87 },
  { name: 'Ján Kováč', revenue: 12800, contracts: 3, efficiency: 89 }
];

export const AdminDashboard: React.FC = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    period: 'quarter',
    teamMember: 'all',
    actionType: 'all'
  });

  const handleAddEmployee = (employee: any) => {
    console.log('New employee added:', employee);
  };

  // Get filtered data using the centralized service
  const activities = getTeamActivities(filters);
  const teamData = getTeamPerformanceData(filters);
  const revenueData = getRevenueData(filters);

  // Funkcionalita filtra - filtrovanie dát na základe vybraných filtrov
  const getFilteredPerformanceData = () => {
    let data = [...teamPerformanceData];
    
    // Filter by period
    if (filters.period === '1month') {
      data = data.slice(-1);
    } else if (filters.period === '3months') {
      data = data.slice(-3);
    } else if (filters.period === '6months') {
      data = data.slice(-6);
    }
    
    return data;
  };

  const getFilteredRevenueData = () => {
    let data = [...revenueAndProfitData];
    
    if (filters.period === '1month') {
      data = data.slice(-1);
    } else if (filters.period === '3months') {
      data = data.slice(-3);
    } else if (filters.period === '6months') {
      data = data.slice(-6);
    }
    
    return data;
  };

  const applyFilters = () => {
    // Trigger re-render with new filtered data
    console.log('Applying filters:', { filters });
  };

  // Get lines to display based on member filter
  const getPerformanceLines = () => {
    const memberFilter = filters.teamMember;
    if (memberFilter === 'all') {
      return (
        <>
          <Line type="monotone" dataKey="peter" stroke="#3b82f6" strokeWidth={3} name="Peter Fekiač" />
          <Line type="monotone" dataKey="ladislav" stroke="#10b981" strokeWidth={3} name="Ladislav Mathis" />
          <Line type="monotone" dataKey="richie" stroke="#f59e0b" strokeWidth={3} name="Richie Plichta" />
          <Line type="monotone" dataKey="maria" stroke="#ef4444" strokeWidth={3} name="Mária Novotná" />
          <Line type="monotone" dataKey="jan" stroke="#8b5cf6" strokeWidth={3} name="Ján Kováč" />
        </>
      );
    } else {
      return <Line type="monotone" dataKey={memberFilter} stroke="#3b82f6" strokeWidth={3} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Panel */}
      <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <BarChart3 className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">Admin Dashboard</h2>
                <p className="text-blue-100 text-sm">
                  Komplexný prehľad výkonnosti tímu a obchodných výsledkov
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
                <Download className="h-4 w-4 mr-2" />
                Export reportu
              </Button>
              <Button variant="outline" className="bg-white/20 hover:bg-white/30 border-white/30 text-white">
                <Settings className="h-4 w-4 mr-2" />
                Nastavenia
              </Button>
              <AddEmployeeDialog onAddEmployee={handleAddEmployee} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Filters */}
      <DashboardFiltersComponent filters={filters} onFiltersChange={setFilters} />

      {/* Enhanced Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Aktívni členovia</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">5</p>
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
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">92%</p>
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
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">33</p>
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
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Mesačné tržby</p>
                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">€86.2K</p>
                <div className="flex items-center mt-2">
                  <DollarSign className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-sm text-orange-600">+12% MoM</span>
                </div>
              </div>
              <div className="p-3 bg-orange-600 rounded-full">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section - Team Efficiency and Revenue Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TeamEfficiencyChart />
        <RevenueBreakdownChart />
      </div>

      {/* Recent Team Activity - Replaces Team Performance Details */}
      <RecentTeamActivity activities={activities} />
    </div>
  );
};
