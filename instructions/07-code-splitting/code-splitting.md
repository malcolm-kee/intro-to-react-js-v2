---
title: Code Splitting
path: '/code-splitting'
---

# Code Splitting

In any large-scale React applications, it is very common that your users would not use all features everytime they access your applications. Therefore, it's better if you can only send down the code when it is required.

This used to be very difficult to do in a scalable way. However, thanks to webpack (and other bundler like Parcel), it has becoming very easy to do.

We will starts with lazy-loading some Javascript code, then lazy-loading React component.

## Lazy Loading JS code

To start lazy-loading JS code, the most straightforward way is through the dynamic [`import()`][dynamic-import] syntax.

We will lazy load the code in `api.js`.

Let's update `app.js`:

```jsx
import React from 'react';
import { BusyContainer } from './busy-container';
import Movie from './movie';

const loadCodeAndMoviesData = () =>
  import('./api').then(({ loadMovies }) => loadMovies());

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMovies: false,
      isLoading: true,
      movies: []
    };
    this.toggleMovies = this.toggleMovies.bind(this);
  }

  componentDidMount() {
    loadCodeAndMoviesData().then(movies =>
      this.setState({ movies, isLoading: false })
    );
  }

  toggleMovies() {
    this.setState(prevState => ({
      showMovies: !prevState.showMovies
    }));
  }

  render() {
    return (
      <div>
        <h1>React Movie App</h1>
        <button onClick={this.toggleMovies}>
          {this.state.showMovies ? 'Hide' : 'Show'} Movies
        </button>
        {this.state.showMovies && (
          <BusyContainer isLoading={this.state.isLoading}>
            {this.state.movies.map(movie => (
              <Movie
                name={movie.name}
                releaseDate={movie.releaseDate}
                key={movie.id}
              />
            ))}
          </BusyContainer>
        )}
      </div>
    );
  }
}

export default App;
```

- The `import { loadMovies } from './api';` statement at the beginning of the file is removed.
- We define a function `loadCodeAndMoviesData`, which will use dynamic `import` to load the code and then use the loaded function `loadMovies` to make the ajax call.
- In the `componentDidMount`, we use `loadCodeAndMoviesData` to get the movies from backend.

When you try to compile the code by `npm run build` now, you would get a syntax error. This is because babel does not understand dynamic `import` by default, so we need to add plugin to "teach" babel about the syntax.

1. `npm install -D @babel/plugin-syntax-dynamic-import`
1. update `.babelrc`:
   ```json
   {
     "presets": ["@babel/preset-env", "@babel/preset-react"],
     "plugins": ["@babel/plugin-syntax-dynamic-import"]
   }
   ```
1. run `npm run build` again.

Now you would see the following output:

```bash
Hash: f9f3a764f70be0b6cc25
Version: webpack 4.28.2
Time: 1229ms
Built at: 2019-01-07 21:45:12
    Asset        Size  Chunks             Chunk Names
0.bundle.js    57.2 KiB       0  [emitted]
1.bundle.js  1000 bytes       1  [emitted]
    main.js     870 KiB    main  [emitted]  main
Entrypoint main = main.js
```

Try to open the `index.html` file, and you realize that the splitted chunk (`0.js` and `1.js` cannot be loaded). This is because our webpack output is in the `dist/` folder and webpack doesn't know that. Let's fix it.

Update `webpack.config.js` to:

```js
module.exports = {
  output: {
    publicPath: '/dist/'
  },
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

Run `npm run build` again and refresh `index.html`, and your page is loaded successfully! Woohoo!

### Fixing ESLint

Now your dynamic `import` statement has some ESLint error, because ESLint doesn't understand dynamic `import` by default. We need to allow ESLint to understand the syntax:

1. `npm install -D babel-eslint`. `babel-eslint` enables ESLint to utilize babel to parse code.
1. add `parser` to `.eslintrc`:
   ```json
   {
       ...
       "parser": "babel-eslint",
       "parserOptions": {
           "ecmaVersion": 2017,
           "sourceType": "module",
           "ecmaFeatures": {
           "jsx": true
           }
       },
       ...
   }
   ```

The ESLint error should be fixed now.

<hr >

## :pencil: Do It: lazy loading ajax call code

1. modify `app.js` to lazy-load `api.js`.
1. install and configure babel, webpack, and ESLint as described.
1. test the application and ensure the code still works as before.

<hr >

## Lazy Loading React Component

Once you understand dynamic `import()` for JS code, lazy-loading React Components is a no-brainer.

Let's lazy load our `Movie` components by modify `app.js`:

```jsx
import React from 'react';
import { BusyContainer } from './busy-container';

const Movie = React.lazy(() =>
  import(/* webpackChunkName: "Movie" */ './movie')
);

const loadCodeAndMoviesData = () =>
  import(/* webpackChunkName: "api" */ './api').then(({ loadMovies }) =>
    loadMovies()
  );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMovies: false,
      isLoading: true,
      movies: []
    };
    this.toggleMovies = this.toggleMovies.bind(this);
  }

  componentDidMount() {
    loadCodeAndMoviesData().then(movies =>
      this.setState({ movies, isLoading: false })
    );
  }

  toggleMovies() {
    this.setState(prevState => ({
      showMovies: !prevState.showMovies
    }));
  }

  render() {
    return (
      <div>
        <h1>React Movie App</h1>
        <button onClick={this.toggleMovies}>
          {this.state.showMovies ? 'Hide' : 'Show'} Movies
        </button>
        {this.state.showMovies && (
          <React.Suspense fallback={<span>Loading Component...</span>}>
            <BusyContainer isLoading={this.state.isLoading}>
              {this.state.movies.map(movie => (
                <Movie
                  name={movie.name}
                  releaseDate={movie.releaseDate}
                  key={movie.id}
                />
              ))}
            </BusyContainer>
          </React.Suspense>
        )}
      </div>
    );
  }
}

export default App;
```

- We wrap dynamic `import` statement with `React.lazy`, so that React knows this is a lazy-loaded Component.
- We wrap lazy-loaded component with `React.Suspense` so that React will fallback to the loading indicator whenever any component within the `React.Suspense` is waiting to be loaded.

That's it!

<hr >

## :pencil: Do It: lazy loading React Component

1. modify `app.js` to lazy-load `Movie` component.
1. test the application and ensure the code still works as before.

<hr >

[dynamic-import]: https://developers.google.com/web/updates/2017/11/dynamic-import
