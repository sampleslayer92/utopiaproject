
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';

interface TeamEfficiencyData {
  name: string;
  contractsSent: number;
  contractsSigned: number;
  reward: number;
  conversionRate: number;
}

const mockTeamEfficiencyData: TeamEfficiencyData[] = [
  {
    name: 'Peter Fekiač',
    contractsSent: 20,
    contractsSigned: 12,
    reward: 2850,
    conversionRate: 60
  },
  {
    name: 'Ladislav Mathis',
    contractsSent: 15,
    contractsSigned: 8,
    reward: 1880,
    conversionRate: 53
  },
  {
    name: 'Richie Plichta',
    contractsSent: 18,
    contractsSigned: 16,
    reward: 3200,
    conversionRate: 89
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="font-semibold">{label}</p>
        <p className="text-blue-600">
          Odoslané zmluvy: <span className="font-bold">{data.contractsSent}</span>
        </p>
        <p className="text-green-600">
          Podpísané zmluvy: <span className="font-bold">{data.contractsSigned}</span>
        </p>
        <p className="text-purple-600">
          Odmena: <span className="font-bold">€{data.reward.toLocaleString()}</span>
        </p>
        <p className="text-orange-600">
          Konverzia: <span className="font-bold">{data.conversionRate}%</span> ({data.contractsSigned}/{data.contractsSent})
        </p>
      </div>
    );
  }
  return null;
};

export const TeamEfficiencyChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Efektivita tímu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockTeamEfficiencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="contractsSent" fill="#93c5fd" name="Odoslané zmluvy" />
              <Bar dataKey="contractsSigned" fill="#3b82f6" name="Podpísané zmluvy" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
