
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RevenueData {
  month: string;
  services: number;
  devices: number;
  commissions: number;
  licenses: number;
  total: number;
}

const mockRevenueData: RevenueData[] = [
  {
    month: 'Január',
    services: 15000,
    devices: 28000,
    commissions: 12000,
    licenses: 8000,
    total: 63000
  },
  {
    month: 'Február',
    services: 18000,
    devices: 32000,
    commissions: 14000,
    licenses: 9500,
    total: 73500
  },
  {
    month: 'Marec',
    services: 16500,
    devices: 29000,
    commissions: 13500,
    licenses: 8800,
    total: 67800
  },
  {
    month: 'Apríl',
    services: 19000,
    devices: 35000,
    commissions: 15500,
    licenses: 10200,
    total: 79700
  },
  {
    month: 'Máj',
    services: 20500,
    devices: 38000,
    commissions: 16800,
    licenses: 11000,
    total: 86300
  },
  {
    month: 'Jún',
    services: 22000,
    devices: 41000,
    commissions: 18200,
    licenses: 12500,
    total: 93700
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, item: any) => sum + item.value, 0);
    
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="font-semibold">{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} style={{ color: item.color }}>
            {item.name}: <span className="font-bold">€{item.value.toLocaleString()}</span> 
            <span className="text-gray-500 ml-2">({((item.value / total) * 100).toFixed(1)}%)</span>
          </p>
        ))}
        <hr className="my-2" />
        <p className="font-bold">Celkom: €{total.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export const RevenueBreakdownChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedPartner, setSelectedPartner] = useState('all');

  const handleExport = (format: string) => {
    console.log(`Exportujem revenue data vo formáte: ${format}`);
    // TODO: Implement actual export functionality
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Tržby a zisky
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
              <Download className="h-4 w-4 mr-1" />
              PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
              <Download className="h-4 w-4 mr-1" />
              Excel
            </Button>
          </div>
        </CardTitle>
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Posledné 3 mesiace</SelectItem>
                <SelectItem value="6months">Posledných 6 mesiacov</SelectItem>
                <SelectItem value="1year">Posledný rok</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={selectedPartner} onValueChange={setSelectedPartner}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetci partneri</SelectItem>
                <SelectItem value="partner1">Partner A</SelectItem>
                <SelectItem value="partner2">Partner B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockRevenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="services" stackId="a" fill="#3b82f6" name="Služby" />
              <Bar dataKey="devices" stackId="a" fill="#10b981" name="Zariadenia" />
              <Bar dataKey="commissions" stackId="a" fill="#8b5cf6" name="Provízie" />
              <Bar dataKey="licenses" stackId="a" fill="#f59e0b" name="Licencie" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
