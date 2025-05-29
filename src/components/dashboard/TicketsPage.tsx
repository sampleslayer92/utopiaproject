
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Ticket, AlertCircle, Clock, CheckCircle, Plus, MessageSquare, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { demoTickets, demoLocations } from '@/data/demoData';
import { CreateTicketDialog } from './CreateTicketDialog';

export const TicketsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Filter tickets based on search and filters
  const filteredTickets = demoTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const openTickets = demoTickets.filter(t => t.status === 'open').length;
  const inProgressTickets = demoTickets.filter(t => t.status === 'in_progress').length;
  const resolvedTickets = demoTickets.filter(t => t.status === 'resolved').length;
  const highPriorityTickets = demoTickets.filter(t => t.priority === 'high').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Ticket className="h-4 w-4" />;
    }
  };

  const handleTicketCreated = () => {
    console.log('Ticket created successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tikety
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Správa podporných tiketov a požiadaviek
          </p>
        </div>
        <div className="flex gap-3">
          <CreateTicketDialog onTicketCreated={handleTicketCreated} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Otvorené</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">{openTickets}</p>
                <p className="text-xs text-red-600 dark:text-red-400">Vyžadujú pozornosť</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">V riešení</p>
                <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{inProgressTickets}</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">Aktívne sa riešia</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Vyriešené</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{resolvedTickets}</p>
                <p className="text-xs text-green-600 dark:text-green-400">Tento mesiac</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Vysoká priorita</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{highPriorityTickets}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Kritické tikety</p>
              </div>
              <Ticket className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Hľadať tikety..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 dark:bg-gray-900/80"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky statusy</SelectItem>
                <SelectItem value="open">Otvorené</SelectItem>
                <SelectItem value="in_progress">V riešení</SelectItem>
                <SelectItem value="resolved">Vyriešené</SelectItem>
                <SelectItem value="closed">Zatvorené</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priorita" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky priority</SelectItem>
                <SelectItem value="high">Vysoká</SelectItem>
                <SelectItem value="medium">Stredná</SelectItem>
                <SelectItem value="low">Nízka</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTickets.map((ticket) => {
          const location = demoLocations.find(loc => loc.id === ticket.locationId);
          
          return (
            <Card key={ticket.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-2">{ticket.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(ticket.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(ticket.status)}
                          {ticket.status === 'open' ? 'Otvorený' :
                           ticket.status === 'in_progress' ? 'V riešení' :
                           ticket.status === 'resolved' ? 'Vyriešený' : 'Zatvorený'}
                        </div>
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority === 'high' ? 'Vysoká' :
                         ticket.priority === 'medium' ? 'Stredná' : 'Nízka'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p><strong>ID:</strong> {ticket.id}</p>
                      <p><strong>Typ:</strong> {ticket.type}</p>
                      <p><strong>Prevádzka:</strong> {location?.name}</p>
                      <p><strong>Vytvorené:</strong> {new Date(ticket.createdAt).toLocaleDateString('sk-SK')}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {ticket.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Priradené: {ticket.assignedTo || 'Nepriradené'}
                    </span>
                  </div>
                  {ticket.responseTime && (
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">Odpoveď: {ticket.responseTime}</span>
                    </div>
                  )}
                </div>

                {ticket.lastUpdate && (
                  <div className="text-xs text-gray-500 border-t pt-2">
                    <p><strong>Posledná aktualizácia:</strong> {new Date(ticket.lastUpdate).toLocaleDateString('sk-SK')}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Komentovať
                  </Button>
                  <Button size="sm" className="flex-1">
                    Zobraziť detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTickets.length === 0 && (
        <Card className="p-8 text-center">
          <Ticket className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Žiadne tikety
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' 
              ? 'Neboli nájdené žiadne tikety pre zadané kritériá.' 
              : 'Zatiaľ nemáte žiadne tikety.'}
          </p>
          {!searchTerm && statusFilter === 'all' && priorityFilter === 'all' && 
            <CreateTicketDialog onTicketCreated={handleTicketCreated} />}
        </Card>
      )}
    </div>
  );
};
