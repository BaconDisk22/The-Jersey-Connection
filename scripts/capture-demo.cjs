const {chromium} = require('playwright');
const {pathToFileURL} = require('node:url');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({headless:true});
  const url = pathToFileURL(path.resolve(__dirname,'../website/demo.html')).href;
  fs.mkdirSync('screenshots',{recursive:true});
  for (const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]) {
    const page = await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    await page.goto(url,{waitUntil:'load'});
    await page.locator('.notice').waitFor();
    await page.screenshot({path:'screenshots/jersey-demo-'+name+'.png',fullPage:true});
    await page.close();
  }
  await browser.close();
})().catch(err=>{console.error(err);process.exit(1)});
