
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmDeleteDialog } from '@/components/ui/confirm-delete-dialog';
import { Eye, Edit, Trash2, MoreHorizontal, Download } from 'lucide-react';

interface EntityAction {
  type: 'view' | 'edit' | 'delete' | 'download' | 'custom';
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
}

interface EntityActionsProps {
  actions: EntityAction[];
  entityName?: string;
  entityId?: string;
  compact?: boolean;
}

export const EntityActions: React.FC<EntityActionsProps> = ({
  actions,
  entityName = 'položku',
  entityId,
  compact = false
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteAction, setDeleteAction] = useState<EntityAction | null>(null);

  const handleAction = (action: EntityAction) => {
    if (action.type === 'delete') {
      setDeleteAction(action);
      setShowDeleteDialog(true);
    } else {
      action.onClick();
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteAction) {
      deleteAction.onClick();
      setShowDeleteDialog(false);
      setDeleteAction(null);
    }
  };

  const getActionIcon = (action: EntityAction) => {
    if (action.icon) return action.icon;
    
    switch (action.type) {
      case 'view': return Eye;
      case 'edit': return Edit;
      case 'delete': return Trash2;
      case 'download': return Download;
      default: return undefined;
    }
  };

  if (compact && actions.length <= 3) {
    return (
      <div className="flex items-center gap-1">
        {actions.map((action, index) => {
          const Icon = getActionIcon(action);
          return (
            <Button
              key={index}
              variant={action.variant === 'destructive' ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => handleAction(action)}
              disabled={action.disabled}
              className="h-8 w-8 p-0"
            >
              {Icon && <Icon className="h-4 w-4" />}
            </Button>
          );
        })}
        
        {showDeleteDialog && deleteAction && (
          <ConfirmDeleteDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            onConfirm={handleDeleteConfirm}
            title="Potvrdiť vymazanie"
            description={`Naozaj chcete vymazať túto ${entityName}?`}
            itemName={entityId}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((action, index) => {
            const Icon = getActionIcon(action);
            return (
              <React.Fragment key={index}>
                <DropdownMenuItem
                  onClick={() => handleAction(action)}
                  disabled={action.disabled}
                  className={action.variant === 'destructive' ? 'text-red-600' : ''}
                >
                  {Icon && <Icon className="h-4 w-4 mr-2" />}
                  {action.label}
                </DropdownMenuItem>
                {action.type === 'delete' && index < actions.length - 1 && (
                  <DropdownMenuSeparator />
                )}
              </React.Fragment>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {showDeleteDialog && deleteAction && (
        <ConfirmDeleteDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleDeleteConfirm}
          title="Potvrdiť vymazanie"
          description={`Naozaj chcete vymazať túto ${entityName}?`}
          itemName={entityId}
        />
      )}
    </>
  );
};
