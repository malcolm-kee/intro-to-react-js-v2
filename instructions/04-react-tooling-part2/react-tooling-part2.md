---
title: React Tooling Part 2
path: '/react-tooling-part2'
---

# React Tooling Part 2

In this section, we will discuss about webpack and the ecosystem around it.

## [webpack]

![webpack logo](webpack-logo.png)

- Modern JS applications usually involved hundreds, if not thousands of files/functions. It would be painful and error-prone if we just include `<script>` tags in our html file manually.
- This may not seems obvious to us now because currently we have only two components `App` and `Movie`. However, even with only two components, we need to bear in mind that `React` and `ReactDOM` are our dependencies and we need to ensure our code only run after they are loaded. Try to move our script tag above the `React` and `ReactDOM` script tags, and you realize our code no longer works because React code has not loaded yet.
- Now imagine you have 50+ components and more than 20 dependencies, and there are some inter-dependencies between those files, manually analyzing and rearranging your script tags would be very painful, if not impossible.
- webpack is the tools that solves this problem. It allows us to use JS module system like [commonjs] (e.g. `const React = require('react')`) and [ECMAScript Module][ecma-module] (e.g. `import React from 'react'`) by parsing them and create a single bundled output file.
- On top of that, webpack has been extended to handle all types of files that involved in a modern web application, e.g. css, images, html etc.

### Bundling code with webpack

- To use webpack:
  1. Install it in your project: `npm install -D webpack webpack-cli`
  1. Create a folder and call it `src`. Move your `script.js` into this folder and rename it as `index.js`.
  1. Add the following npm scripts:
     ```json
     "build": "webpack --mode=\"development\""
     ```
  1. Run `npm run build`
- webpack will produces a file call `main.js` in `dist` folder.
  - webpack will includes some additional code (known as webpackBootstrap). The code is the runtime of webpack to manage your dependencies and perform some magic e.g. lazy-loading (which we will explain later).
  - If you update your `index.html` to use script from `dist/main.js`, the code should works as before.
- Let's utilize webpack by splitting `App` and `Movie` into their own module/file:
  1. Create a file alongside `index.js` and call it `movie.js`.
  1. Cut and paste the `Movie` component into `movie.js`.
  1. At the bottom of the `movie.js`, add the following statement:
     ```js
     export default Movie;
     ```
  1. Create another file and call it `app.js`.
  1. Cut and paste the `App` component into `app.js`.
  1. At the top of the `app.js`, add the following statement:
     ```js
     import Movie from './movie';
     ```
  1. At the bottom of the `app.js`, add the following statement:
     ```js
     export default App;
     ```
  1. All `App` and `Movie` code should be removed from `index.js` now. Add the following statement at the top of `index.js`:
     ```js
     import App from './app';
     ```
- Functionally, our code still works the same. However, now we organize our code with modules and dependencies between them are managed by webpack.
- `import` statement is used to include code that the module depends on. For our example above:
  - `app.js` depends on `movie.js`
  - `index.js` depends on `app.js`
- `export` statement is used to declare the code that is exposed to other modules.
  - there are two types of `export` statement, i.e. default export and named export.
  - We use default export in our files currently. You can read more about them [here][export-docs].

<hr >

## :pencil: Do It: add webpack and bundle your code

1. Install webpack and configure build script based on the instruction above.
1. Verify that your code still works as before.
1. (Bonus) use named exports for `movie.js`.

<hr >

### Bundling external dependencies

- Now let us utilize webpack to manage the our dependencies to React and ReactDOM.
  1. Install React and ReactDOM: `npm install react react-dom`. Note that there is no `-D` flag as we need React and ReactDOM in our application code, not tools during development/building.
  1. At the top of your `index.js`, add the following statements:
     ```js
     import React from 'react';
     import ReactDOM from 'react-dom';
     ```
  1. At the top of `app.js` and `movie.js`, add the following statement:
     ```js
     import React from 'react';
     ```
  1. Remove the unpkg script tags for React and ReactDOM in your `index.html`.
  1. Run `npm run build` again. Verify that your code still works as before.

