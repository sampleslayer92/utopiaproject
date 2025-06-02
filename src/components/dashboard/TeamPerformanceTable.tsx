
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TeamPerformanceData {
  id: string;
  name: string;
  drafts: number;
  signed: number;
  rejected: number;
  expired: number;
  monthlyReward: number;
  clientRevenue: number;
  conversionRate: number;
  goal: number;
}

const mockPerformanceData: TeamPerformanceData[] = [
  {
    id: 'team-1',
    name: 'Peter Fekiač',
    drafts: 3,
    signed: 12,
    rejected: 5,
    expired: 0,
    monthlyReward: 2850,
    clientRevenue: 28500,
    conversionRate: 60,
    goal: 30000
  },
  {
    id: 'team-2',
    name: 'Ladislav Mathis',
    drafts: 2,
    signed: 8,
    rejected: 4,
    expired: 1,
    monthlyReward: 1880,
    clientRevenue: 18800,
    conversionRate: 53,
    goal: 25000
  },
  {
    id: 'team-3',
    name: 'Richie Plichta',
    drafts: 1,
    signed: 16,
    rejected: 2,
    expired: 0,
    monthlyReward: 3200,
    clientRevenue: 32000,
    conversionRate: 89,
    goal: 28000
  }
];

export const TeamPerformanceTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const filteredData = mockPerformanceData.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getConversionColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleMemberClick = (memberId: string) => {
    navigate(`/dashboard/team/${memberId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Detailná výkonnosť členov tímu
        </CardTitle>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Hľadať člena tímu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Všetci členovia</SelectItem>
              <SelectItem value="high">Vysoká výkonnosť</SelectItem>
              <SelectItem value="low">Nízka výkonnosť</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Člen tímu</TableHead>
              <TableHead className="text-center">Návrhy</TableHead>
              <TableHead className="text-center">Podpísané</TableHead>
              <TableHead className="text-center">Zamietnuté</TableHead>
              <TableHead className="text-center">Expirované</TableHead>
              <TableHead className="text-right">Odmena</TableHead>
              <TableHead className="text-right">Obrat klientov</TableHead>
              <TableHead className="text-center">Konverzia</TableHead>
              <TableHead className="text-center">Cieľ</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((member) => (
              <TableRow key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{member.drafts}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {member.signed}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                    {member.rejected}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">{member.expired}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  €{member.monthlyReward.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-medium">
                  €{member.clientRevenue.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className={`font-medium ${getConversionColor(member.conversionRate)}`}>
                      {member.conversionRate}%
                    </span>
                    <div className="w-16">
                      <Progress value={member.conversionRate} className="h-2" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">
                      €{member.clientRevenue.toLocaleString()} / €{member.goal.toLocaleString()}
                    </div>
                    <Progress 
                      value={(member.clientRevenue / member.goal) * 100} 
                      className="h-2"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleMemberClick(member.id)}
                    className="flex items-center gap-1"
                  >
                    <User className="h-4 w-4" />
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
