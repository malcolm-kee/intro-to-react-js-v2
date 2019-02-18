---
title: Searching
path: '/searching'
description: 'Learn how to implements search function in React'
---

# Searching

This section will only be covered if we have additional time during the workshop.

## Implementing Search for Movie List

Our current movie list will displays all movies. It would be nice if our user can filter the result by searching with key words. Let's implement that.

### Prerequisite: API Service for Search

First of all, filtering result is usually done via backend as frontend application usually doesn't have all the data (if it is, it would be very slow to use your application).

Luckily, our current movies API supports search. Open a new browser tab with the following [URL](https://react-intro-movies.herokuapp.com/movies?q=aqua) and you would see only Aquaman is in the movie list:

```
https://react-intro-movies.herokuapp.com/movies?q=aqua
```

The end part of the URL (`q=aqua`) is how we search the list. Providing different value (e.g. `q=bumble`) would returns you different results.

### Passing Extra Parameter in Ajax Call

Update `loadMovies` function in `api.js` to accept a `searchKey` parameters:

```js
// highlight-next-line
export const loadMovies = searchKey =>
  getAxios()
    .then(axios =>
      axios.default('https://react-intro-movies.herokuapp.com/movies', {
        params: { q: searchKey } // highlight-line
      })
    )
    .then(res => res.data);
```

- axios accept a second parameter to customize the ajax call. `params` is an object that will be transformed to query string and append to the end of the ajax call.

Update `useMovieData` hook in `app.js`:

```js
...
function useMovieData() {
    ...
    // highlight-next-line
    const loadMoviesData = searchKey => {
        setIsLoading(true);
        // highlight-next-line
        loadMovies(searchKey).then(movieData => {
            setMovies(movieData);
            setIsLoading(false);
        });
    };
}
```

- `loadMoviesData` accepts `searchKey` parameter now, which will be passed to `loadMovies` call.

### Add an Input to Capture Search Key

Now we need to add an input to our App to capture searchKey.

```jsx
function App() {
  const [moviesShown, toggleShowMovies] = useToggle(false);
  const { movies, isLoading, loadMoviesData } = useMovieData();
  const { setName, setReleaseDate, setId, values } = useMovieForm();
  const [isEdit, setIsEdit] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState(''); // highlight-line

  ...

  return (
      ...
        {moviesShown && (
            <BusyContainer isLoading={isLoading}>
              {/* highlight-start */}
              <div className="field">
                <input
                  value={searchKey}
                  onChange={ev => setSearchKey(ev.target.value)}
                  className="input"
                  placeholder="Search for movie..."
                />
              </div>
              {/* highlight-end */}
              <React.Suspense fallback={<span className="spinner" />}>
                {movies.map(movie => (
                  <Movie
                    name={movie.name}
                    releaseDate={movie.releaseDate}
                    onClick={() => selectMovie(movie)}
                    key={movie.id}
                  />
                ))}
              </React.Suspense>
            </BusyContainer>
        )}
      ...
  );
}
```

- A new state `searchKey` is declared with initial value of `''`.
- An `input` is rendered with `value` and `onChange` set accordingly.

### Make API call when searchKey change

Currently we can type our search key in the input, but that doesn't update the movie list. To do that, let's move the ajax call effects from `useMovieData` hook into `App` component:

```js
...
function useMovieData() {
    const [movies, setMovies] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const loadMoviesData = searchKey => {
        setIsLoading(true);
        loadMovies(searchKey).then(movieData => {
            setMovies(movieData);
            setIsLoading(false);
        });
    };
    // highlight-next-line
    // React.useEffect(loadMoviesData, []);

    return {
       movies,
       isLoading,
       loadMoviesData
    };
}
...
function App() {
  const [moviesShown, toggleShowMovies] = useToggle(false);
  const { movies, isLoading, loadMoviesData } = useMovieData();
  const { setName, setReleaseDate, setId, values } = useMovieForm();
  const [isEdit, setIsEdit] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState('');

  React.useEffect(() => loadMoviesData(searchKey), [searchKey]); // highlight-line

  ...
}
```

Now our movie list will be updated based on what we type! Done? Nope.

### Debounce Effect

Our current code works, but it is unoptimal because we make an AJAX call for every keystroke. We need to "hold on" while user type, and only make the AJAX call after user stop typing.

To do that, let's create a file `use-debounced-effect.js` in `src/hooks` folder:

```js
import React from 'react';

export const useDebouncedEffect = (effect, deps, timeout = 500) => {
  React.useEffect(() => {
    let cleanup;
    const timerId = setTimeout(() => {
      cleanup = effect();
    }, timeout);
    return () => {
      clearTimeout(timerId);
      if (typeof cleanup === 'function') cleanup();
    };
  }, deps);
};
```

<hr >

## :pencil: Do It: Implement Search Movies Functionalities

1. Make the changes required to allow user to search movies.
1. Verify that the movies is updated when you type to the input field.

> [:octocat: `160-search-movie`](https://github.com/malcolm-kee/react-movie-app/tree/160-search-movie)

<hr >

### Debounce Ajax Call

Our current code works, but it is unoptimal because we make an AJAX call for every keystroke. We need to "hold on" while user type, and only make the AJAX call after user stop typing.

To do that, we need to use a common Javascript helper function, debounce. Let's add `debounce` function to our `lib.js`:

```js
...
export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

- In its essence, `debounce` allows you to wrap a function to limits the rate at which the function can be called. It achieve this by waiting for a buffer time before calling the function. If the function is invoke again before the buffer time finish, it will cancel the previous call and restart the buffer again.
- `debounce` is available in most utility libraries such as [`lodash`][lodash] and [`underscore`][underscore]. However it is overkill to include a library just for a single function, and this simple implementation is sufficient for our use case.

Let's use `debounce` in our `App`:

```jsx
...
import { debounce } from './lib';
...

class App extends React.Component {
    ...
    handleSearchTermChange = ev => {
        this.setState(
        {
            searchTerm: ev.target.value
        },
        () => {
            this.setState({ isLoading: true });
            this.debouncedUpdateMovieList(this.state.searchTerm);
        }
        );
    };
    ...
    debouncedUpdateMovieList = debounce(this.updateMovieList, 200);
    ...
}
```

- we create a debounced version of `updateMovieList` by wrapping it with `debounce` with a wait time of 200ms.
- in `handleSearchTermChange`, we use `debouncedUpdateMovieList` so that the AJAX call will not be invoked if user type again within 200ms. You can adjust the wait time depends on your preference, just be aware that this would impact user experience.

<hr >

## :pencil: Do It: Debounce API Call to Search

1. Include `debounce` in your code and use it in your `App`.
1. Verify that the API calls will only be called after you stop typing.

> [:octocat: `170-debounce-search`](https://github.com/malcolm-kee/react-movie-app/tree/170-debounce-search)

<hr >

[lodash]: https://lodash.com/
[underscore]: https://underscorejs.org/
