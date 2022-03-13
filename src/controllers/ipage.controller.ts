import puppeteer from "puppeteer";

export interface IPageController {
    scrapeAll(browserInstance: puppeteer.Browser, url: string): Promise<puppeteer.Page> ;
    getCategoryNames(page: puppeteer.Page);
    getBooksInCategory(page: puppeteer.Page);
    getCategoriesLinks(page: puppeteer.Page);
    getAmazonBookLink(bookLink: string, browserInstance:puppeteer.Browser,
        customerController:IPageController):Promise<object>;
    openAmazonBookPage(browserInstance: puppeteer.Browser, url: string): Promise<puppeteer.Page>;
    clickAddToChart(bookPage: puppeteer.Page): Promise<void>;
    verifyAddToChartProcess(bookPage: puppeteer.Page): Promise<void>;
}
