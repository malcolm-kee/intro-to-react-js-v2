---
title: React Core
path: '/react-core'
---

# React Core

In this section, we will discuss the core API of React.

But before that, we will discuss the thing people associate closely with React &mdash; JSX

## JSX

You do not need JSX to use React, as I've shown you in [previous section](/vanilla-react). However, JSX would make your code a bit more readable.

Let's convert `Movie` component to using JSX. It will look like this:

```jsx
import React from 'react';

const Movie = props => (
  <div>
    <h1>{props.name}</h1>
    <h2>{props.releaseDate}</h2>
  </div>
);

export default Movie;
```

- Personally, I feel this is more readable. You may feel uncomfortable to introduce HTML in Javascript, I invite you to give it a shot until the end of this workshop.
- Comparing with the previous code, now you know what actually JSX does &mdash; it is just translating those HTML tags into `React.createElement` calls. That's it.
- Note the strange `{props.name}` syntax: this is how you output Javascript expression. It you take away `{}`, it will literally output the string `props.name`.
- Notice you still have to import React despite React not being explicitly used. As JSX is compiled to `React.createElement`, anywhere you use JSX, you need to import React. However, ESLint doesn't understand this relationship by default, thus it is yelling at you that "React is defined but never used". We will fix this later.

So now JSX is demystified a bit, let's go convert `App` and `index.js`.

```jsx
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>React Movie App</h1>
        <Movie name="Aquaman" releaseDate="2018-12-07" />
        <Movie name="Bumblebee" releaseDate="2018-12-15" />
        <Movie
          name="Fantastic Beasts: The Crimes of Grindelwald"
          releaseDate="2018-11-14"
        />
      </div>
    );
  }
}
```

```jsx
ReactDOM.render(<App />, document.getElementById('root'));
```

- Notice that why first letter of `Movie` is capitalized. It _must_ be. If you make it lowercase, it will try to have `movie` as a web component and not a React component.
- We now pass props down as we add attributes to an HTML tag.

### Configure Babel to compile JSX

If you try to compile the code by running `npm run build` now, it will throw `SyntaxError`. This is because Babel does not recognize JSX by default since JSX is not part of Javascript &mdash; it's just a syntatic sugar introduced to make React code more readable.

Therefore, we need to configure Babel so that it will recognize JSX and compile them to `React.createElement` calls.

1. run `npm install -D @babel/preset-react`
2. add `@babel/preset-react` into `.babelrc` presets.
   ```json
   {
     "presets": ["@babel/preset-env", "@babel/preset-react"]
   }
   ```

Now when you run `npm run build` again, the compilation should succeeds and your app should work as before.

## :pencil: Do It: convert components to use JSX and configure Babel

1. Update `index.js`, `app.js`, and `movie.js` to use JSX as described above.
1. Configure Babel to compile JSX.
1. Run `npm run build` and verify that the application still works as before.

<hr >

### Configure ESLint for React App

Currently ESLint is yelling at us about React not being used. Let's configure ESLint to understand that.

1. run `npm install -D eslint-plugin-react`
2. update `.eslintrc`:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react"
  ],
  "plugins": ["react"],
  "rules": {
    "react/prop-types": 0
  },
  "parserOptions": {
    "ecmaVersion": 2016,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "16.7"
    }
  }
}
```

- `plugin:react/recommended` are set of rules included as part of `eslint-plugin-react`.
- `react` is added to the `plugins`, in which ESLint will lookup `eslint-plugin-react`.
- React version will be added to `settings`, in which `eslint-plugin-react` depends on to suggest applicable rules.
- `react/prop-types` rules is overwritten, as we're not going to use `prop-types` in this workshop. In addition, I personally think that prop-types does not worth the investment &mdash; I recommend [Typescript] if you want to introduce type-checking in your project.

## :pencil: Do It: fix ESLint configuration

1. Configure ESLint as described above.
1. Run `npm run lint` and verify that no more linting error is shown.

<hr >

## React States and Lifecycle Methods

Let us get back to React now.

Our current app is too simple, as it's just rendering a list of movies. In an actual webapp, our application need to be more complex, e.g.:

- hide some information by default to declutter your page, but allow user click to show more
- loading data from backend api, and showing loading indicator while waiting for response

We will do that by using React states and lifecycle methods

### Use React States to track UI states e.g. show/hide

Let's assume the design of our app is to display "React Movie App" title and a "Show Movies" button only by default. When user clicks the button, the movies will be shown.

To achieve that, let's modify our `App` component to:

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMovies: false
    };
    this.showMovies = this.showMovies.bind(this);
  }

  showMovies() {
    this.setState({
      showMovies: true
    });
  }

  render() {
    let movies;

    if (this.state.showMovies) {
      movies = (
        <React.Fragment>
          <Movie name="Aquaman" releaseDate="2018-12-07" />
          <Movie name="Bumblebee" releaseDate="2018-12-15" />
          <Movie
            name="Fantastic Beasts: The Crimes of Grindelwald"
            releaseDate="2018-11-14"
          />
        </React.Fragment>
      );
    }

    return (
      <div>
        <h1>React Movie App</h1>
        <button onClick={this.showMovies}>Show Movies</button>
        {movies}
      </div>
    );
  }
}
```

- We declare `constructor` for our `App` and initialize our state with `this.state = { showMovies: false }`. Note that I've told you previously that class component is more powerful, and state is one of the functionality that only available for class component (at least for now).
- React state should always be a plain Object, while the value of the properties it totally up to you.
- We bind `this` keywords in `showMovies` methods to the component with `this.showMovies = this.showMovies.bind(this)`, because `this` is dynamic in Javascript (try to remove that line and you will get an error).
- We declare a `showMovies` methods, which will call `this.setState`. `setState` is a method that is available to all React class component (the component inherit this method via `extends React.Component`), and it's only way for you to update states.
- When we call `setState`, React will merge the object we provide it with its current state, then it will rerender the component.
- In the `render` method, we create a `button` element which will call `showMovies` method when it is clicked.
- Besides, we declare `movies` variable in `render` method, which be a list of movies if `this.state.showMovies` is true. `React.Fragment` is a container that renders nothing but allows you to wrap a list of React elements.

Before you start coding, there is some cleanup that I want to suggest:

1. Get rid of `movies` variable and just inline it with `&&` expression.
1. You can replace `React.Fragment` with `<>`, Babel would understand that `<>` is actually `React.Fragment`. I prefer this way, as this expresses what `React.Fragment` really is &mdash; an empty container.

Our final `App` component would be:

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMovies: false
    };
    this.showMovies = this.showMovies.bind(this);
  }

  showMovies() {
    this.setState({
      showMovies: true
    });
  }

  render() {
    return (
      <div>
        <h1>React Movie App</h1>
        <button onClick={this.showMovies}>Show Movies</button>
        {this.state.showMovies && (
          <>
            <Movie name="Aquaman" releaseDate="2018-12-07" />
            <Movie name="Bumblebee" releaseDate="2018-12-15" />
            <Movie
              name="Fantastic Beasts: The Crimes of Grindelwald"
              releaseDate="2018-11-14"
            />
          </>
        )}
      </div>
    );
  }
}
```

## :pencil: Do It: enhance App

1. Enhance your `App` component to show movies only when clicked as described above.
1. Run `npm run build` and verify that the application works as expected.

<hr >

[typescript]: https://www.typescriptlang.org/
