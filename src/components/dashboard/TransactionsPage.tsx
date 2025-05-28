
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CreditCard, 
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  type: 'card' | 'cash' | 'contactless' | 'mobile';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  deviceId: string;
  deviceName: string;
  location: string;
  timestamp: string;
  customerRef?: string;
  receiptNumber: string;
  fee: number;
}

export const TransactionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Mock transactions data
  const transactions: Transaction[] = [
    {
      id: 'TXN-001',
      amount: 45.50,
      currency: 'EUR',
      type: 'contactless',
      status: 'completed',
      deviceId: 'DEV-001',
      deviceName: 'Platobný terminál 1',
      location: 'Hlavná prevádzka',
      timestamp: '2024-12-28T14:30:00Z',
      receiptNumber: 'RCP-202412280001',
      fee: 0.65
    },
    {
      id: 'TXN-002',
      amount: 128.90,
      currency: 'EUR',
      type: 'card',
      status: 'completed',
      deviceId: 'DEV-002',
      deviceName: 'Platobný terminál 2',
      location: 'Hlavná prevádzka',
      timestamp: '2024-12-28T14:25:00Z',
      receiptNumber: 'RCP-202412280002',
      fee: 1.85
    },
    {
      id: 'TXN-003',
      amount: 23.75,
      currency: 'EUR',
      type: 'mobile',
      status: 'completed',
      deviceId: 'DEV-001',
      deviceName: 'Platobný terminál 1',
      location: 'Hlavná prevádzka',
      timestamp: '2024-12-28T14:20:00Z',
      receiptNumber: 'RCP-202412280003',
      fee: 0.34
    },
    {
      id: 'TXN-004',
      amount: 89.00,
      currency: 'EUR',
      type: 'card',
      status: 'failed',
      deviceId: 'DEV-003',
      deviceName: 'Platobný terminál 3',
      location: 'Pobočka Centrum',
      timestamp: '2024-12-28T13:45:00Z',
      receiptNumber: 'RCP-202412280004',
      fee: 0.00
    },
    {
      id: 'TXN-005',
      amount: 67.25,
      currency: 'EUR',
      type: 'contactless',
      status: 'refunded',
      deviceId: 'DEV-002',
      deviceName: 'Platobný terminál 2',
      location: 'Hlavná prevádzka',
      timestamp: '2024-12-28T13:30:00Z',
      receiptNumber: 'RCP-202412280005',
      fee: -0.96
    },
    {
      id: 'TXN-006',
      amount: 156.80,
      currency: 'EUR',
      type: 'card',
      status: 'pending',
      deviceId: 'DEV-004',
      deviceName: 'Platobný terminál 4',
      location: 'Pobočka Východ',
      timestamp: '2024-12-28T13:15:00Z',
      receiptNumber: 'RCP-202412280006',
      fee: 2.25
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'card':
      case 'contactless':
      case 'mobile':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'card':
        return <Badge variant="outline">Karta</Badge>;
      case 'contactless':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Bezkontaktne</Badge>;
      case 'mobile':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Mobil</Badge>;
      case 'cash':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Hotovosť</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Dokončené</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Čaká</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Zlyhané</Badge>;
      case 'refunded':
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Vrátené</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalAmount = filteredTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFees = filteredTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.fee, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Celkový obrat</p>
                <p className="text-2xl font-bold">€{totalAmount.toFixed(2)}</p>
                <p className="text-green-100 text-xs flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% oproti včera
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Počet transakcií</p>
                <p className="text-2xl font-bold">{filteredTransactions.length}</p>
                <p className="text-blue-100 text-xs flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.3% oproti včera
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Poplatky</p>
                <p className="text-2xl font-bold">€{totalFees.toFixed(2)}</p>
                <p className="text-purple-100 text-xs flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -2.1% oproti včera
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <CardTitle>Transakcie</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Hľadať transakcie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>Všetky</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('completed')}>Dokončené</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('pending')}>Čakajúce</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('failed')}>Zlyhané</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('refunded')}>Vrátené</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Typ
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setTypeFilter('all')}>Všetky</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('card')}>Karta</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('contactless')}>Bezkontaktne</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('mobile')}>Mobil</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('cash')}>Hotovosť</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white dark:bg-gray-600 rounded-lg">
                    {getTypeIcon(transaction.type)}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {transaction.receiptNumber}
                      </p>
                      {getTypeBadge(transaction.type)}
                      {getStatusBadge(transaction.status)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {transaction.deviceName} • {transaction.location}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(transaction.timestamp).toLocaleString('sk-SK')}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.status === 'refunded' ? 'text-red-600' : 
                    transaction.status === 'completed' ? 'text-green-600' : 
                    'text-gray-600'
                  }`}>
                    {transaction.status === 'refunded' ? '-' : ''}€{transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Poplatok: €{transaction.fee.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Žiadne transakcie nezodpovedajú filtrom.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
