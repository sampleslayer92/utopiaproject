
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zariadenie } from '@/types/onboarding';

// Mock data for devices
const mockZariadenia: (Zariadenie & { status: string, lastActive: string })[] = [
  {
    id: 'dev-001',
    nazov: 'PAX A920',
    pocetKs: 1,
    typNakupu: 'Prenájom',
    viazanost: 24,
    frekvenciaPlatby: 'mesačne',
    selected: true,
    hasWifi: true,
    hasSim: true,
    status: 'Online',
    lastActive: '2025-05-22T09:32:11',
    statadlo: 'SN12345678',
    seriove_cislo: 'A920-123456'
  },
  {
    id: 'dev-002',
    nazov: 'PAX A80',
    pocetKs: 1,
    typNakupu: 'Prenájom',
    viazanost: 24,
    frekvenciaPlatby: 'mesačne',
    selected: true,
    hasWifi: false,
    hasSim: false,
    status: 'Offline',
    lastActive: '2025-05-21T18:15:43',
    statadlo: 'SN23456789',
    seriove_cislo: 'A80-234567'
  },
  {
    id: 'dev-003',
    nazov: 'SOFTPOS',
    pocetKs: 1,
    typNakupu: 'Prenájom',
    viazanost: 12,
    frekvenciaPlatby: 'mesačne',
    selected: true,
    hasWifi: false,
    hasSim: false,
    status: 'Online',
    lastActive: '2025-05-22T10:05:22',
    seriove_cislo: 'SP-345678'
  },
  {
    id: 'dev-004',
    nazov: 'SIM karta',
    pocetKs: 2,
    typNakupu: 'Prenájom',
    viazanost: 24,
    frekvenciaPlatby: 'mesačne',
    selected: true,
    hasSim: true,
    status: 'Aktívna',
    lastActive: '2025-05-22T10:47:31',
    seriove_cislo: 'SIM-456789'
  }
];

export const DevicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');
  
  // Filter devices based on search term and status filter
  const filteredDevices = mockZariadenia.filter(device => {
    const matchesSearch = 
      device.nazov.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.statadlo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.seriove_cislo?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'online' && device.status === 'Online') ||
      (statusFilter === 'offline' && device.status === 'Offline');
    
    return matchesSearch && matchesStatus;
  });
  
  // Get statistics
  const onlineCount = mockZariadenia.filter(d => d.status === 'Online').length;
  const offlineCount = mockZariadenia.filter(d => d.status === 'Offline').length;
  const totalDevices = mockZariadenia.length;
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sk-SK') + ' ' + date.toLocaleTimeString('sk-SK');
  };
  
  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Offline': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'Aktívna': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Zariadenia</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalDevices}</div>
            <p className="text-muted-foreground">Celkový počet zariadení</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-green-600">{onlineCount}</div>
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <p className="text-muted-foreground">Aktívne zariadenia</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-red-600">{offlineCount}</div>
              <Badge className="bg-red-100 text-red-800">Offline</Badge>
            </div>
            <p className="text-muted-foreground">Neaktívne zariadenia</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Zoznam zariadení</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger 
                value="all" 
                onClick={() => setStatusFilter('all')}
              >
                Všetky
              </TabsTrigger>
              <TabsTrigger 
                value="online" 
                onClick={() => setStatusFilter('online')}
              >
                Online
              </TabsTrigger>
              <TabsTrigger 
                value="offline" 
                onClick={() => setStatusFilter('offline')}
              >
                Offline
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Vyhľadať zariadenie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button>Pridať zariadenie</Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Názov zariadenia</TableHead>
                  <TableHead>Sériové číslo</TableHead>
                  <TableHead>ID zariadenia</TableHead>
                  <TableHead>Stav</TableHead>
                  <TableHead>Naposledy aktívne</TableHead>
                  <TableHead>Pripojenie</TableHead>
                  <TableHead>Akcia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.length > 0 ? (
                  filteredDevices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">{device.nazov}</TableCell>
                      <TableCell>{device.seriove_cislo || '-'}</TableCell>
                      <TableCell className="font-mono text-xs">{device.id}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(device.status)}>
                          {device.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{device.lastActive ? formatDate(device.lastActive) : '-'}</TableCell>
                      <TableCell>
                        {device.hasWifi && <Badge className="mr-1 bg-sky-100 text-sky-800">WiFi</Badge>}
                        {device.hasSim && <Badge className="bg-violet-100 text-violet-800">SIM</Badge>}
                        {!device.hasWifi && !device.hasSim && '-'}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Detail</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Nenašli sa žiadne zariadenia.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
