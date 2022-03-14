import {IPageController} from "./ipage.controller";
import puppeteer from "puppeteer";

export default class PageController implements IPageController {
    public async scrapeAll(browserInstance: puppeteer.Browser, url: string): Promise<puppeteer.Page> {
        try {
            return Promise.resolve(await this.scraper(browserInstance, url));
        } catch (err) {
            Promise.reject("Could not resolve the browser instance =>");
        }
    }

    public async getCategoryNames(page: puppeteer.Page): Promise<string[]> {
        try {
            const categoriesNames = await page.$$eval(".category h4", names => {
                return names.map(name => name.innerHTML);
            }
            );
            return Promise.resolve(categoriesNames);
        } catch (error) {
            return Promise.reject("Could not get category names");
        }

    }

    public async getBooksInCategory(page: puppeteer.Page): Promise<string[]> {
        try {
            const bookLinks = await page.$$eval(".tooltipTrigger > a", links => { return links.map(link => link.getAttribute("href"))});
            return Promise.resolve(bookLinks);
        } catch (error) {
            return Promise.reject("Could not get books in the selected category");
        }
    }

    public async getCategoriesLinks(page: puppeteer.Page): Promise<string[]> {
        try {
            const categoriesLinks = await page.$$eval(".category > a", links => { return links.map(link => link.getAttribute("href"))});
            return Promise.resolve(categoriesLinks);
        } catch (error) {
            return Promise.reject("Could not get category links");
        }
    }

    public async getAmazonBookLink(bookLink: string, browserInstance:puppeteer.Browser,
        customerController:IPageController):Promise<string[]> {
        try {
            const url = `https://www.goodreads.com/${bookLink}`;
            const page = await customerController.scrapeAll(browserInstance, url);

            const amazonBookLink = await page.$$eval(".buyButtonBar > li > .buttonBar", links => {
                return links.map(link => link.getAttribute("href"));
            });

            return Promise.resolve(amazonBookLink);
        } catch (error) {
            return Promise.reject("Could not get book link for amazon page");
        }
    }

    public async openAmazonBookPage(browserInstance: puppeteer.Browser, url: string): Promise<puppeteer.Page> {
        try {
            return Promise.resolve(await this.scraper(browserInstance, url));
        } catch (error) {
            // console.log("Could not resolve the browser instance => ", err);
            return Promise.reject("Could not open the amazon book page");
        }
    }

    public async clickAddToCart(bookPage: puppeteer.Page): Promise<void> {
        try {
            const addToCart = await bookPage.waitForXPath("//*/input[@id='add-to-cart-button']", {visible: true});
            await addToCart.click();
            return Promise.resolve();
        } catch (error) {
            return Promise.reject("Could not add book to the shoping cart");
        }
    }

    public async verifyAddToCartProcess(bookPage: puppeteer.Page): Promise<void> {
        try {
            const successMessage = await bookPage.waitForXPath("//*[contains(text(),'Added to Cart')]", {visible: true});
            if (successMessage === null) {
                console.log("Item is not added to cart");
            } else {
                console.log("Item is added to cart successfully");
            }
            return Promise.resolve();
        } catch (error) {
            return Promise.reject("Could not verify the book in the cart");
        }
    }

    private scraper = async (browser: puppeteer.Browser, url: string): Promise<puppeteer.Page> => {
        try {
            const page = await browser.newPage();
            console.log(`Navigating to ${url}...`, {
                waitUntil: "domcontentloaded"
            });
            await page.goto(url);
            return Promise.resolve(page);
        } catch (error) {
            return Promise.reject("Could not navigate to the page");
        }
    };
}
