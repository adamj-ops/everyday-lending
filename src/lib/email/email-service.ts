/**
 * Email Service
 *
 * Handles email sending using Resend
 * Provides templates for common loan-related communications
 *
 * Architecture: Enhanced Modular Monolith Service Layer
 * Dependencies: resend, react-email
 */

import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export type EmailTemplate = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
};

export type LoanEmailData = {
  borrowerName: string;
  loanAmount: number;
  loanId: string;
  propertyAddress: string;
  lenderName: string;
  nextPaymentDate?: string;
  nextPaymentAmount?: number;
};

export class EmailService {
  private client: Resend;

  constructor() {
    this.client = resend;
  }

  /**
   * Send a generic email
   */
  async sendEmail(template: EmailTemplate): Promise<boolean> {
    try {
      const { data, error } = await this.client.emails.send({
        from: template.from || 'Everyday Lending <noreply@everydaylending.com>',
        to: template.to,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });

      if (error) {
        console.error('Email send error:', error);
        return false;
      }

      console.log('Email sent successfully:', data?.id);
      return true;
    } catch (error) {
      console.error('Email service error:', error);
      return false;
    }
  }

  /**
   * Send loan approval email
   */
  async sendLoanApprovalEmail(data: LoanEmailData): Promise<boolean> {
    const template: EmailTemplate = {
      to: data.borrowerName, // TODO: Get actual email from borrower record
      subject: `Loan Approved - ${data.loanId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Congratulations! Your loan has been approved.</h2>
          <p>Dear ${data.borrowerName},</p>
          <p>We're pleased to inform you that your loan application has been approved.</p>
          <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0;">
            <h3>Loan Details</h3>
            <p><strong>Loan ID:</strong> ${data.loanId}</p>
            <p><strong>Amount:</strong> $${data.loanAmount.toLocaleString()}</p>
            <p><strong>Property:</strong> ${data.propertyAddress}</p>
            <p><strong>Lender:</strong> ${data.lenderName}</p>
          </div>
          <p>Next steps will be communicated by your loan officer.</p>
          <p>Thank you for choosing Everyday Lending.</p>
        </div>
      `,
    };

    return await this.sendEmail(template);
  }

  /**
   * Send payment reminder email
   */
  async sendPaymentReminderEmail(data: LoanEmailData): Promise<boolean> {
    if (!data.nextPaymentDate || !data.nextPaymentAmount) {
      throw new Error('Payment date and amount required for reminder');
    }

    const template: EmailTemplate = {
      to: data.borrowerName, // TODO: Get actual email from borrower record
      subject: `Payment Reminder - ${data.loanId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Payment Reminder</h2>
          <p>Dear ${data.borrowerName},</p>
          <p>This is a friendly reminder that your payment is due soon.</p>
          <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0;">
            <h3>Payment Details</h3>
            <p><strong>Loan ID:</strong> ${data.loanId}</p>
            <p><strong>Amount Due:</strong> $${data.nextPaymentAmount.toLocaleString()}</p>
            <p><strong>Due Date:</strong> ${new Date(data.nextPaymentDate).toLocaleDateString()}</p>
          </div>
          <p>Please ensure your payment is processed before the due date to avoid late fees.</p>
          <p>Thank you for your prompt payment.</p>
        </div>
      `,
    };

    return await this.sendEmail(template);
  }

  /**
   * Send draw approval email
   */
  async sendDrawApprovalEmail(data: LoanEmailData & { drawAmount: number }): Promise<boolean> {
    const template: EmailTemplate = {
      to: data.borrowerName, // TODO: Get actual email from borrower record
      subject: `Draw Request Approved - ${data.loanId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Draw Request Approved</h2>
          <p>Dear ${data.borrowerName},</p>
          <p>Your draw request has been approved and will be processed shortly.</p>
          <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0;">
            <h3>Draw Details</h3>
            <p><strong>Loan ID:</strong> ${data.loanId}</p>
            <p><strong>Draw Amount:</strong> $${data.drawAmount.toLocaleString()}</p>
            <p><strong>Property:</strong> ${data.propertyAddress}</p>
          </div>
          <p>Funds will be transferred to your account within 1-2 business days.</p>
          <p>Thank you for using Everyday Lending.</p>
        </div>
      `,
    };

    return await this.sendEmail(template);
  }

  /**
   * Send loan status update email
   */
  async sendLoanStatusUpdateEmail(data: LoanEmailData & { status: string }): Promise<boolean> {
    const template: EmailTemplate = {
      to: data.borrowerName, // TODO: Get actual email from borrower record
      subject: `Loan Status Update - ${data.loanId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Loan Status Update</h2>
          <p>Dear ${data.borrowerName},</p>
          <p>Your loan status has been updated.</p>
          <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0;">
            <h3>Loan Details</h3>
            <p><strong>Loan ID:</strong> ${data.loanId}</p>
            <p><strong>New Status:</strong> ${data.status}</p>
            <p><strong>Property:</strong> ${data.propertyAddress}</p>
          </div>
          <p>If you have any questions, please contact your loan officer.</p>
          <p>Thank you for choosing Everyday Lending.</p>
        </div>
      `,
    };

    return await this.sendEmail(template);
  }
}

// Export singleton instance
export const emailService = new EmailService();
