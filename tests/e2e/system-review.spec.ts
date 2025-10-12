import { expect, test } from '@playwright/test';

test.describe('System Review - Full E2E Simulation', () => {
  test.beforeEach(async ({ page }) => {
    // Enable console logging and network monitoring
    page.on('console', msg => console.log(`CONSOLE: ${msg.type()} - ${msg.text()}`));
    page.on('request', request => console.log(`REQUEST: ${request.method()} ${request.url()}`));
    page.on('response', response => console.log(`RESPONSE: ${response.status()} ${response.url()}`));

    // Navigate to dashboard
    await page.goto('http://localhost:3000');
  });

  test('Dashboard Load Performance', async ({ page }) => {
    const startTime = Date.now();

    // Wait for dashboard to load
    await page.waitForSelector('[data-testid="dashboard"]', { timeout: 10000 });

    const loadTime = Date.now() - startTime;
    console.log(`Dashboard load time: ${loadTime}ms`);

    // Check for loading indicators
    const loadingElements = await page.locator('.animate-spin').count();

    expect(loadingElements).toBe(0);

    // Verify dashboard elements are visible
    await expect(page.locator('text=Total Loan Value')).toBeVisible();
    await expect(page.locator('text=Active Loans')).toBeVisible();

    // Performance assertion
    expect(loadTime).toBeLessThan(2000); // Should load in under 2 seconds
  });

  test('Loan Origination Flow', async ({ page }) => {
    const startTime = Date.now();

    // Navigate to loans page
    await page.click('text=Loans');
    await page.waitForLoadState('networkidle');

    // Click create loan button
    await page.click('text=Create Loan');
    await page.waitForSelector('[role="dialog"]');

    // Fill loan form
    await page.fill('input[name="loanAmount"]', '500000');
    await page.fill('input[name="interestRate"]', '8.5');
    await page.fill('input[name="termMonths"]', '360');

    // Select borrower
    await page.click('text=Select Borrower');
    await page.click('text=John Doe'); // Assuming test data exists

    // Select property
    await page.click('text=Select Property');
    await page.click('text=123 Main St'); // Assuming test data exists

    // Submit form
    await page.click('text=Create Loan');

    // Wait for success
    await page.waitForSelector('text=Loan created successfully');

    const totalTime = Date.now() - startTime;
    console.log(`Loan origination time: ${totalTime}ms`);

    // Performance assertion
    expect(totalTime).toBeLessThan(5000); // Should complete in under 5 seconds
  });

  test('Payment Processing Flow', async ({ page }) => {
    const startTime = Date.now();

    // Navigate to loans and select a loan
    await page.click('text=Loans');
    await page.waitForLoadState('networkidle');

    // Click on first loan
    await page.click('tr:first-child');
    await page.waitForSelector('[role="dialog"]');

    // Navigate to payments tab
    await page.click('text=Payments');

    // Click add payment
    await page.click('text=Add Payment');

    // Fill payment form
    await page.fill('input[name="amount"]', '2500');
    await page.selectOption('select[name="paymentType"]', 'principal');

    // Submit payment
    await page.click('text=Process Payment');

    // Wait for success
    await page.waitForSelector('text=Payment processed successfully');

    const totalTime = Date.now() - startTime;
    console.log(`Payment processing time: ${totalTime}ms`);

    // Performance assertion
    expect(totalTime).toBeLessThan(3000); // Should complete in under 3 seconds
  });

  test('Draw Management Flow', async ({ page }) => {
    const startTime = Date.now();

    // Navigate to loans and select a construction loan
    await page.click('text=Loans');
    await page.waitForLoadState('networkidle');

    // Filter for construction loans
    await page.click('text=Filter');
    await page.selectOption('select[name="loanType"]', 'construction');

    // Click on first construction loan
    await page.click('tr:first-child');
    await page.waitForSelector('[role="dialog"]');

    // Navigate to draws tab
    await page.click('text=Draws');

    // Click request draw
    await page.click('text=Request Draw');

    // Fill draw form
    await page.fill('input[name="amount"]', '50000');
    await page.fill('textarea[name="purpose"]', 'Foundation work');
    await page.selectOption('select[name="category"]', 'foundation');

    // Submit draw request
    await page.click('text=Submit Draw Request');

    // Wait for success
    await page.waitForSelector('text=Draw request submitted');

    const totalTime = Date.now() - startTime;
    console.log(`Draw management time: ${totalTime}ms`);

    // Performance assertion
    expect(totalTime).toBeLessThan(4000); // Should complete in under 4 seconds
  });

  test('Portfolio Analytics Flow', async ({ page }) => {
    const startTime = Date.now();

    // Navigate to analytics page
    await page.click('text=Analytics');
    await page.waitForLoadState('networkidle');

    // Wait for analytics to load
    await page.waitForSelector('[data-testid="portfolio-kpis"]');

    // Check for key metrics
    await expect(page.locator('text=Total Funded')).toBeVisible();
    await expect(page.locator('text=Outstanding Balance')).toBeVisible();
    await expect(page.locator('text=Delinquency Rate')).toBeVisible();

    // Test risk analysis
    await page.click('text=Risk Analysis');
    await page.waitForSelector('[data-testid="risk-scores"]');

    // Test geographic concentration
    await page.click('text=Geographic Analysis');
    await page.waitForSelector('[data-testid="geographic-map"]');

    const totalTime = Date.now() - startTime;
    console.log(`Portfolio analytics time: ${totalTime}ms`);

    // Performance assertion
    expect(totalTime).toBeLessThan(3000); // Should complete in under 3 seconds
  });

  test('Full Workflow Integration', async ({ page }) => {
    const startTime = Date.now();

    // Complete full workflow: Origination → Payment → Draw → Analytics
    console.log('Starting full workflow integration test...');

    // 1. Create a loan
    await page.click('text=Loans');
    await page.click('text=Create Loan');
    await page.fill('input[name="loanAmount"]', '750000');
    await page.fill('input[name="interestRate"]', '9.0');
    await page.fill('input[name="termMonths"]', '240');
    await page.click('text=Create Loan');
    await page.waitForSelector('text=Loan created successfully');

    // 2. Process a payment
    await page.click('tr:first-child');
    await page.click('text=Payments');
    await page.click('text=Add Payment');
    await page.fill('input[name="amount"]', '3500');
    await page.click('text=Process Payment');
    await page.waitForSelector('text=Payment processed successfully');

    // 3. Request a draw
    await page.click('text=Draws');
    await page.click('text=Request Draw');
    await page.fill('input[name="amount"]', '75000');
    await page.fill('textarea[name="purpose"]', 'Roof replacement');
    await page.click('text=Submit Draw Request');
    await page.waitForSelector('text=Draw request submitted');

    // 4. View analytics
    await page.click('text=Analytics');
    await page.waitForSelector('[data-testid="portfolio-kpis"]');

    const totalTime = Date.now() - startTime;
    console.log(`Full workflow time: ${totalTime}ms`);

    // Performance assertion
    expect(totalTime).toBeLessThan(15000); // Should complete in under 15 seconds
  });

  test('Performance Metrics Collection', async ({ page }) => {
    // Collect performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        totalTime: navigation.loadEventEnd - navigation.fetchStart,
      };
    });

    console.log('Performance Metrics:', metrics);

    // Assert performance thresholds
    expect(metrics.domContentLoaded).toBeLessThan(1000);
    expect(metrics.loadComplete).toBeLessThan(2000);
    expect(metrics.firstContentfulPaint).toBeLessThan(1500);
    expect(metrics.totalTime).toBeLessThan(3000);
  });

  test('Error Handling and Edge Cases', async ({ page }) => {
    // Test error handling
    await page.route('**/api/loans', (route) => {
      route.fulfill({ status: 500, body: 'Internal Server Error' });
    });

    await page.click('text=Loans');
    await page.waitForSelector('text=Failed to fetch loans');

    // Test network timeout
    await page.route('**/api/properties', (route) => {
      route.fulfill({ status: 408, body: 'Request Timeout' });
    });

    await page.click('text=Properties');
    await page.waitForSelector('text=Request timeout');

    // Test validation errors
    await page.click('text=Create Property');
    await page.click('text=Create Property'); // Submit without filling form
    await page.waitForSelector('text=Please fill in all required fields');
  });

  test('Accessibility Compliance', async ({ page }) => {
    // Check for accessibility issues
    const accessibilityIssues = await page.evaluate(() => {
      const issues = [];

      // Check for missing alt text
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.alt) {
          issues.push(`Missing alt text on image: ${img.src}`);
        }
      });

      // Check for missing labels
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input) => {
        if (!input.labels?.length && !input.getAttribute('aria-label')) {
          issues.push(`Missing label for input: ${input.name || input.type}`);
        }
      });

      // Check for proper heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let lastLevel = 0;
      headings.forEach((heading) => {
        const level = Number.parseInt(heading.tagName[1]);
        if (level > lastLevel + 1) {
          issues.push(`Heading hierarchy issue: ${heading.tagName} after h${lastLevel}`);
        }
        lastLevel = level;
      });

      return issues;
    });

    console.log('Accessibility Issues:', accessibilityIssues);

    expect(accessibilityIssues).toHaveLength(0);
  });

  test('Mobile Responsiveness', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if mobile navigation works
    await page.click('[data-testid="mobile-menu-button"]');
    await page.waitForSelector('[data-testid="mobile-menu"]');

    // Check if forms are usable on mobile
    await page.click('text=Create Loan');
    await page.waitForSelector('[role="dialog"]');

    // Verify form elements are accessible
    const formInputs = await page.locator('input, select, textarea').count();

    expect(formInputs).toBeGreaterThan(0);

    // Check if tables are responsive
    await page.click('text=Loans');
    await page.waitForSelector('table');

    // Verify table is scrollable horizontally if needed
    const tableWidth = await page.locator('table').boundingBox();
    const viewportWidth = page.viewportSize()?.width || 375;

    if (tableWidth && tableWidth.width > viewportWidth) {
      const isScrollable = await page.locator('table').evaluate((el) => {
        return el.scrollWidth > el.clientWidth;
      });

      expect(isScrollable).toBe(true);
    }
  });
});
