
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, BellOff, X, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

const mockNotifications: Record<string, Notification[]> = {
  admin: [
    {
      id: 'n-1',
      title: 'Nový business partner',
      message: 'Martin Novák sa zaregistroval ako nový business partner',
      type: 'info',
      read: false,
      createdAt: '2024-11-28T09:30:00Z',
      actionUrl: '/dashboard/business-partners'
    },
    {
      id: 'n-2',
      title: 'Kritický tiket',
      message: 'Zariadenie offline v TechCorp pobočke',
      type: 'error',
      read: false,
      createdAt: '2024-11-28T08:15:00Z',
      actionUrl: '/dashboard/tickets'
    }
  ],
  business_partner: [
    {
      id: 'n-3',
      title: 'Nový klient',
      message: 'RetailMax a.s. dokončil onboarding proces',
      type: 'success',
      read: false,
      createdAt: '2024-11-28T10:00:00Z',
      actionUrl: '/dashboard/clients'
    },
    {
      id: 'n-4',
      title: 'Mesačný report',
      message: 'Váš mesačný výkonnostný report je pripravený',
      type: 'info',
      read: true,
      createdAt: '2024-11-27T16:00:00Z'
    }
  ],
  client: [
    {
      id: 'n-5',
      title: 'Zariadenie potrebuje údržbu',
      message: 'Terminal 2 v pobočke Centrum potrebuje preventívnu údržbu',
      type: 'warning',
      read: false,
      createdAt: '2024-11-28T07:45:00Z',
      actionUrl: '/dashboard/devices'
    }
  ],
  location: [
    {
      id: 'n-6',
      title: 'Vysoké tržby',
      message: 'Dnes ste prekročili denný cieľ o 15%!',
      type: 'success',
      read: false,
      createdAt: '2024-11-28T14:30:00Z'
    }
  ]
};

export const NotificationCenter: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(
    mockNotifications[user?.role || 'client'] || []
  );
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifikácie</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Označiť všetko
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="h-80">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BellOff className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Žiadne notifikácie</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`mb-2 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {new Date(notification.createdAt).toLocaleString('sk-SK')}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
