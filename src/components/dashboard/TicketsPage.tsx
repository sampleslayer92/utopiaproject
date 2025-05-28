
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Edit, Eye, AlertCircle, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { CreateTicketDialog } from './CreateTicketDialog';

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: 'technical' | 'billing' | 'general' | 'device_issue';
  clientId: string;
  clientName: string;
  businessPartnerId: string;
  locationId?: string;
  locationName?: string;
  deviceId?: string;
  deviceName?: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  resolvedAt?: string;
}

const mockTickets: Ticket[] = [
  {
    id: 'T-001',
    title: 'Zariadenie offline v centre',
    description: 'Platobný terminál 3 je offline od včera večera. Klienti sa sťažujú že nemôžu platiť kartou.',
    priority: 'high',
    status: 'open',
    category: 'device_issue',
    clientId: 'client-1',
    clientName: 'TechCorp s.r.o.',
    businessPartnerId: 'bp-1',
    locationId: 'loc-2',
    locationName: 'Pobočka Centrum',
    deviceId: 'dev-3',
    deviceName: 'Terminal 3 - Expresní pokladna',
    createdAt: '2024-11-28T08:30:00Z',
    updatedAt: '2024-11-28T09:15:00Z',
    assignedTo: 'Technický tím'
  },
  {
    id: 'T-002',
    title: 'Pomalé spracovanie platieb',
    description: 'Všetky terminály v Aupark prevádzke spracovávajú platby veľmi pomaly. Zákazníci čakajú 30+ sekúnd.',
    priority: 'medium',
    status: 'in_progress',
    category: 'technical',
    clientId: 'client-2',
    clientName: 'RetailMax a.s.',
    businessPartnerId: 'bp-1',
    locationId: 'loc-4',
    locationName: 'RetailMax - Aupark',
    createdAt: '2024-11-27T14:20:00Z',
    updatedAt: '2024-11-28T10:00:00Z',
    assignedTo: 'Martin Technický'
  },
  {
    id: 'T-003',
    title: 'Chyba pri aktualizácii firmware',
    description: 'Automatická aktualizácia firmware zlyhala na 3 zariadeniach. Potrebujeme manuálnu aktualizáciu.',
    priority: 'low',
    status: 'resolved',
    category: 'technical',
    clientId: 'client-1',
    clientName: 'TechCorp s.r.o.',
    businessPartnerId: 'bp-1',
    createdAt: '2024-11-25T16:45:00Z',
    updatedAt: '2024-11-27T11:30:00Z',
    resolvedAt: '2024-11-27T11:30:00Z',
    assignedTo: 'Jana Vývojár'
  },
  {
    id: 'T-004',
    title: 'Nesúlad vo fakturácii',
    description: 'Mesačná faktura neodpovedá skutočnému počtu transakcií. Prosím preverenie.',
    priority: 'medium',
    status: 'open',
    category: 'billing',
    clientId: 'client-3',
    clientName: 'CafeChain Ltd.',
    businessPartnerId: 'bp-2',
    createdAt: '2024-11-26T09:15:00Z',
    updatedAt: '2024-11-26T09:15:00Z'
  },
  {
    id: 'T-005',
    title: 'Žiadosť o pridanie nového používateľa',
    description: 'Potrebujeme pridať nového používateľa do systému s právami na správu jednej prevádzky.',
    priority: 'low',
    status: 'closed',
    category: 'general',
    clientId: 'client-2',
    clientName: 'RetailMax a.s.',
    businessPartnerId: 'bp-1',
    createdAt: '2024-11-20T13:10:00Z',
    updatedAt: '2024-11-22T15:45:00Z',
    resolvedAt: '2024-11-22T15:45:00Z',
    assignedTo: 'Admin tím'
  }
];

