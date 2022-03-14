# Book Selector

## Introduction
Book Selector repository conrains is a Node.Js application for choosing random books from selected categry and adding to amazom shoping chart.

## Story
Our customer loves buying books, but has terrible difficulty deciding which books to purchase. You want to help by
writing an application or a script

## Installation and Runnig the application
after cloning the repository please install packages vith npm or yarn
for cloning the repo you can use git clone command
```
git clone git@github.com:koraytug/book_selector.git
```

For the instalations on the terminal window in the project directory run
```
npm install
```

After installation for running application  

```
npm start dev
```
OR you can use
```
npm start
```


## INPUT
When application started it wil get catogories from goodreads and print to the terminal window. The message will ask to the user to choose a category from the list

```
please select enter category number!:
```


## OUTPUT
end of the process propts user the message below and will open a browser window which one shows amazon shoping cart with the chosen book.

```
Item is not added to cart
```

## Troubleshooting
Problem: The application won't start!

Try:
1. Run `npm install` again
2. Update your version of `Node.js` to the latest
3. Clone the finished repo and start from there

Problem: I'm getting weird error XYZ!

Try:
1. Cancel `npm start dev` (with ctrl-C on windows with control+C on MacOs) and run it again
2. If there error mentions any particular file, visit that file and make sure you didn't make any common errors (capitalization of property names, forgetting to destructure paramaters with curly brackets)