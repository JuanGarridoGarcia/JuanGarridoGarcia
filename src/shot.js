// Usage: node shot.js <html file> <output png> <width> <height> [scale] [colorScheme]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [file, out, w, h, scale = '2', scheme = 'light'] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: +w, height: +h },
    deviceScaleFactor: +scale,
    colorScheme: scheme,
  });
  await page.goto('file://' + path.resolve(file));
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: out, omitBackground: true, fullPage: true });
  await browser.close();
})();
