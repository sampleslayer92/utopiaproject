
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin, BarChart3 } from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';

export const LocationSelector: React.FC = () => {
  const { selectedLocation, allLocations, setSelectedLocation, isOverviewMode, setOverviewMode } = useLocation();

  const handleLocationChange = (locationId: string) => {
    if (locationId === 'overview') {
      setOverviewMode(true);
      setSelectedLocation(null);
    } else {
      const location = allLocations.find(loc => loc.id === locationId);
      if (location) {
        setOverviewMode(false);
        setSelectedLocation(location);
      }
    }
  };

  const getLocationTypeIcon = (type: string) => {
    switch (type) {
      case 'retail': return '🏪';
      case 'restaurant': return '🍽️';
      case 'travel': return '✈️';
      case 'online': return '💻';
      default: return '🏢';
    }
  };

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 mb-2">
        <MapPin className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Prevádzka</span>
      </div>
      
      <Select 
        value={isOverviewMode ? 'overview' : selectedLocation?.id || 'overview'} 
        onValueChange={handleLocationChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Vyberte prevádzku" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="overview">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Všeobecný prehľad</span>
            </div>
          </SelectItem>
          {allLocations.map((location) => (
            <SelectItem key={location.id} value={location.id}>
              <div className="flex items-center space-x-2">
                <span>{getLocationTypeIcon(location.type)}</span>
                <div>
                  <div className="font-medium">{location.name}</div>
                  <div className="text-xs text-gray-500">{location.devicesCount} zariadení</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {!isOverviewMode && selectedLocation && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-100">
                {selectedLocation.name}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-300">
                €{selectedLocation.monthlyRevenue.toLocaleString()}/mesiac
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-600 dark:text-blue-300">
                {selectedLocation.devicesCount} zariadení
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                selectedLocation.isActive 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {selectedLocation.isActive ? 'Aktívna' : 'Neaktívna'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
