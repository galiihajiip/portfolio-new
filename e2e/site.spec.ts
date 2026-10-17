import { expect, type Page, test } from "@playwright/test";

const noHorizontalOverflow = async (page: Page) =>
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);

test.describe("homepage", () => {
  test("renders every chapter without console errors or overflow", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("I build things");
    for (const id of ["story", "projects", "experience", "research", "leadership", "achievements", "toolkit", "about", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    await noHorizontalOverflow(page);
    expect(errors).toEqual([]);
  });

  test("hero CTA jumps to the projects chapter", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Explore my work" }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator("#projects")).toBeInViewport();
  });

  test("filters change the visible projects and keep the carousel valid", async ({ page }) => {
    await page.goto("/");
    const track = page.locator("#project-track > li");
    const all = await track.count();
    expect(all).toBeGreaterThan(3);
    await page.getByRole("button", { name: /^Data & IoT/ }).click();
    await expect(track).toHaveCount(1);
    await expect(page.getByRole("button", { name: "Previous projects" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Next projects" })).toBeDisabled();
    await page.getByRole("button", { name: /^All work/ }).click();
    await expect(track).toHaveCount(all);
  });

  test("carousel arrows page through and stop at both ends", async ({ page }) => {
    await page.goto("/");
    await page.locator("#projects").scrollIntoViewIfNeeded();
    const prev = page.getByRole("button", { name: "Previous projects" });
    const next = page.getByRole("button", { name: "Next projects" });
    await expect(prev).toBeDisabled();
    for (let i = 0; i < 10 && (await next.isEnabled()); i++) {
      await next.click();
      await page.waitForTimeout(500);
    }
    await expect(next).toBeDisabled();
    await expect(prev).toBeEnabled();
    // The final card is fully revealed horizontally inside the track.
    const fits = await page.evaluate(() => {
      const track = document.getElementById("project-track")!.getBoundingClientRect();
      const last = document.querySelector("#project-track > li:last-child")!.getBoundingClientRect();
      return last.right <= track.right + 1 && last.left >= track.left - 1;
    });
    expect(fits).toBe(true);
    for (let i = 0; i < 10 && (await prev.isEnabled()); i++) {
      await prev.click();
      await page.waitForTimeout(500);
    }
    await expect(prev).toBeDisabled();
  });

  test("each card links to its case study", async ({ page }) => {
    await page.goto("/");
    const first = page.locator("#project-track > li").first().getByRole("link");
    const href = await first.getAttribute("href");
    await first.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("world map", () => {
  test("region index opens a detail with a working link (desktop)", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop atlas panel");
    await page.goto("/");
    const atlas = page.getByRole("navigation", { name: "World atlas regions" });
    await atlas.getByRole("button", { name: /Milestone Summit/ }).click();
    await expect(atlas.getByText(/Competitions, scholarships/)).toBeVisible();
    await atlas.getByRole("link", { name: /Explore awards/ }).click();
    await expect(page).toHaveURL(/#achievements$/);
  });

  test("region chips open details (mobile)", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile chips");
    await page.goto("/");
    await page.getByRole("button", { name: /Research Woods/ }).click();
    await page.getByRole("link", { name: /Explore research/ }).click();
    await expect(page).toHaveURL(/#research$/);
  });

  test("illustrated fallback works without WebGL", async ({ page }) => {
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      // Simulate a browser without WebGL.
      HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...rest: unknown[]) {
        if (type.startsWith("webgl")) return null;
        return (original as (...a: unknown[]) => unknown).call(this, type, ...rest);
      } as typeof original;
    });
    await page.goto("/");
    await expect(page.getByAltText(/Illustrated map of The Builder's Atlas/)).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    await expect(page.getByText(/3D isn't available/).first()).toBeAttached();
  });

  test("3D scene starts when WebGL is available", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#map canvas")).toBeAttached({ timeout: 20_000 });
  });
});

test.describe("navigation and routes", () => {
  test("mobile menu opens and navigates", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile menu");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: /Milestones/ }).click();
    await expect(page).toHaveURL(/#achievements$/);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });

  test("project archive filters and case-study navigation", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("button", { name: /^AI & Machine Learning/ }).click();
    await expect(page.locator("#project-archive > li")).toHaveCount(2);
    await page.goto("/projects/cogniflip");
    await expect(page.getByRole("heading", { level: 1, name: "CogniFlip" })).toBeVisible();
    await page.getByRole("link", { name: /Next/ }).last().click();
    await expect(page).not.toHaveURL(/cogniflip$/);
    await page.goBack();
    await expect(page).toHaveURL(/cogniflip$/);
  });

  test("research pages render", async ({ page }) => {
    await page.goto("/research");
    await page.getByRole("link", { name: /Applied Machine Learning/ }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Applied Machine Learning");
  });

  test("unknown project shows the custom 404", async ({ page }) => {
    const res = await page.goto("/projects/not-a-real-project");
    expect(res?.status()).toBe(404);
    await expect(page.getByText("Off the map")).toBeVisible();
  });

  test("reduced motion keeps the layout intact", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await noHorizontalOverflow(page);
  });

  test("inner pages have no horizontal overflow", async ({ page }) => {
    for (const path of ["/projects", "/projects/cogniflip", "/research", "/research/pibiti-2026"]) {
      await page.goto(path);
      await noHorizontalOverflow(page);
    }
  });
});
