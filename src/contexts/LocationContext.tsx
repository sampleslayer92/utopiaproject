
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Location {
  id: string;
  name: string;
  address: string;
  type: 'retail' | 'restaurant' | 'travel' | 'online';
  devicesCount: number;
  monthlyRevenue: number;
  isActive: boolean;
}

interface LocationContextType {
  selectedLocation: Location | null;
  allLocations: Location[];
  setSelectedLocation: (location: Location | null) => void;
  isOverviewMode: boolean;
  setOverviewMode: (isOverview: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const demoLocations: Location[] = [
  {
    id: 'loc-1',
    name: 'Hlavná pobočka',
    address: 'Hlavná 15, Bratislava centrum',
    type: 'retail',
    devicesCount: 6,
    monthlyRevenue: 12500,
    isActive: true
  },
  {
    id: 'loc-2', 
    name: 'Letisko',
    address: 'M. R. Štefánika Airport, Bratislava',
    type: 'travel',
    devicesCount: 4,
    monthlyRevenue: 8200,
    isActive: true
  },
  {
    id: 'loc-3',
    name: 'Eurovea',
    address: 'Eurovea, Pribinova 8, Bratislava',
    type: 'retail',
    devicesCount: 8,
    monthlyRevenue: 15800,
    isActive: true
  },
  {
    id: 'loc-4',
    name: 'Online shop',
    address: 'E-commerce platforma',
    type: 'online',
    devicesCount: 2,
    monthlyRevenue: 6500,
    isActive: true
  }
];

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isOverviewMode, setOverviewMode] = useState(true);

  return (
    <LocationContext.Provider value={{
      selectedLocation,
      allLocations: demoLocations,
      setSelectedLocation,
      isOverviewMode,
      setOverviewMode
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
