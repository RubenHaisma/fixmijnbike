"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, CheckCircle, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";

export default function NotificationsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }

    fetchNotifications();
  }, [session, router]);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/notifications");
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notificationId }),
      });
      
      // Update local state
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true } 
          : notification
      ));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ markAllRead: true }),
      });
      
      // Update local state
      setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications?id=${notificationId}`, {
        method: "DELETE",
      });
      
      // Update local state
      setNotifications(notifications.filter(notification => notification.id !== notificationId));
    } catch (error) {
      console.error("Error deleting notification:", error);
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

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notificaties</h1>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Alles als gelezen markeren
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            Alle
            <Badge variant="outline" className="ml-2 bg-gray-100">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread">
            Ongelezen
            <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800">
              {unreadCount}
            </Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-60" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-center">
                  Je hebt nog geen notificaties
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className={!notification.isRead ? "border-blue-200 bg-blue-50" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{getNotificationIcon(notification.type)}</span>
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <Badge className="bg-blue-500 text-white">Nieuw</Badge>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      {formatDistanceToNow(new Date(notification.createdAt), { 
                        addSuffix: true,
                        locale: nl
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{notification.message}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    {!notification.isRead && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Markeer als gelezen
                      </Button>
                    )}
                    {notification.linkUrl && (
                      <Button 
                        asChild 
                        className="ml-auto"
                        onClick={() => {
                          if (!notification.isRead) {
                            markAsRead(notification.id);
                          }
                        }}
                      >
                        <Link href={notification.linkUrl}>
                          Bekijk details
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="unread">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-60" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                <p className="text-muted-foreground text-center">
                  Je hebt geen ongelezen notificaties
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card key={notification.id} className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{getNotificationIcon(notification.type)}</span>
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500 text-white">Nieuw</Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      {formatDistanceToNow(new Date(notification.createdAt), { 
                        addSuffix: true,
                        locale: nl
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{notification.message}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Markeer als gelezen
                    </Button>
                    {notification.linkUrl && (
                      <Button 
                        asChild 
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Link href={notification.linkUrl}>
                          Bekijk details
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}