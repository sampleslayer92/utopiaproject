
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Calendar, Users, Activity } from 'lucide-react';
import { DashboardFilters } from '@/types/activity';

interface DashboardFiltersProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

export const DashboardFiltersComponent: React.FC<DashboardFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const updateFilter = (key: keyof DashboardFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <Card className="shadow-sm border-gray-200 dark:border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filtre dashboardu
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Časové obdobie
            </label>
            <Select value={filters.period} onValueChange={(value: any) => updateFilter('period', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Posledný mesiac</SelectItem>
                <SelectItem value="quarter">Posledný kvartál</SelectItem>
                <SelectItem value="custom">Vlastný rozsah</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Člen tímu
            </label>
            <Select value={filters.teamMember} onValueChange={(value: any) => updateFilter('teamMember', value)}>
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
          
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <Activity className="h-4 w-4 mr-1" />
              Typ akcie
            </label>
            <Select value={filters.actionType} onValueChange={(value: any) => updateFilter('actionType', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky akcie</SelectItem>
                <SelectItem value="contract">Zmluvy</SelectItem>
                <SelectItem value="client">Klienti</SelectItem>
                <SelectItem value="device">Zariadenia</SelectItem>
                <SelectItem value="status">Stavy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
