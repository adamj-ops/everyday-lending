/**
 * Notifications Hook
 *
 * Manages notification state and operations.
 */

'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NotificationService } from '@/lib/notifications/NotificationService';

const QUERY_KEYS = {
  notifications: ['notifications'] as const,
  unread: ['notifications', 'unread'] as const,
  preferences: ['notifications', 'preferences'] as const,
};

/**
 * Fetch all notifications for current user
 */
export function useNotifications(userId?: string, unreadOnly = false) {
  return useQuery({
    queryKey: unreadOnly ? QUERY_KEYS.unread : QUERY_KEYS.notifications,
    queryFn: () => NotificationService.getNotifications(userId!, unreadOnly),
    enabled: !!userId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

/**
 * Mark notification as read
 */
export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => NotificationService.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.unread });
    },
  });
}

/**
 * Mark all notifications as read
 */
export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => NotificationService.markAllAsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.unread });
    },
  });
}

/**
 * Delete notification
 */
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => NotificationService.deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.unread });
    },
  });
}

/**
 * Get notification preferences
 */
export function useNotificationPreferences(userId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.preferences,
    queryFn: () => NotificationService.getPreferences(userId!),
    enabled: !!userId,
  });
}

/**
 * Update notification preferences
 */
export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, preferences }: { userId: string; preferences: any }) =>
      NotificationService.updatePreferences(userId, preferences),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.preferences });
    },
  });
}

/**
 * Get unread count
 */
export function useUnreadNotificationCount(userId?: string) {
  const { data: notifications = [] } = useNotifications(userId, true);
  return notifications.length;
}
