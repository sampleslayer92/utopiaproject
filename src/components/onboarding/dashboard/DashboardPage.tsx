
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Check, 
  Clock, 
  MessageCircle, 
  Home, 
  ShoppingBag, 
  Building2, 
  FileText, 
  HelpCircle,
  Monitor,
  CreditCard,
  Smartphone,
  Battery,
  BarChart3,
  Users,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { TaskCard } from './TaskCard';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Demo data for the dashboard
const demoTransactions = [
  { date: '2025-01-01', amount: 1250 },
  { date: '2025-02-01', amount: 1800 },
  { date: '2025-03-01', amount: 2200 },
  { date: '2025-04-01', amount: 1950 },
  { date: '2025-05-01', amount: 2800 }
];

const demoDevices = [
  { id: 1, name: 'Terminal A920', status: 'online', lastActivity: '5 min ago', batteryLevel: 85 },
  { id: 2, name: 'Terminal S800', status: 'online', lastActivity: '2 hours ago', batteryLevel: 43 },
  { id: 3, name: 'Terminal PAX A80', status: 'offline', lastActivity: '1 day ago', batteryLevel: 12 }
];

const demoNotifications = [
  { id: 1, title: 'Upozornenie na nízku batériu', message: 'Terminal PAX A80 má takmer vybitú batériu', date: '2025-05-21', read: false },
  { id: 2, title: 'Nová transakcia', message: 'Nová transakcia v hodnote €79.99 bola zaznamenaná', date: '2025-05-20', read: true },
  { id: 3, title: 'Aktualizácia softvéru', message: 'Dostupná aktualizácia pre terminál A920', date: '2025-05-18', read: true }
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { data, isStepComplete } = useOnboarding();
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Get registration data from localStorage
  const registrationData = localStorage.getItem('utopiaRegistration') 
    ? JSON.parse(localStorage.getItem('utopiaRegistration')!) 
    : { fullName: 'Používateľ', selectedProducts: [] };
  
  // Mapping of tasks to steps in the wizard
  const tasks = [
    { id: 'company', title: t('company.info'), completed: isStepComplete('company'), timeEstimate: 2, step: 'company' },
    { id: 'business', title: t('business.locations'), completed: isStepComplete('business'), timeEstimate: 3, step: 'business' },
    { id: 'products', title: t('products.select'), completed: isStepComplete('products'), timeEstimate: 4, step: 'products' },
    { id: 'persons', title: t('personal.info'), completed: isStepComplete('persons'), timeEstimate: 3, step: 'persons' },
    { id: 'beneficialOwners', title: t('beneficial.owners'), completed: isStepComplete('beneficialOwners'), timeEstimate: 2, step: 'beneficialOwners' },
    { id: 'billing', title: t('billing'), completed: isStepComplete('billing'), timeEstimate: 2, step: 'billing' },
  ];
  
  const handleTaskClick = (step: string) => {
    navigate(`/onboarding/${step}`);
  };

  const handleMenuClick = (item: string) => {
    setActiveMenuItem(item);
  };
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const firstName = data.company.nazovSpolocnosti 
    ? data.company.nazovSpolocnosti 
    : (registrationData.fullName || '').split(' ')[0] || t('user');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'sk' ? 'sk-SK' : 'en-US', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat(language === 'sk' ? 'sk-SK' : 'en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(new Date(dateString));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900">
      <div className="h-1 bg-gray-200">
        <div 
          className="h-1 bg-emerald-600" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex">
        {/* Left sidebar */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-screen p-4 flex flex-col shadow-md"
        >
          <div className="mb-6 flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600/50 flex items-center justify-center mr-3">
              <span className="text-2xl font-bold text-white">U</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Utopia</h2>
              <p className="text-xs text-gray-500 dark:text-blue-300">Merchant Portal</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-medium ${
                activeMenuItem === 'dashboard' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-white border-l-2 border-blue-500'
                  : 'text-gray-500 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => handleMenuClick('dashboard')}
            >
              <Home className="mr-2 h-4 w-4" />
              {t('dashboard')}
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-medium ${
                activeMenuItem === 'transactions' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-white border-l-2 border-blue-500'
                  : 'text-gray-500 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => handleMenuClick('transactions')}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              {t('transactions')}
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-medium ${
                activeMenuItem === 'devices' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-white border-l-2 border-blue-500'
                  : 'text-gray-500 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => handleMenuClick('devices')}
            >
              <Building2 className="mr-2 h-4 w-4" />
              {t('devices')}
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-medium ${
                activeMenuItem === 'customers' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-white border-l-2 border-blue-500'
                  : 'text-gray-500 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => handleMenuClick('customers')}
            >
              <Users className="mr-2 h-4 w-4" />
              {t('customers')}
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-medium ${
                activeMenuItem === 'reports' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-white border-l-2 border-blue-500'
                  : 'text-gray-500 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => handleMenuClick('reports')}
            >
              <FileText className="mr-2 h-4 w-4" />
              {t('reports')}
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-medium ${
                activeMenuItem === 'settings' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-white border-l-2 border-blue-500'
                  : 'text-gray-500 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => handleMenuClick('settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              {t('settings')}
            </Button>
            
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-medium ${
                activeMenuItem === 'help' 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-white border-l-2 border-blue-500'
                  : 'text-gray-500 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => handleMenuClick('help')}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              {t('help')}
            </Button>
          </nav>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-400 dark:text-slate-400">© 2025 Utopia</div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Main content */}
        <div className="flex-1 p-6 text-gray-900 dark:text-white overflow-auto h-screen">
          <div className="flex justify-between items-center mb-6">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold"
            >
              {t('hello')}, <span className="text-emerald-600 dark:text-emerald-400">{firstName}</span>!
            </motion.h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 z-50">
                    <div className="p-3 border-b border-gray-200 dark:border-slate-700">
                      <h3 className="font-medium">{t('notifications')}</h3>
                    </div>
                    <div className="max-h-80 overflow-auto">
                      {demoNotifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-3 border-b border-gray-200 dark:border-slate-700 ${
                            notification.read ? '' : 'bg-blue-50 dark:bg-blue-900/20'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                              {formatDate(notification.date)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 text-center">
                      <Button variant="link" size="sm">
                        {t('view.all.notifications')}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Dashboard content */}
          {completedTasks < totalTasks && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10 text-center py-10"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-blue-600/30 rounded-xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                  <span className="text-4xl font-bold text-white">U</span>
                </div>
                
                <h2 className="text-3xl font-bold mb-2">{t('activate.account')}</h2>
                <p className="text-gray-600 dark:text-blue-300 mb-6">{t('activate.subtitle')}</p>
                
                <div className="flex justify-center items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-700 dark:text-white">{totalTasks - completedTasks}</span>
                  </div>
                  <span className="text-gray-600 dark:text-blue-200">{t('tasks.remaining')}</span>
                </div>
                
                <Button
                  onClick={() => navigate('/onboarding/company')}
                  className="rounded-full py-6 px-8 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 font-medium shadow-lg border border-white/10 hover:shadow-emerald-500/20"
                >
                  {t('continue.onboarding')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transaction chart */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium mb-4">{t('monthly.transactions')}</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={demoTransactions}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={date => formatDate(date).split(' ')[0]}
                          stroke="#9ca3af" 
                        />
                        <YAxis stroke="#9ca3af" tickFormatter={value => `€${value}`} />
                        <Tooltip 
                          formatter={(value: any) => formatCurrency(value)} 
                          labelFormatter={value => formatDate(value.toString())} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#10b981" 
                          fillOpacity={1} 
                          fill="url(#colorAmount)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Devices status */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium mb-4">{t('devices.status')}</h2>
                  <div className="space-y-4">
                    {demoDevices.map(device => (
                      <div key={device.id} className="p-3 border rounded-lg bg-gray-50 dark:bg-slate-900/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              device.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className="font-medium">{device.name}</span>
                          </div>
                          <span className={`text-xs ${
                            device.batteryLevel > 20 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {device.batteryLevel}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {t('last.active')}: {device.lastActivity}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700/50">
                    <h3 className="font-medium mb-3">{t('need.help')}</h3>
                    <Button variant="outline" className="w-full rounded-lg">
                      {t('contact.support')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Tasks list */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6"
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-emerald-500" />
                  {t('remaining.tasks')}
                </h2>
                
                <div className="space-y-2">
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    >
                      <TaskCard
                        title={task.title}
                        completed={task.completed}
                        timeEstimate={task.timeEstimate}
                        onClick={() => handleTaskClick(task.step)}
                      />
                    </motion.div>
                  ))}
                </div>
                
                {completedTasks === totalTasks && (
                  <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800/50 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-800/50 flex items-center justify-center mr-3">
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-emerald-800 dark:text-emerald-300">
                        {t('onboarding.complete')}
                      </p>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-400/70">
                        {t('onboarding.complete.subtitle')}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      
      {/* Floating chat bubble */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6"
      >
        <Button 
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-lg flex items-center justify-center hover-scale"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};
