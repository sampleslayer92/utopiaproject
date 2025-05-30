import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter, Clock, AlertCircle, CheckCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockTickets, getClientName, getAssignedToName } from '@/data/demoData';
import { getFilteredData } from '@/utils/roleUtils';
import { designSystem } from '@/styles/design-system';

export const TicketsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Filter tickets based on user role
  const filteredTickets = getFilteredData(mockTickets, user!).filter(ticket => {
    const clientName = getClientName(ticket.clientId);
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'urgent': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getTicketStats = () => {
    const stats = {
      total: filteredTickets.length,
      open: filteredTickets.filter(t => t.status === 'open').length,
      inProgress: filteredTickets.filter(t => t.status === 'in_progress').length,
      resolved: filteredTickets.filter(t => t.status === 'resolved').length
    };
    return stats;
  };

  const stats = getTicketStats();

  return (
    <div className={`${designSystem.spacing.sectionSpacing} ${designSystem.gradients.background} min-h-screen`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tikety</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.role === 'admin' && 'Spravujte všetky tikety v systéme'}
            {user?.role === 'business_partner' && 'Spravujte tikety vašich klientov'}
            {user?.role === 'client' && 'Vaše tikety a požiadavky'}
          </p>
        </div>
        
        <Button className={`${designSystem.gradients.primary} ${designSystem.gradients.primaryHover} text-white ${designSystem.shadows.button} ${designSystem.transitions.default}`}>
          <Plus className={`${designSystem.spacing.iconSize} mr-2`} />
          Nový tiket
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className={`${designSystem.borderRadius.card} ${designSystem.shadows.card} ${designSystem.gradients.card}`}>
          <CardContent className={designSystem.spacing.cardPadding}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className={`p-3 ${designSystem.borderRadius.button} bg-blue-100 dark:bg-blue-900/20`}>
                <Filter className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${designSystem.borderRadius.card} ${designSystem.shadows.card} ${designSystem.gradients.card}`}>
          <CardContent className={designSystem.spacing.cardPadding}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Otvorené</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.open}</p>
              </div>
              <div className={`p-3 ${designSystem.borderRadius.button} bg-red-100 dark:bg-red-900/20`}>
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${designSystem.borderRadius.card} ${designSystem.shadows.card} ${designSystem.gradients.card}`}>
          <CardContent className={designSystem.spacing.cardPadding}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">V riešení</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.inProgress}</p>
              </div>
              <div className={`p-3 ${designSystem.borderRadius.button} bg-yellow-100 dark:bg-yellow-900/20`}>
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${designSystem.borderRadius.card} ${designSystem.shadows.card} ${designSystem.gradients.card}`}>
          <CardContent className={designSystem.spacing.cardPadding}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vyriešené</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.resolved}</p>
              </div>
              <div className={`p-3 ${designSystem.borderRadius.button} bg-green-100 dark:bg-green-900/20`}>
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className={`${designSystem.borderRadius.card} ${designSystem.shadows.card} ${designSystem.gradients.card} mb-6`}>
        <CardContent className={designSystem.spacing.cardPadding}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Vyhľadať tikety..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${designSystem.borderRadius.input}`}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className={`w-full md:w-48 ${designSystem.borderRadius.input}`}>
                <SelectValue placeholder="Stav" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky stavy</SelectItem>
                <SelectItem value="open">Otvorené</SelectItem>
                <SelectItem value="in_progress">V riešení</SelectItem>
                <SelectItem value="resolved">Vyriešené</SelectItem>
                <SelectItem value="closed">Zatvorené</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className={`w-full md:w-48 ${designSystem.borderRadius.input}`}>
                <SelectValue placeholder="Priorita" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky priority</SelectItem>
                <SelectItem value="low">Nízka</SelectItem>
                <SelectItem value="medium">Stredná</SelectItem>
                <SelectItem value="high">Vysoká</SelectItem>
                <SelectItem value="urgent">Urgentná</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className={designSystem.spacing.sectionSpacing}>
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className={`${designSystem.borderRadius.card} ${designSystem.shadows.card} ${designSystem.gradients.card} ${designSystem.shadows.hover} ${designSystem.transitions.default} cursor-pointer`}>
            <CardContent className={designSystem.spacing.cardPadding}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {ticket.title}
                    </h3>
                    <Badge className={getStatusColor(ticket.status)}>
                      {getStatusIcon(ticket.status)}
                      <span className="ml-1">
                        {ticket.status === 'open' && 'Otvorené'}
                        {ticket.status === 'in_progress' && 'V riešení'}
                        {ticket.status === 'resolved' && 'Vyriešené'}
                        {ticket.status === 'closed' && 'Zatvorené'}
                      </span>
                    </Badge>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority === 'low' && 'Nízka'}
                      {ticket.priority === 'medium' && 'Stredná'}
                      {ticket.priority === 'high' && 'Vysoká'}
                      {ticket.priority === 'urgent' && 'Urgentná'}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {ticket.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {getClientName(ticket.clientId)}
                    </span>
                    <span>#{ticket.id}</span>
                    <span>Vytvorené: {new Date(ticket.createdAt).toLocaleDateString('sk-SK')}</span>
                    {ticket.assignedTo && (
                      <span>Pridelené: {getAssignedToName(ticket.assignedTo)}</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <Card className={`${designSystem.borderRadius.card} ${designSystem.shadows.card} ${designSystem.gradients.card}`}>
          <CardContent className={`${designSystem.spacing.cardPadding} text-center py-12`}>
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Žiadne tikety
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Momentálne nemáte žiadne tikety ktoré by zodpovedali zadaným kritériám.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
