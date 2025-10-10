import { useCallback, useState } from 'react';

export type ToastType = 'default' | 'success' | 'destructive' | 'warning';

export interface ToastMessage {
  id: string;
  title?: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

let toastCount = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback(
    ({
      title,
      description,
      type = 'default',
      duration = 5000,
    }: {
      title?: string;
      description?: string;
      type?: ToastType;
      duration?: number;
    }) => {
      const id = `toast-${Date.now()}-${toastCount++}`;
      const newToast: ToastMessage = { id, title, description, type, duration };

      setToasts(prev => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
      }

      return id;
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    toast,
    dismiss,
    dismissAll,
  };
}

