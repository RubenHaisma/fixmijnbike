import { PrismaClient, NotificationType, User } from '@prisma/client';
import { sendNotificationEmail } from './email';

const prisma = new PrismaClient();

export interface NotificationData {
  userId: string;
  senderId?: string;
  type: NotificationType;
  title: string;
  message: string;
  linkUrl?: string;
}

export async function createNotification(data: NotificationData) {
  try {
    // Create notification in database
    const notification = await prisma.notification.create({
      data: {
        userId: data.userId,
        senderId: data.senderId,
        type: data.type,
        title: data.title,
        message: data.message,
        linkUrl: data.linkUrl,
      },
      include: {
        user: true,
      },
    });

    // Send email notification if user has email notifications enabled
    if (notification.user.emailNotifications) {
      const userEmail = notification.user.email;
      if (userEmail) {
        await sendNotificationEmail(
          userEmail,
          data.title,
          data.message,
          data.linkUrl
        );
      }
    }

    // Here you would also implement push notifications if needed

    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}

export async function markNotificationAsRead(notificationId: string) {
  return prisma.notification.update({
    where: { id: notificationId },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });
}

export async function markAllNotificationsAsRead(userId: string) {
  return prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });
}

export async function getUnreadNotificationsCount(userId: string) {
  return prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });
}

export async function getUserNotifications(userId: string, limit = 20, offset = 0) {
  return prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    take: limit,
    skip: offset,
  });
}

export async function deleteNotification(notificationId: string) {
  return prisma.notification.delete({
    where: { id: notificationId },
  });
}

export async function notifyRepairRequest(repair: any) {
  // Notify available fixers about a new repair request
  const availableFixers = await prisma.user.findMany({
    where: {
      role: 'FIXER',
      isAvailable: true,
      skills: {
        hasSome: [repair.issueType],
      },
    },
  });

  for (const fixer of availableFixers) {
    await createNotification({
      userId: fixer.id,
      type: NotificationType.REPAIR_REQUEST,
      title: 'Nieuwe reparatie aanvraag',
      message: `Er is een nieuwe reparatie aanvraag voor ${repair.issueType} in jouw buurt.`,
      linkUrl: `/repair/${repair.id}`,
    });
  }
}

export async function notifyRepairMatched(repair: any) {
  // Notify rider that a fixer has been matched
  await createNotification({
    userId: repair.riderId,
    senderId: repair.fixerId,
    type: NotificationType.REPAIR_MATCHED,
    title: 'Fixer gevonden!',
    message: `We hebben een fixer gevonden voor je reparatie. Bekijk de details en boek nu.`,
    linkUrl: `/repair/${repair.id}`,
  });

  // Notify fixer that they've been matched with a repair
  if (repair.fixerId) {
    await createNotification({
      userId: repair.fixerId,
      senderId: repair.riderId,
      type: NotificationType.REPAIR_MATCHED,
      title: 'Nieuwe reparatie match',
      message: `Je bent gematcht met een nieuwe reparatie. Bekijk de details en accepteer of weiger.`,
      linkUrl: `/repair/${repair.id}`,
    });
  }
}

export async function notifyRepairAccepted(repair: any) {
  // Notify rider that the fixer accepted the repair
  await createNotification({
    userId: repair.riderId,
    senderId: repair.fixerId,
    type: NotificationType.REPAIR_ACCEPTED,
    title: 'Reparatie geaccepteerd',
    message: `De fixer heeft je reparatie geaccepteerd. Je kunt nu boeken.`,
    linkUrl: `/repair/${repair.id}/book`,
  });
}

export async function notifyRepairDeclined(repair: any) {
  // Notify rider that the fixer declined the repair
  await createNotification({
    userId: repair.riderId,
    senderId: repair.fixerId,
    type: NotificationType.REPAIR_DECLINED,
    title: 'Reparatie geweigerd',
    message: `De fixer heeft je reparatie geweigerd. We zoeken een nieuwe fixer voor je.`,
    linkUrl: `/repair/${repair.id}`,
  });
}

export async function notifyRepairBooked(repair: any) {
  // Notify fixer that the repair has been booked
  if (repair.fixerId) {
    await createNotification({
      userId: repair.fixerId,
      senderId: repair.riderId,
      type: NotificationType.REPAIR_BOOKED,
      title: 'Reparatie geboekt',
      message: `Een reparatie is geboekt. Bekijk de details en contactgegevens.`,
      linkUrl: `/repair/${repair.id}`,
    });
  }
}

export async function notifyRepairCompleted(repair: any) {
  // Notify rider that the repair has been completed
  await createNotification({
    userId: repair.riderId,
    senderId: repair.fixerId,
    type: NotificationType.REPAIR_COMPLETED,
    title: 'Reparatie voltooid',
    message: `Je reparatie is voltooid. Bedankt voor het gebruik van FixMijnBike!`,
    linkUrl: `/repair/${repair.id}`,
  });
}

export async function notifyRepairCancelled(repair: any, cancelledBy: User) {
  // Notify the other party that the repair has been cancelled
  const recipientId = cancelledBy.id === repair.riderId ? repair.fixerId : repair.riderId;
  
  if (recipientId) {
    await createNotification({
      userId: recipientId,
      senderId: cancelledBy.id,
      type: NotificationType.REPAIR_CANCELLED,
      title: 'Reparatie geannuleerd',
      message: `De reparatie is geannuleerd door ${cancelledBy.name || 'de andere partij'}.`,
      linkUrl: `/repair/${repair.id}`,
    });
  }
}