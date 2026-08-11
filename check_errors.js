import puppeteer from 'puppeteer';

(async () => {
  console.log("Starting puppeteer...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  console.log("Going to http://localhost:3000");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  await browser.close();
})();
