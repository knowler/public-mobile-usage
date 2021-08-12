import {chromium} from 'playwright';
import {config} from 'dotenv';

// Load the .env file for username and password
config();

// Create a page in Chrome
const browser = await chromium.launch({channel: 'chrome'});
const page = await browser.newPage();

// Login through the login page
await page.goto('https://selfserve.publicmobile.ca')
await page.fill('#FullContent_ContentBottom_LoginControl_UserName', process.env.USERNAME);
await page.fill('#FullContent_ContentBottom_LoginControl_Password', process.env.PASSWORD);
await page.click('#FullContent_ContentBottom_LoginControl_LoginButton');

// Get the used and total for talk
const talkUsed = await page.waitForSelector('#ctl00_ctl00_FullContent_DashboardContent_Overview_Prepaid_AddonListView_ctrl0_VoiceUsedLiteral');
const talkTotal = await page.waitForSelector('#ctl00_ctl00_FullContent_DashboardContent_Overview_Prepaid_AddonListView_ctrl0_VoiceAllowanceLiteral');

// Get the used and total for Data
const dataUsed = await page.waitForSelector('#ctl00_ctl00_FullContent_DashboardContent_Overview_Prepaid_AddonListView_ctrl1_VoiceUsedLiteral');
const dataTotal = await page.waitForSelector('#ctl00_ctl00_FullContent_DashboardContent_Overview_Prepaid_AddonListView_ctrl1_VoiceAllowanceLiteral');

// Report the amounts
console.info(`
Talk: ${await talkUsed.textContent()} / ${await talkTotal.textContent()}
Data: ${await dataUsed.textContent()} / ${await dataTotal.textContent()}
`.trim())

// Peace out
await browser.close();
process.exit();
