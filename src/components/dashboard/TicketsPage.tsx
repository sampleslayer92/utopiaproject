
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, AlertCircle, CheckCircle, Clock, User, FileText, BarChart3 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { demoTickets, getClientName, getAssignedToName, TicketData } from '@/data/demoData';
import { getFilteredData } from '@/utils/roleUtils';
import { SectionHeader } from '@/components/ui/section-header';

export const TicketsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Filter tickets based on user role - properly typed
  const filteredTickets: TicketData[] = getFilteredData(demoTickets, user!) as TicketData[];
  const finalFilteredTickets = filteredTickets.filter(ticket => {
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

  const openTickets = finalFilteredTickets.filter(t => t.status === 'open').length;
  const inProgressTickets = finalFilteredTickets.filter(t => t.status === 'in_progress').length;
  const resolvedToday = finalFilteredTickets.filter(t => {
    const today = new Date().toDateString();
    return t.status === 'resolved' && new Date(t.updatedAt || t.createdAt).toDateString() === today;
  }).length;

  const stats = [
    {
      label: 'Otvorené tikety',
      value: openTickets,
      icon: AlertCircle,
      color: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
    },
    {
      label: 'V riešení',
      value: inProgressTickets,
      icon: Clock,
      color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
    },
    {
      label: 'Vyriešené dnes',
      value: resolvedToday,
      icon: CheckCircle,
      color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
    }
  ];

  const actions = (
    <>
      <Button variant="outline" className="flex items-center space-x-2">
        <FileText className="h-4 w-4" />
        <span>Export</span>
      </Button>
      <Button variant="outline" className="flex items-center space-x-2">
        <BarChart3 className="h-4 w-4" />
        <span>Analýza</span>
      </Button>
      <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
        <Plus className="h-4 w-4 mr-2" />
        Nový tiket
      </Button>
    </>
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={AlertCircle}
        title="Tikety"
        description={user?.role === 'admin' ? 'Spravujte všetky tikety v systéme' : 'Vaše tikety a požiadavky'}
        stats={stats}
        actions={actions}
      />

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Vyhľadať tikety..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
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
              <SelectTrigger className="w-full md:w-48">
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
      <div className="space-y-4">
        {finalFilteredTickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
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

      {finalFilteredTickets.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
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
