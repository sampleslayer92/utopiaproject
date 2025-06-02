
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Filter } from 'lucide-react';

interface TeamEfficiencyData {
  name: string;
  contractsSent: number;
  contractsSigned: number;
  reward: number;
  conversionRate: number;
}

// Using centralized data - this will be the same data as in reports
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
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
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
  const [selectedPeriod, setSelectedPeriod] = useState('quarter');
  const [selectedMember, setSelectedMember] = useState('all');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Efektivita tímu
          </div>
          <Filter className="h-4 w-4 text-gray-400" />
        </CardTitle>
        <div className="flex gap-3 mt-4">
          <div className="flex-1">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Posledný mesiac</SelectItem>
                <SelectItem value="quarter">Posledný kvartál</SelectItem>
                <SelectItem value="year">Posledný rok</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger className="h-8 text-sm">
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
        </div>
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
