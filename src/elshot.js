// Usage: node elshot.js <html file> <out dir> <id1,id2,...>
// Screenshots each element id in light and dark colour schemes at 2x.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [file, outDir, ids] = process.argv.slice(2);
  const browser = await chromium.launch();
  for (const scheme of ['light', 'dark']) {
    const page = await browser.newPage({
      viewport: { width: 1300, height: 1200 }, deviceScaleFactor: 2, colorScheme: scheme,
    });
    await page.goto('file://' + path.resolve(file));
    await page.waitForLoadState('networkidle');
    for (const id of ids.split(',')) {
      await page.locator('#' + id).screenshot({
        path: path.join(outDir, `${id}-${scheme}.png`), omitBackground: true,
      });
    }
    await page.close();
  }
  await browser.close();
})();
