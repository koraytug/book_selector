import puppeteer from "puppeteer";

export default async function startBrowser():Promise<puppeteer.Browser> {
    let browser: puppeteer.Browser;
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: true,
            args: ["--disable-setuid-sandbox"],
            ignoreHTTPSErrors: true
        });
        return Promise.resolve(browser);
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
        Promise.reject(err);
    }
    return browser;
}

export async function startUserBrowser():Promise<puppeteer.Browser> {
    let browser: puppeteer.Browser;
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox", "--start-maximized"],
            ignoreHTTPSErrors: true,
            defaultViewport: null
        });
        return Promise.resolve(browser);
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
        Promise.reject(err);
    }
}
