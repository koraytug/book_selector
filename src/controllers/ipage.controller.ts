import puppeteer from "puppeteer";

export interface IPageController {
    scrapeAll(browserInstance: puppeteer.Browser, url: string): Promise<puppeteer.Page> ;
    getCategoryNames(page: puppeteer.Page): Promise<string[]>;
    getBooksInCategory(page: puppeteer.Page): Promise<string[]>;
    getCategoriesLinks(page: puppeteer.Page): Promise<string[]>;
    getAmazonBookLink(bookLink: string, browserInstance:puppeteer.Browser,
        customerController:IPageController):Promise<string[]>;
    openAmazonBookPage(browserInstance: puppeteer.Browser, url: string): Promise<puppeteer.Page>;
    clickAddToCart(bookPage: puppeteer.Page): Promise<void>;
    verifyAddToCartProcess(bookPage: puppeteer.Page): Promise<void>;
}
