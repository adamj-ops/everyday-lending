/**
 * Inngest Client Configuration
 *
 * Background job processing client
 * Handles scheduled jobs, webhooks, and async processing
 *
 * Architecture: Enhanced Modular Monolith Service Layer
 * Dependencies: inngest
 */

import { Inngest } from 'inngest';

// Initialize Inngest client
export const inngest = new Inngest({
  id: 'everyday-lending',
  name: 'Everyday Lending Platform',
  eventKey: process.env.INNGEST_EVENT_KEY,
  signingKey: process.env.INNGEST_SIGNING_KEY,
});

// Event types for type safety
export type Events = {
  'payment.scheduled': {
    data: {
      paymentId: string;
      scheduledDate: string;
    };
  };
  'payment.retry': {
    data: {
      paymentId: string;
      retryCount: number;
    };
  };
  'stripe.webhook': {
    data: {
      webhookEvent: any;
    };
  };
  'draw.approved': {
    data: {
      drawId: string;
      approvedBy: string;
    };
  };
  'loan.status-changed': {
    data: {
      loanId: string;
      oldStatus: string;
      newStatus: string;
      changedBy: string;
    };
  };
  'notification.send': {
    data: {
      userId: string;
      type: 'email' | 'sms' | 'push';
      template: string;
      data: Record<string, any>;
    };
  };
};

// Helper function to send events
export const sendEvent = async (event: keyof Events, data: Events[keyof Events]['data']) => {
  try {
    await inngest.send({
      name: event,
      data,
    });
  } catch (error) {
    console.error(`Failed to send event ${event}:`, error);
    throw error;
  }
};

// Helper function to send multiple events
export const sendEvents = async (events: Array<{ name: keyof Events; data: Events[keyof Events]['data'] }>) => {
  try {
    await inngest.send(events.map(event => ({
      name: event.name,
      data: event.data,
    })));
  } catch (error) {
    console.error('Failed to send events:', error);
    throw error;
  }
};
