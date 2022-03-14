
import puppeteer from "puppeteer";
import {startUserBrowser} from "./helpers/browser";
import PageController from "./controllers/page.controller";
import {IPageController} from "./controllers/ipage.controller";
import {IBookController} from "./controllers/ibook.controller";
import BookController from "./controllers/book.controller";

async function chooseABook() {
    try {
        const pageController: IPageController = new PageController();
        const bookController: IBookController = new BookController();

        const amazonBookLinkObject: object = await bookController.getAmazonBookLink(pageController);

        const userBrowserInstance: puppeteer.Browser = await startUserBrowser();

        const amazonBookLink: string = `https://www.goodreads.com${amazonBookLinkObject}`;
        const bookPage: puppeteer.Page = await pageController.openAmazonBookPage(userBrowserInstance, amazonBookLink);

        await pageController.clickAddToCart(bookPage);

        await pageController.verifyAddToCartProcess(bookPage);
    } catch (error) {
        console.log("Something went Wrong, Please try it again!");
        console.log("Error message:", error);
        process.exit(0);
    }
}

chooseABook();