<hr >

## :pencil: Do It: install React and let webpack bundle it

1. Install React and ReactDOM.
1. Bundle them together by including changes as described above.
1. Verify that your code still works as before.

<hr >

### Bundling for production

- You may realize that the current output file of webpack has tons of comments and spaces, which is good for us to read and understand what it is doing, but bad to be included to production as those comments are not useful for our customers/users.
- Let us create a production bundle for our app:
  1. Add the following npm script in `package.json`:
     ```json
     "build:prod": "webpack --mode=\"production\""
     ```
  1. run `npm run build:prod`

<hr >

## :pencil: Do It: install React and let webpack bundle it

1. Configure build:prod npm scripts as described above.
1. Run the script and verify the produced `main.js` is minified, and the file size is much smaller now.

<hr >

### Other features of webpack

Note that webpack is much more powerful than I've described above. The following common use cases of webpack are omitted here, but you should have a read after this workshop.

- [`HtmlWebpackPlugin`][htmlwebpackplugin]: include your `index.html` into your webpack bundling process, so it will auto-inject any output into the html automatically.
- [`webpack DevServer`][webpack-devserver]: create a development server that will serve your output files and auto-reload page whenever you edit your code
- [`style-loader`][style-loader] and [`css-loader`][css-loader]: allow you to import `.css` file in your javascript file, which will be injected as `<script>` tag in html.

## [Babel]

![Babel logo](babel-logo.png)

- In our current code, we use new JS feature/syntax like arrow-function, `const` and `class`. However, only modern browser recognize those JS syntax - it will cause parsing error in older browser like IE 11. You can confirm this by opening your `index.html` using IE.
- Babel is the tool that allow us to write modern JS while maximizing backward compatibility.
- Babel is a compiler that compile your modern JS code (usually called ES2015+, or ES6+) to the older JS code.
- You can see Babel in action at [https://babeljs.io/repl](https://babeljs.io/repl).

### Compiling code with Babel

- Babel allows few usage options, e.g. as a CLI tool or plugin to other build system.
- Since we are using webpack, we will use `babel-loader` to integrate babel into our project.
- To include Babel as part of our webpack bundling process:

  1. Install required packages:
     ```bash
     npm install -D @babel/core @babel/preset-env babel-loader
     ```
  1. Create a `.babelrc` file with the following content. This file tells Babel what transformation to perform.
     ```json
     {
       "presets": ["@babel/preset-env"]
     }
     ```
  1. Create a `.browserlistrc` file with the following content. This specifies what browser you supports. `@babel/preset-env` use this information to decide what syntax it needs to transform and what can be leave it as-is.
     ```
     > 1%
     not ie <= 8
     ```
  1. Create a `webpack.config.js` file with the following content. This configuration tells webpack to run through all file ends with `.js` or `.jsx` extension through the `babel-loader`.
     ```javascript
     module.exports = {
       module: {
         rules: [
           {
             test: /\.(js|jsx)$/,
             exclude: /node_modules/,
             use: ['babel-loader']
           }
         ]
       }
     };
     ```
  1. Update your npm scripts in `package.json`:
     ```javascript
     ...
     "build": "webpack --config webpack.config.js --mode=\"development\"",
     "build:prod": "webpack --config webpack.config.js --mode=\"production\"",
     ...
     ```
  1. Run `npm run build` again. Verify your code should works in IE now.

<hr >

## :pencil: Do It: install Babel and integrate it with your project

1. Configure Babel as described above.
1. Run `npm run build` and verify that the application works in IE.

<hr >

[webpack]: https://webpack.js.org/
[commonjs]: https://flaviocopes.com/commonjs/
[ecma-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
[export-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
[htmlwebpackplugin]: https://webpack.js.org/plugins/html-webpack-plugin/
[webpack-devserver]: https://webpack.js.org/configuration/dev-server/
[style-loader]: https://webpack.js.org/loaders/style-loader/
[css-loader]: https://webpack.js.org/loaders/css-loader/
[babel]: https://babeljs.io/
