import puppeteer from "puppeteer";
import {IBookController} from "./ibook.controller";
import readline from "readline";
import startBrowser from "../helpers/browser";
import {IPageController} from "./ipage.controller";

export default class BookController implements IBookController {
    public async askwhichCategory():Promise<number> {
        try {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            let selectedCategoryIndex: number = -1;

            return new Promise((resolve, reject) => {
                rl.question("please select enter category number!", index => {
                    if (isNaN(Number(index))) {
                        reject("invalid selection!");
                        process.exit(0);
                    }

                    selectedCategoryIndex = Number(index);
                    rl.close();
                });

                rl.on("close", async () => {
                // console.log("\nBYE BYE !!!");
                    console.log(`Category number: ${selectedCategoryIndex} selected!`);
                    // process.exit(0);
                    // browserInstance = await startBrowser();
                    return resolve(selectedCategoryIndex);
                });
            });
        } catch (error) {
            Promise.reject(error);
        }
    }

    public chooseRandomBook(min, max):number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public printCategories(categoriesNames:string[]) {
        categoriesNames.forEach((category: string, index) => {
            console.log(`[${index + 1}] ${category.replace(/(\r\n|\n|\r)/gm, "")}`);
        });
    }

    public async getAmazonBookLink(pageController:IPageController): Promise<object> {
        try {
            //Start the browser and create a browser instance
            const browserInstance: puppeteer.Browser = await startBrowser();
            const bookController: IBookController = new BookController();

            let url: string = "https://www.goodreads.com/choiceawards/best-books-2020";
            let page: puppeteer.Page = await pageController.scrapeAll(browserInstance, url);

            const categoriesNames = await pageController.getCategoryNames(page);
            bookController.printCategories(categoriesNames);

            const categoriesLinks = await pageController.getCategoriesLinks(page);

            const selectedCategoryIndex = await bookController.askwhichCategory();
            console.log("selectedCategoryIndex", selectedCategoryIndex);

            url = `https://www.goodreads.com${categoriesLinks[selectedCategoryIndex + 1]}`;
            page = await pageController.scrapeAll(browserInstance, url);

            const bookLinks = await pageController.getBooksInCategory(page);

            const randomBookIndex: number = bookController.chooseRandomBook(1, bookLinks.length) - 1;

            const amazonBookLinkObject: object =
        await pageController.getAmazonBookLink(bookLinks[randomBookIndex], browserInstance, pageController);

            await browserInstance.close();
            return Promise.resolve(amazonBookLinkObject);
        } catch (error) {
            Promise.reject(error);
        }

    }
}
