import {chromium} from 'playwright';

// Load the .env file for username and password
await import('dotenv').then(dotenv => dotenv.config());

// Create a page in Chrome
const browser = await chromium.launch({channel: 'chrome'});
const page = await browser.newPage();

// Helper for getting text content
const getTextContent = async selector => await page.waitForSelector(selector).then(element => element.textContent());

// Login through the login page
await page.goto('https://selfserve.publicmobile.ca')
await page.fill('#FullContent_ContentBottom_LoginControl_UserName', process.env.USERNAME);
await page.fill('#FullContent_ContentBottom_LoginControl_Password', process.env.PASSWORD);
await page.click('#FullContent_ContentBottom_LoginControl_LoginButton');

// Get the used and total for talk
const talkUsed = await getTextContent('#ctl00_ctl00_FullContent_DashboardContent_Overview_Prepaid_AddonListView_ctrl0_VoiceUsedLiteral');
const talkTotal = await getTextContent('#ctl00_ctl00_FullContent_DashboardContent_Overview_Prepaid_AddonListView_ctrl0_VoiceAllowanceLiteral');

// Get the used and total for Data
const dataUsed = await getTextContent('#ctl00_ctl00_FullContent_DashboardContent_Overview_Prepaid_AddonListView_ctrl1_VoiceUsedLiteral');
const dataTotal = await getTextContent('#ctl00_ctl00_FullContent_DashboardContent_Overview_Prepaid_AddonListView_ctrl1_VoiceAllowanceLiteral');

// Report the amounts
console.info(`
Talk: ${talkUsed} / ${talkTotal}
Data: ${dataUsed} / ${dataTotal}
`.trim())

// Peace out
await browser.close();
process.exit();