export const TicketsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState(mockTickets);

  const handleTicketCreated = () => {
    // Refresh tickets list when new ticket is created
    console.log('Ticket created, refreshing list...');
  };

  // Filter tickets based on user role
  const getFilteredTickets = () => {
    let filteredTickets = tickets;
    
    if (user?.role === 'business_partner') {
      filteredTickets = filteredTickets.filter(ticket => ticket.businessPartnerId === user.businessPartnerId);
    } else if (user?.role === 'client') {
      filteredTickets = filteredTickets.filter(ticket => ticket.clientId === user.clientId);
    } else if (user?.role === 'location') {
      filteredTickets = filteredTickets.filter(ticket => ticket.locationId === user.clientId);
    }
    
    // Apply filters
    if (statusFilter !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === statusFilter);
    }
    if (priorityFilter !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.priority === priorityFilter);
    }
    
    return filteredTickets.filter(ticket =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredTickets = getFilteredTickets();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

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
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'resolved':
      case 'closed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'Kritická';
      case 'high':
        return 'Vysoká';
      case 'medium':
        return 'Stredná';
      case 'low':
        return 'Nízka';
      default:
        return 'Neznáma';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Otvorený';
      case 'in_progress':
        return 'Prebieha';
      case 'resolved':
        return 'Vyriešený';
      case 'closed':
        return 'Zatvorený';
      default:
        return 'Neznámy';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'technical':
        return 'Technický';
      case 'billing':
        return 'Fakturácia';
      case 'general':
        return 'Všeobecný';
      case 'device_issue':
        return 'Problém zariadenia';
      default:
        return 'Iný';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tikety
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Správa a sledovanie tiketov technickej podpory
          </p>
        </div>
        <CreateTicketDialog onTicketCreated={handleTicketCreated} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Otvorené</p>
                <p className="text-2xl font-bold">{filteredTickets.filter(t => t.status === 'open').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Prebieha</p>
                <p className="text-2xl font-bold">{filteredTickets.filter(t => t.status === 'in_progress').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vyriešené</p>
                <p className="text-2xl font-bold">{filteredTickets.filter(t => t.status === 'resolved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Celkom</p>
                <p className="text-2xl font-bold">{filteredTickets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Hľadať tikety..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Všetky stavy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky stavy</SelectItem>
                <SelectItem value="open">Otvorené</SelectItem>
                <SelectItem value="in_progress">Prebieha</SelectItem>
                <SelectItem value="resolved">Vyriešené</SelectItem>
                <SelectItem value="closed">Zatvorené</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Všetky priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všetky priority</SelectItem>
                <SelectItem value="critical">Kritická</SelectItem>
                <SelectItem value="high">Vysoká</SelectItem>
                <SelectItem value="medium">Stredná</SelectItem>
                <SelectItem value="low">Nízka</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiket</TableHead>
                <TableHead>Klient</TableHead>
                <TableHead>Kategória</TableHead>
                <TableHead>Priorita</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priradené</TableHead>
                <TableHead>Vytvorené</TableHead>
                <TableHead>Akcie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ticket.title}</div>
                      <div className="text-sm text-gray-500">{ticket.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ticket.clientName}</div>
                      {ticket.locationName && (
                        <div className="text-sm text-gray-500">{ticket.locationName}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryText(ticket.category)}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {getPriorityText(ticket.priority)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(ticket.status)}
                      <Badge className={getStatusColor(ticket.status)}>
                        {getStatusText(ticket.status)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{ticket.assignedTo || 'Nepriradené'}</TableCell>
                  <TableCell>
                    {new Date(ticket.createdAt).toLocaleDateString('sk-SK')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Detail tiketu</DialogTitle>
                          </DialogHeader>
                          {selectedTicket && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-gray-500">ID tiketu</p>
                                  <p>{selectedTicket.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Status</p>
                                  <Badge className={getStatusColor(selectedTicket.status)}>
                                    {getStatusText(selectedTicket.status)}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Priorita</p>
                                  <Badge className={getPriorityColor(selectedTicket.priority)}>
                                    {getPriorityText(selectedTicket.priority)}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Kategória</p>
                                  <p>{getCategoryText(selectedTicket.category)}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Klient</p>
                                  <p>{selectedTicket.clientName}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Prevádzka</p>
                                  <p>{selectedTicket.locationName || 'N/A'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Zariadenie</p>
                                  <p>{selectedTicket.deviceName || 'N/A'}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-500">Priradené</p>
                                  <p>{selectedTicket.assignedTo || 'Nepriradené'}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500 mb-2">Názov</p>
                                <p className="font-medium">{selectedTicket.title}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500 mb-2">Popis</p>
                                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                                  {selectedTicket.description}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-500">Vytvorené</p>
                                  <p>{new Date(selectedTicket.createdAt).toLocaleString('sk-SK')}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Posledná aktualizácia</p>
                                  <p>{new Date(selectedTicket.updatedAt).toLocaleString('sk-SK')}</p>
                                </div>
                                {selectedTicket.resolvedAt && (
                                  <div>
                                    <p className="text-gray-500">Vyriešené</p>
                                    <p>{new Date(selectedTicket.resolvedAt).toLocaleString('sk-SK')}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
