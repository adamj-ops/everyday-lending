/**
 * Notification Service
 *
 * Manages in-app notifications and persistence.
 */

export type Notification = {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  isRead: boolean;
  createdAt: Date;
};

export type NotificationPreferences = {
  userId: string;
  emailNotifications: boolean;
  inAppNotifications: boolean;
  loanUpdates: boolean;
  paymentReminders: boolean;
  drawRequests: boolean;
  systemAlerts: boolean;
};

export class NotificationService {
  /**
   * Create a new notification
   */
  static async createNotification(data: {
    userId: string;
    type: Notification['type'];
    title: string;
    message: string;
    actionUrl?: string;
    actionLabel?: string;
  }): Promise<Notification> {
    // TODO: Implement API call to create notification
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      userId: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      actionUrl: data.actionUrl,
      actionLabel: data.actionLabel,
      isRead: false,
      createdAt: new Date(),
    };

    return notification;
  }

  /**
   * Get notifications for a user
   */
  static async getNotifications(_userId: string, unreadOnly = false): Promise<Notification[]> {
    try {
      const params = new URLSearchParams();
      if (unreadOnly) {
        params.append('unread', 'true');
      }

      const url = `/api/notifications?${params.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string): Promise<void> {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  /**
   * Mark all notifications as read
   */
  static async markAllAsRead(userId: string): Promise<void> {
    try {
      const response = await fetch(`/api/notifications/read-all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark all notifications as read');
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }

  /**
   * Delete a notification
   */
  static async deleteNotification(notificationId: string): Promise<void> {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }

  /**
   * Get notification preferences
   */
  static async getPreferences(userId: string): Promise<NotificationPreferences> {
    try {
      const response = await fetch(`/api/notifications/preferences`);

      if (!response.ok) {
        throw new Error('Failed to fetch notification preferences');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching preferences:', error);
      // Return defaults
      return {
        userId,
        emailNotifications: true,
        inAppNotifications: true,
        loanUpdates: true,
        paymentReminders: true,
        drawRequests: true,
        systemAlerts: true,
      };
    }
  }

  /**
   * Update notification preferences
   */
  static async updatePreferences(
    _userId: string,
    preferences: Partial<NotificationPreferences>,
  ): Promise<NotificationPreferences> {
    try {
      const response = await fetch(`/api/notifications/preferences`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  }
}
