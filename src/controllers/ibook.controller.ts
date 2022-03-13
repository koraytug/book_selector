import {IPageController} from "./ipage.controller";

export interface IBookController {
    askwhichCategory():Promise<number>;
    chooseRandomBook(min, max):number ;
    printCategories(categoriesNames:string[]);
    getAmazonBookLink(pageController:IPageController): Promise<object>;
}
