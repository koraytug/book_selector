import {IPageController} from "./ipage.controller";
import puppeteer from "puppeteer";

export default class PageController implements IPageController {
    public async scrapeAll(browserInstance: puppeteer.Browser, url: string): Promise<puppeteer.Page> {
        try {
            return await this.scraper(browserInstance, url);
        } catch (err) {
            console.log("Could not resolve the browser instance => ", err);
        }
    }

    public async getCategoryNames(page: puppeteer.Page) {
        const categoriesNames = await page.$$eval(".category h4", names => {
            return names.map(name => name.innerHTML);
        }
        );
        return categoriesNames;
    }

    public async getBooksInCategory(page: puppeteer.Page) {
        const bookLinks = await page.$$eval(".tooltipTrigger > a", links => { return links.map(link => link.getAttribute("href"))});
        return bookLinks;
    }

    public async getCategoriesLinks(page: puppeteer.Page) {
        const categoriesLinks = await page.$$eval(".category > a", links => { return links.map(link => link.getAttribute("href"))});
        return categoriesLinks;
    }

    public async getAmazonBookLink(bookLink: string, browserInstance:puppeteer.Browser,
        customerController:IPageController):Promise<object> {
        const url = `https://www.goodreads.com/${bookLink}`;
        const page = await customerController.scrapeAll(browserInstance, url);

        const amazonBookLink = await page.$$eval(".buyButtonBar > li > .buttonBar", links => {
            return links.map(link => link.getAttribute("href"));
        });

        console.log("typeof(amazonBookLink", typeof (amazonBookLink));
        return Promise.resolve(amazonBookLink);
    }

    public async openAmazonBookPage(browserInstance: puppeteer.Browser, url: string): Promise<puppeteer.Page> {
        try {
            return await this.scraper(browserInstance, url);
        } catch (err) {
            console.log("Could not resolve the browser instance => ", err);
        }
    }

    public async clickAddToChart(bookPage: puppeteer.Page): Promise<void> {
        const addToCart = await bookPage.waitForXPath("//*/input[@id='add-to-cart-button']", {visible: true});
        await addToCart.click();
    }

    public async verifyAddToChartProcess(bookPage: puppeteer.Page): Promise<void> {
        const successMessage = await bookPage.waitForXPath("//*[contains(text(),'Added to Cart')]", {visible: true});
        if (successMessage === null) {
            console.log("Item is not added to cart");
        } else {
            console.log("Item is added to cart successfully");
        }
    }

    private scraper = async (browser: puppeteer.Browser, url: string): Promise<puppeteer.Page> => {
        const page = await browser.newPage();
        console.log(`Navigating to ${url}...`, {
            waitUntil: "domcontentloaded"
        });
        await page.goto(url);
        return page;
    };

}
