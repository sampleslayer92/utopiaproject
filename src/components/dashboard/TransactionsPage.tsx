
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Transakcia } from '@/types/onboarding';

// Mock data for transactions
const mockTransakcie: Transakcia[] = [
  {
    id: 'tr-001',
    datum: '2025-05-21T14:32:11',
    suma: 43.50,
    mena: 'EUR',
    typ: 'Platba',
    stav: 'Schválená',
    zakaznik: 'Zákazník 1',
    karta: 'VISA ****1234'
  },
  {
    id: 'tr-002',
    datum: '2025-05-21T13:15:43',
    suma: 18.90,
    mena: 'EUR',
    typ: 'Platba',
    stav: 'Schválená',
    zakaznik: 'Zákazník 2',
    karta: 'Mastercard ****5678'
  },
  {
    id: 'tr-003',
    datum: '2025-05-21T11:05:22',
    suma: 32.75,
    mena: 'EUR',
    typ: 'Platba',
    stav: 'Schválená',
    zakaznik: 'Zákazník 3',
    karta: 'VISA ****9012'
  },
  {
    id: 'tr-004',
    datum: '2025-05-21T10:47:31',
    suma: 15.20,
    mena: 'EUR',
    typ: 'Vrátenie',
    stav: 'Schválená',
    zakaznik: 'Zákazník 4',
    karta: 'VISA ****3456'
  },
  {
    id: 'tr-005',
    datum: '2025-05-20T16:23:55',
    suma: 50.00,
    mena: 'EUR',
    typ: 'Predautorizácia',
    stav: 'Čaká sa',
    zakaznik: 'Zákazník 5',
    karta: 'Mastercard ****7890'
  },
  {
    id: 'tr-006',
    datum: '2025-05-20T15:12:08',
    suma: 22.40,
    mena: 'EUR',
    typ: 'Platba',
    stav: 'Zamietnutá',
    zakaznik: 'Zákazník 6',
    karta: 'Mastercard ****1357'
  },
  {
    id: 'tr-007',
    datum: '2025-05-20T14:05:17',
    suma: 37.80,
    mena: 'EUR',
    typ: 'Platba',
    stav: 'Schválená',
    zakaznik: 'Zákazník 7',
    karta: 'VISA ****2468'
  },
  {
    id: 'tr-008',
    datum: '2025-05-20T11:34:29',
    suma: 19.95,
    mena: 'EUR',
    typ: 'Platba',
    stav: 'Schválená',
    zakaznik: 'Zákazník 8',
    karta: 'Mastercard ****3579'
  }
];

export const TransactionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Filter transactions based on search term and filters
  const filteredTransactions = mockTransakcie.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.zakaznik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.karta.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || transaction.stav === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.typ === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Calculate summary values
  const totalAmount = filteredTransactions
    .filter(t => t.stav === 'Schválená')
    .reduce((sum, transaction) => sum + (transaction.typ === 'Vrátenie' ? -transaction.suma : transaction.suma), 0);
    
  const approvedCount = filteredTransactions.filter(t => t.stav === 'Schválená').length;
  const pendingCount = filteredTransactions.filter(t => t.stav === 'Čaká sa').length;
  const rejectedCount = filteredTransactions.filter(t => t.stav === 'Zamietnutá').length;
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sk-SK') + ' ' + date.toLocaleTimeString('sk-SK');
  };
  
  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Schválená': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Zamietnutá': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'Čaká sa': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'Zrušená': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  // Get transaction type badge color
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'Platba': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Vrátenie': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'Predautorizácia': return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200';
      case 'Zrušenie': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Transakcie</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{filteredTransactions.length}</div>
            <p className="text-muted-foreground">Počet transakcií</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{totalAmount.toFixed(2)} €</div>
            <p className="text-muted-foreground">Celkový objem</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{approvedCount}</div>
              <Badge className="bg-green-100 text-green-800">Schválené</Badge>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="text-lg font-medium">{pendingCount}</div>
              <Badge className="bg-amber-100 text-amber-800">Čaká sa</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{rejectedCount}</div>
              <Badge className="bg-red-100 text-red-800">Zamietnuté</Badge>
            </div>
            <p className="text-muted-foreground">Neúspešné platby</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Zoznam transakcií</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Vyhľadať transakciu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter podľa stavu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všetky stavy</SelectItem>
                  <SelectItem value="Schválená">Schválené</SelectItem>
                  <SelectItem value="Zamietnutá">Zamietnuté</SelectItem>
                  <SelectItem value="Čaká sa">Čaká sa</SelectItem>
                  <SelectItem value="Zrušená">Zrušené</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter podľa typu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Všetky typy</SelectItem>
                  <SelectItem value="Platba">Platby</SelectItem>
                  <SelectItem value="Vrátenie">Vrátenia</SelectItem>
                  <SelectItem value="Predautorizácia">Predautorizácie</SelectItem>
                  <SelectItem value="Zrušenie">Zrušenia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID transakcie</TableHead>
                  <TableHead>Dátum a čas</TableHead>
                  <TableHead>Zákazník</TableHead>
                  <TableHead>Karta</TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead>Suma</TableHead>
                  <TableHead>Stav</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono">{transaction.id}</TableCell>
                      <TableCell>{formatDate(transaction.datum)}</TableCell>
                      <TableCell>{transaction.zakaznik}</TableCell>
                      <TableCell>{transaction.karta}</TableCell>
                      <TableCell>
                        <Badge className={getTypeBadgeClass(transaction.typ)}>
                          {transaction.typ}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.suma.toFixed(2)} {transaction.mena}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(transaction.stav)}>
                          {transaction.stav}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Nenašli sa žiadne transakcie.
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
