import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { nl } from 'date-fns/locale';
import Link from 'next/link';

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  linkUrl?: string;
  type: string;
  sender?: {
    id: string;
    name: string;
    image: string;
  };
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch unread count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch('/api/notifications?countOnly=true');
        if (response.ok) {
          const data = await response.json();
          setUnreadCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
    
    // Set up polling for unread count
    const interval = setInterval(fetchUnreadCount, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Fetch notifications when popover is opened
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/notifications?limit=10');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId }),
      });
      
      // Update local state
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true } 
          : notification
      ));
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markAllRead: true }),
      });
      
      // Update local state
      setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'REPAIR_REQUEST':
        return '🔧';
      case 'REPAIR_MATCHED':
        return '🔍';
      case 'REPAIR_ACCEPTED':
        return '✅';
      case 'REPAIR_DECLINED':
        return '❌';
      case 'REPAIR_BOOKED':
        return '📅';
      case 'REPAIR_COMPLETED':
        return '🎉';
      case 'REPAIR_CANCELLED':
        return '🚫';
      case 'PAYMENT_RECEIVED':
        return '💰';
      case 'PAYOUT_PROCESSED':
        return '💸';
      default:
        return '📣';
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs min-w-[1.2rem] h-5 flex items-center justify-center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notificaties</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs h-8"
            >
              Alles als gelezen markeren
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-20">
              <span className="text-sm text-muted-foreground">Laden...</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-20 p-4">
              <span className="text-sm text-muted-foreground">Geen notificaties</span>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div key={notification.id} className="relative">
                  <Link 
                    href={notification.linkUrl || '#'} 
                    className={`block p-4 hover:bg-muted transition-colors ${!notification.isRead ? 'bg-blue-50 dark:bg-blue-950' : ''}`}
                    onClick={() => {
                      if (!notification.isRead) {
                        markAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-xl">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(notification.createdAt), { 
                            addSuffix: true,
                            locale: nl
                          })}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                      )}
                    </div>
                  </Link>
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <div className="p-2 border-t text-center">
          <Button variant="ghost" size="sm" asChild className="w-full text-xs">
            <Link href="/notifications">Alle notificaties bekijken</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}