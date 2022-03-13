import {IPageController} from "./ipage.controller";

export interface IBookController {
    askwhichCategory():Promise<number>;
    chooseRandomBook(min: number, max: number):number ;
    printCategories(categoriesNames:string[]);
    getAmazonBookLink(pageController:IPageController): Promise<object>;
}
