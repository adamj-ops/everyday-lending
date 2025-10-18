/**
 * Plaid Webhook Handler
 *
 * POST /api/webhooks/plaid - Handle Plaid webhook events
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * POST /api/webhooks/plaid
 * Handle Plaid webhook events
 */
export async function POST(request: NextRequest) {
  try {
    // Get the webhook body
    const body = await request.json();

    // Validate webhook structure
    if (!body.webhook_type || !body.webhook_code) {
      console.error('Invalid Plaid webhook structure');
      return NextResponse.json(
        { error: 'Invalid webhook structure' },
        { status: 400 },
      );
    }

    const { webhook_type, webhook_code, item_id, account_id, transfer_id } = body;

    console.log(`Received Plaid webhook: ${webhook_type}.${webhook_code}`);

    // Handle different webhook types
    switch (webhook_type) {
      case 'TRANSFER':
        await handleTransferWebhook(webhook_code, transfer_id, body);
        break;

      case 'ITEM':
        await handleItemWebhook(webhook_code, item_id, body);
        break;

      case 'ACCOUNTS':
        await handleAccountWebhook(webhook_code, account_id, body);
        break;

      default:
        console.log(`Unhandled Plaid webhook type: ${webhook_type}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
    });
  } catch (error) {
    console.error('Plaid webhook processing failed:', error);

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 },
    );
  }
}

/**
 * Handle transfer-related webhooks
 */
async function handleTransferWebhook(webhookCode: string, transferId: string, _body: any) {
  switch (webhookCode) {
    case 'TRANSFER_STATUS_UPDATED':
      console.log(`Transfer ${transferId} status updated`);
      // TODO: Update transfer status in database
      break;

    case 'TRANSFER_CANCELLED':
      console.log(`Transfer ${transferId} cancelled`);
      // TODO: Handle transfer cancellation
      break;

    case 'TRANSFER_FAILED':
      console.log(`Transfer ${transferId} failed`);
      // TODO: Handle transfer failure
      break;

    default:
      console.log(`Unhandled transfer webhook code: ${webhookCode}`);
  }
}

/**
 * Handle item-related webhooks
 */
async function handleItemWebhook(webhookCode: string, itemId: string, _body: any) {
  switch (webhookCode) {
    case 'ITEM_LOGIN_REQUIRED':
      console.log(`Item ${itemId} requires re-authentication`);
      // TODO: Notify user to re-authenticate
      break;

    case 'ITEM_ERROR':
      console.log(`Item ${itemId} has an error`);
      // TODO: Handle item error
      break;

    default:
      console.log(`Unhandled item webhook code: ${webhookCode}`);
  }
}

/**
 * Handle account-related webhooks
 */
async function handleAccountWebhook(webhookCode: string, accountId: string, _body: any) {
  switch (webhookCode) {
    case 'ACCOUNT_BALANCE_UPDATED':
      console.log(`Account ${accountId} balance updated`);
      // TODO: Update account balance in database
      break;

    default:
      console.log(`Unhandled account webhook code: ${webhookCode}`);
  }
}

// Disable body parsing for webhooks to get raw body
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
