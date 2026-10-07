import { test, expect } from "@playwright/test";

// Verification Suite for Research Workspace Operational Integration
test.describe("Research Workspace Operational Integration", () => {
  test("Case Workspace contains Research tab", async ({ page }) => {
    // Navigate to MAT-2501-001 overview
    await page.goto("/admin/cases/MAT-2501-001");
    const researchTab = page.locator('nav a:has-text("Research")');
    await expect(researchTab).toBeVisible();

    // Click Research tab
    await researchTab.click();
    await expect(page).toHaveURL(/.*\/admin\/cases\/MAT-2501-001\/research/);

    // Context should automatically be MAT-2501-001
    const caseSelect = page.locator("select").first();
    await expect(caseSelect).toHaveValue("MAT-2501-001");
  });

  test("Research Workspace displays stats and attributed provenance", async ({ page }) => {
    await page.goto("/admin/research");
    await expect(page.locator("h1")).toContainText("Open-Source Investigation Workbench");

    // Check presence of summary metrics
    await expect(page.locator("text=Total Findings")).toBeVisible();
    await expect(page.locator("text=Active Pivots")).toBeVisible();

    // Check attributed source link
    await expect(page.locator("text=Sharjah Media City")).toBeVisible();
  });
});
