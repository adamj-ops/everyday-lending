/**
 * Notification Center Component
 *
 * Displays in-app notifications with mark as read and delete actions.
 */

'use client';

import { Bell, Check, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDeleteNotification, useMarkAllNotificationsRead, useMarkNotificationRead, useNotifications } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';

type NotificationCenterProps = {
  userId?: string;
};

export function NotificationCenter({ userId }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: notifications = [], isLoading } = useNotifications(userId);
  const markAsRead = useMarkNotificationRead();
  const markAllAsRead = useMarkAllNotificationsRead();
  const deleteNotification = useDeleteNotification();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead.mutate(notificationId);
  };

  const handleMarkAllAsRead = () => {
    if (userId) {
      markAllAsRead.mutate(userId);
    }
  };

  const handleDelete = (notificationId: string) => {
    deleteNotification.mutate(notificationId);
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute top-12 right-0 z-50 w-96 rounded-lg border bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-xs"
                >
                  <Check className="mr-1 h-3 w-3" />
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                aria-label="Close notifications"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] overflow-y-auto">
            {isLoading
              ? (
                  <div className="p-8 text-center text-sm text-gray-500">
                    Loading notifications...
                  </div>
                )
              : notifications.length === 0
                ? (
                    <div className="p-8 text-center text-sm text-gray-500">
                      No notifications
                    </div>
                  )
                : (
                    <div className="divide-y">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={cn(
                            'group relative p-4 hover:bg-gray-50',
                            !notification.isRead && 'bg-blue-50',
                          )}
                        >
                          <div className="flex items-start gap-3">
                            {/* Type indicator */}
                            <div
                              className={cn(
                                'mt-1 h-2 w-2 flex-shrink-0 rounded-full',
                                notification.type === 'success' && 'bg-green-500',
                                notification.type === 'error' && 'bg-red-500',
                                notification.type === 'warning' && 'bg-yellow-500',
                                notification.type === 'info' && 'bg-blue-500',
                              )}
                            />

                            {/* Content */}
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{notification.title}</p>
                              <p className="mt-1 text-sm text-gray-600">{notification.message}</p>

                              {notification.actionUrl && (
                                <a
                                  href={notification.actionUrl}
                                  className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                  {notification.actionLabel || 'View'}
                                </a>
                              )}

                              <p className="mt-2 text-xs text-gray-400">
                                {formatRelativeTime(notification.createdAt)}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                              {!notification.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="h-8 w-8 p-0"
                                  aria-label="Mark as read"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(notification.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                aria-label="Delete notification"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return 'Just now';
  }
  if (diffMins < 60) {
    return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  }
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }
  if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  return new Date(date).toLocaleDateString();
}
