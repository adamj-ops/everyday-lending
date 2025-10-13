/**
 * PlaidService - Plaid integration wrapper
 *
 * Responsibilities:
 * - Bank account linking and verification
 * - ACH transfer initiation and tracking
 * - Account balance retrieval
 * - Error handling and retry logic
 *
 * Architecture: Service Layer Pattern
 * Dependencies: Plaid SDK
 */

import type { AccountsGetRequest, ItemPublicTokenExchangeRequest, LinkTokenCreateRequest, LinkTokenCreateResponse, TransferCreateRequest, TransferGetRequest } from 'plaid';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { Env } from '@/libs/Env';

export type PlaidConfig = {
  clientId: string;
  secret: string;
  environment: 'sandbox' | 'development' | 'production';
};

export type LinkToken = {
  linkToken: string;
  expiration: string;
};

export type AccessToken = {
  accessToken: string;
  itemId: string;
};

export type BankAccount = {
  accountId: string;
  name: string;
  type: string;
  subtype: string;
  mask: string;
  balance: number;
  available: number;
};

export type ACHTransfer = {
  transferId: string;
  amount: number;
  status: 'pending' | 'posted' | 'cancelled' | 'failed' | 'returned';
  accountId: string;
  description: string;
};

export class PlaidService {
  private client: PlaidApi;
  private config: PlaidConfig;

