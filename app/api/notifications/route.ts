import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { 
  getUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  getUnreadNotificationsCount
} from "@/lib/notifications";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");
    const unreadOnly = searchParams.get("unreadOnly") === "true";
    const countOnly = searchParams.get("countOnly") === "true";
    
    if (countOnly) {
      const count = await getUnreadNotificationsCount(session.user.id);
      return NextResponse.json({ count });
    }
    
    const notifications = await getUserNotifications(
      session.user.id,
      limit,
      offset
    );
    
    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het ophalen van de notificaties" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { notificationId, markAllRead } = body;
    
    if (markAllRead) {
      await markAllNotificationsAsRead(session.user.id);
      return NextResponse.json({ success: true });
    }
    
    if (!notificationId) {
      return NextResponse.json(
        { error: "Notificatie ID is vereist" },
        { status: 400 }
      );
    }
    
    // Check if notification belongs to user
    const notification = await prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });
    
    if (!notification) {
      return NextResponse.json(
        { error: "Notificatie niet gevonden" },
        { status: 404 }
      );
    }
    
    if (notification.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Niet geautoriseerd om deze notificatie te markeren" },
        { status: 403 }
      );
    }
    
    const updatedNotification = await markNotificationAsRead(notificationId);
    
    return NextResponse.json(updatedNotification);
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het bijwerken van de notificatie" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Niet geautoriseerd" },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const notificationId = searchParams.get("id");
    
    if (!notificationId) {
      return NextResponse.json(
        { error: "Notificatie ID is vereist" },
        { status: 400 }
      );
    }
    
    // Check if notification belongs to user
    const notification = await prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });
    
    if (!notification) {
      return NextResponse.json(
        { error: "Notificatie niet gevonden" },
        { status: 404 }
      );
    }
    
    if (notification.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Niet geautoriseerd om deze notificatie te verwijderen" },
        { status: 403 }
      );
    }
    
    await prisma.notification.delete({
      where: {
        id: notificationId,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verwijderen van de notificatie" },
      { status: 500 }
    );
  }
}