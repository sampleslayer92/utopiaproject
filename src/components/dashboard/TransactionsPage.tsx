import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { demoTransactions, demoLocations, demoClients, demoDevices, type DemoTransaction } from '@/data/demoData';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  CreditCard,
  Smartphone,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { sk, enUS } from 'date-fns/locale';

export const TransactionsPage: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');

  // Filter transactions based on user role
  const getFilteredTransactions = (): DemoTransaction[] => {
    let transactions = demoTransactions;

    // Admin (ISO Organizácia) sees all transactions
    // Client sees only their own transactions
    if (user?.role === 'client') {
      transactions = transactions.filter(tx => tx.clientId === user.id);
    }
    // Admin sees all transactions (no filtering needed)

    // Apply filters
    if (searchTerm) {
      transactions = transactions.filter(tx => 
        tx.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.amount.toString().includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      transactions = transactions.filter(tx => tx.status === statusFilter);
    }

    if (methodFilter !== 'all') {
      transactions = transactions.filter(tx => tx.paymentMethod === methodFilter);
    }

    return transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'refunded': return <RefreshCw className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = status === 'completed' ? 'default' : 
                   status === 'pending' ? 'secondary' : 
                   status === 'failed' ? 'destructive' : 'outline';
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        {getStatusIcon(status)}
        {t(`transaction.status.${status}`)}
      </Badge>
    );
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <CreditCard className="h-4 w-4" />;
      case 'contactless': return <Smartphone className="h-4 w-4" />;
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      default: return <CreditCard className="h-4 w-4" />;
    }
  };

  const getLocationName = (locationId: string) => {
    const location = demoLocations.find(loc => loc.id === locationId);
    return location?.name || 'Neznáma lokácia';
  };

  const getDeviceName = (deviceId: string) => {
    const device = demoDevices.find(dev => dev.id === deviceId);
    return device?.name || 'Neznáme zariadenie';
  };

  const filteredTransactions = getFilteredTransactions();

  const totalAmount = filteredTransactions
    .filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalFees = filteredTransactions
    .filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.fee, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('transactions')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('transactions.manage.description')}
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          {t('export')}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('total.transactions')}</CardDescription>
            <CardTitle className="text-2xl">
              {filteredTransactions.length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('total.amount')}</CardDescription>
            <CardTitle className="text-2xl text-green-600">
              €{totalAmount.toFixed(2)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('total.fees')}</CardDescription>
            <CardTitle className="text-2xl text-blue-600">
              €{totalFees.toFixed(2)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('success.rate')}</CardDescription>
            <CardTitle className="text-2xl text-emerald-600">
              {filteredTransactions.length > 0 
                ? ((filteredTransactions.filter(tx => tx.status === 'completed').length / filteredTransactions.length) * 100).toFixed(1)
                : 0}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {t('filters')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t('search.transactions')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t('filter.by.status')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all.statuses')}</SelectItem>
                <SelectItem value="completed">{t('transaction.status.completed')}</SelectItem>
                <SelectItem value="pending">{t('transaction.status.pending')}</SelectItem>
                <SelectItem value="failed">{t('transaction.status.failed')}</SelectItem>
                <SelectItem value="refunded">{t('transaction.status.refunded')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder={t('filter.by.method')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all.methods')}</SelectItem>
                <SelectItem value="card">{t('payment.method.card')}</SelectItem>
                <SelectItem value="contactless">{t('payment.method.contactless')}</SelectItem>
                <SelectItem value="mobile">{t('payment.method.mobile')}</SelectItem>
                <SelectItem value="cash">{t('payment.method.cash')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                {t('no.transactions.found')}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getPaymentMethodIcon(transaction.paymentMethod)}
                        <span className="font-semibold text-lg">
                          €{transaction.amount.toFixed(2)}
                        </span>
                        <span className="text-gray-500">
                          {transaction.currency}
                        </span>
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(transaction.timestamp), 'dd.MM.yyyy HH:mm', {
                          locale: language === 'sk' ? sk : enUS
                        })}
                      </div>
                      <div>
                        <strong>{t('reference')}:</strong> {transaction.reference}
                      </div>
                      <div>
                        <strong>{t('device')}:</strong> {getDeviceName(transaction.deviceId)}
                      </div>
                      <div>
                        <strong>{t('location')}:</strong> {getLocationName(transaction.locationId)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-600 dark:text-gray-400">
                        <strong>{t('payment.method')}:</strong> {t(`payment.method.${transaction.paymentMethod}`)}
                      </div>
                      {transaction.status === 'completed' && (
                        <div className="text-gray-600 dark:text-gray-400">
                          <strong>{t('fee')}:</strong> €{transaction.fee.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