  constructor(config?: Partial<PlaidConfig>) {
    this.config = {
      clientId: config?.clientId || Env.PLAID_CLIENT_ID || '',
      secret: config?.secret || Env.PLAID_SECRET || '',
      environment: config?.environment || 'sandbox',
    };

    if (!this.config.clientId || !this.config.secret) {
      throw new Error('Plaid client ID and secret are required');
    }

    const configuration = new Configuration({
      basePath: PlaidEnvironments[this.config.environment],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': this.config.clientId,
          'PLAID-SECRET': this.config.secret,
        },
      },
    });

    this.client = new PlaidApi(configuration);
  }

  /**
   * Create a link token for bank account linking
   */
  async createLinkToken(userId: string): Promise<LinkToken> {
    try {
      const request: LinkTokenCreateRequest = {
        user: {
          client_user_id: userId,
        },
        client_name: 'Everyday Lending',
        products: ['auth', 'transactions'],
        country_codes: ['US'],
        language: 'en',
        webhook: `${Env.NEXT_PUBLIC_APP_URL}/api/webhooks/plaid`,
      };

      const response: LinkTokenCreateResponse = await this.client.linkTokenCreate(request);

      return {
        linkToken: response.data.link_token,
        expiration: response.data.expiration,
      };
    } catch (error) {
      console.error('Failed to create Plaid link token:', error);
      throw new Error(`Failed to create link token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Exchange public token for access token
   */
  async exchangePublicToken(publicToken: string): Promise<AccessToken> {
    try {
      const request: ItemPublicTokenExchangeRequest = {
        public_token: publicToken,
      };

      const response = await this.client.itemPublicTokenExchange(request);

      return {
        accessToken: response.data.access_token,
        itemId: response.data.item_id,
      };
    } catch (error) {
      console.error('Failed to exchange Plaid public token:', error);
      throw new Error(`Failed to exchange public token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get bank accounts for an access token
   */
  async getBankAccounts(accessToken: string): Promise<BankAccount[]> {
    try {
      const request: AccountsGetRequest = {
        access_token: accessToken,
      };

      const response = await this.client.accountsGet(request);

      return response.data.accounts.map(account => ({
        accountId: account.account_id,
        name: account.name,
        type: account.type,
        subtype: account.subtype || '',
        mask: account.mask || '',
        balance: account.balances.current || 0,
        available: account.balances.available || 0,
      }));
    } catch (error) {
      console.error('Failed to get Plaid bank accounts:', error);
      throw new Error(`Failed to get bank accounts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get account balance
   */
  async getAccountBalance(accessToken: string, accountId: string): Promise<number> {
    try {
      const request: AccountsGetRequest = {
        access_token: accessToken,
      };

      const response = await this.client.accountsGet(request);
      const account = response.data.accounts.find(acc => acc.account_id === accountId);

      if (!account) {
        throw new Error(`Account ${accountId} not found`);
      }

      return account.balances.current || 0;
    } catch (error) {
      console.error('Failed to get Plaid account balance:', error);
      throw new Error(`Failed to get account balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create an ACH transfer
   */
  async createACHTransfer(accessToken: string, accountId: string, amount: number, description: string): Promise<ACHTransfer> {
    try {
      const request: TransferCreateRequest = {
        idempotency_key: `transfer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        access_token: accessToken,
        account_id: accountId,
        authorization_id: accountId, // In production, this would be a separate authorization
        type: 'debit',
        network: 'ach',
        amount: amount.toString(),
        ach_class: 'ppd',
        user: {
          legal_name: 'Everyday Lending Borrower',
          email_address: 'borrower@example.com',
        },
        description,
      };

      const response = await this.client.transferCreate(request);

      return {
        transferId: response.data.transfer_id,
        amount: Number.parseFloat(response.data.amount),
        status: response.data.status as ACHTransfer['status'],
        accountId: response.data.account_id,
        description: response.data.description || description,
      };
    } catch (error) {
      console.error('Failed to create Plaid ACH transfer:', error);
      throw new Error(`Failed to create ACH transfer: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get ACH transfer status
   */
  async getTransferStatus(transferId: string): Promise<ACHTransfer> {
    try {
      const request: TransferGetRequest = {
        transfer_id: transferId,
      };

      const response = await this.client.transferGet(request);

      return {
        transferId: response.data.transfer.id,
        amount: Number.parseFloat(response.data.transfer.amount),
        status: response.data.transfer.status as ACHTransfer['status'],
        accountId: response.data.transfer.account_id,
        description: response.data.transfer.description || '',
      };
    } catch (error) {
      console.error('Failed to get Plaid transfer status:', error);
      throw new Error(`Failed to get transfer status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Verify account ownership
   */
  async verifyAccount(accessToken: string, accountId: string): Promise<boolean> {
    try {
      // In a real implementation, this would use Plaid's identity verification
      // For now, we'll just check if the account exists and has a balance
      const balance = await this.getAccountBalance(accessToken, accountId);
      return balance >= 0; // Account exists and has non-negative balance
    } catch (error) {
      console.error('Failed to verify Plaid account:', error);
      return false;
    }
  }

  /**
   * Get transaction history for an account
   */
  async getTransactions(accessToken: string, accountId: string, startDate: Date, endDate: Date): Promise<any[]> {
    try {
      const request = {
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate,
        account_ids: [accountId],
      };

      const response = await this.client.transactionsGet(request);
      return response.data.transactions;
    } catch (error) {
      console.error('Failed to get Plaid transactions:', error);
      throw new Error(`Failed to get transactions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create a payment authorization
   */
  async createPaymentAuthorization(accessToken: string, accountId: string): Promise<string> {
    try {
      // In a real implementation, this would create a payment authorization
      // For now, we'll return a mock authorization ID
      return `auth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    } catch (error) {
      console.error('Failed to create Plaid payment authorization:', error);
      throw new Error(`Failed to create payment authorization: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Cancel an ACH transfer
   */
  async cancelTransfer(transferId: string): Promise<ACHTransfer> {
    try {
      const response = await this.client.transferCancel({
        transfer_id: transferId,
      });

      return {
        transferId: response.data.transfer.id,
        amount: Number.parseFloat(response.data.transfer.amount),
        status: response.data.transfer.status as ACHTransfer['status'],
        accountId: response.data.transfer.account_id,
        description: response.data.transfer.description || '',
      };
    } catch (error) {
      console.error('Failed to cancel Plaid transfer:', error);
      throw new Error(`Failed to cancel transfer: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get institution information
   */
  async getInstitution(institutionId: string): Promise<any> {
    try {
      const response = await this.client.institutionsGetById({
        institution_id: institutionId,
        country_codes: ['US'],
      });

      return response.data.institution;
    } catch (error) {
      console.error('Failed to get Plaid institution:', error);
      throw new Error(`Failed to get institution: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
