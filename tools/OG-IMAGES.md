# Render Open Graph images before publishing

The HTML template has a fixed 1200 × 630 canvas. PNGs are intentionally not generated, as requested.

From the repository root, start `npm run dev`. With Playwright and its Chromium browser available, run:

```sh
npx playwright screenshot --viewport-size="1200,630" "http://localhost:8080/mgabriel/tools/og-template.html" public/og-default.png
npx playwright screenshot --viewport-size="1200,630" "http://localhost:8080/mgabriel/tools/og-template.html?variant=eleven" public/og-story-eleven.png
npx playwright screenshot --viewport-size="1200,630" "http://localhost:8080/mgabriel/tools/og-template.html?variant=conversion" public/og-story-conversion.png
```

Alternatively, open each URL in a browser, set its viewport to exactly 1200 × 630 at 100% zoom, and save a viewport screenshot to the matching filename above. Do not include browser chrome.

Then run `npm run build` and confirm all three PNGs exist in `dist/` and measure 1200 × 630. Metadata already references these filenames. Keep the existing `public/profile.jpg`.

After an authorized deployment, check all three page URLs with LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/.
