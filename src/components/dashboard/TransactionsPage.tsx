
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle } from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { user } = useAuth();

  // Only clients can access transactions
  if (user?.role !== 'client') {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Nemáte oprávnenie
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Transakcie sú dostupné len pre klientov po prihlásení.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Client transaction interface would be here
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Transakcie
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Prehľad vašich transakcií a platieb
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>História transakcií</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400">
            Transakčný prehľad bude implementovaný pre klientov.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
