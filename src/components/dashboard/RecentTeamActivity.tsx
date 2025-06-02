
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import { TeamActivity } from '@/types/activity';
import { formatTimeAgo } from '@/services/dashboardDataService';

interface RecentTeamActivityProps {
  activities: TeamActivity[];
}

export const RecentTeamActivity: React.FC<RecentTeamActivityProps> = ({ activities }) => {
  const getActivityColor = (actionType: string) => {
    switch (actionType) {
      case 'contract_signed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'client_added':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'device_updated':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'contract_status':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActionTypeLabel = (actionType: string) => {
    switch (actionType) {
      case 'contract_signed':
        return 'Podpísaná zmluva';
      case 'client_added':
        return 'Nový klient';
      case 'device_updated':
        return 'Aktualizácia zariadenia';
      case 'contract_status':
        return 'Zmena stavu zmluvy';
      default:
        return 'Akcia';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Posledné akcie tímu
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Žiadne aktivity na zobrazenie</p>
            </div>
          ) : (
            activities.map((activity, index) => (
              <div key={activity.id} className="group">
                <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600">
                  {/* Icon and timeline */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-lg group-hover:border-blue-300 transition-colors">
                      {activity.icon}
                    </div>
                    {index < activities.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200 dark:bg-gray-600 mt-2"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.memberName}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getActivityColor(activity.actionType)}`}
                        >
                          {getActionTypeLabel(activity.actionType)}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {activity.description}
                    </p>
                    
                    {/* Additional details */}
                    {activity.details && (
                      <div className="mt-2 text-xs text-gray-500">
                        {activity.details.clientName && (
                          <span className="inline-flex items-center space-x-1">
                            <span>Klient:</span>
                            <span className="font-medium">{activity.details.clientName}</span>
                          </span>
                        )}
                        {activity.details.contractValue && (
                          <span className="ml-3 inline-flex items-center space-x-1">
                            <span>Hodnota:</span>
                            <span className="font-medium">€{activity.details.contractValue.toLocaleString()}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
