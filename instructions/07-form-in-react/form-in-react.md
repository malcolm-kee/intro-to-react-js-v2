---
title: Form in React
path: '/form-in-react'
description: 'Learn how to implements a simple form in React'
---

# Form in React

This section will be covered if we have additional time during the workshop.

## Allow User to Create Movie

It would be nice if our users can create a movie themselves.

### Prerequisite: API Service for Create Movie

Before you can allow user to create movie, first of all the backend API Service must be able to support that.

Luckily our movies API support that. To able to create a movie, install this [Restlet Client][restlet-client], which is a Chrome extension to allow you to make API calls.

After the extension is installed,

1. open the extension by clicking the icon
1. select "POST" in the METHOD dropdown.
1. enter the following URL in the URL bar:
   ```
   https://react-intro-movies.herokuapp.com/movies
   ```
1. add the following content in the BODY field (change it to your favourite movie):
   ```json
   {
     "name": "More Than Blue",
     "releaseDate": "2018-12-27"
   }
   ```
1. click send

![screenshot of Restlet Client](restlet-client.png)

Now when you load your app, you should be see your movie is added.

### Add Ajax Call Function to Make the POST Request

Now that we know the actual AJAX call works by using tools, let's proceed to do that with our code.

Create a `createMovie` function in `api.js` that will make the request

```js
export const createMovie = movie =>
  axios
    .post('https://react-intro-movies.herokuapp.com/movies', movie)
    .then(res => res.data);
```

- axios allows you to makes API call with specific method, e.g. `get`, `post`, `put` etc., corresponding to our REST call methods.
- the second parameter of `axios.post` is the body of the data that you want to submit.

### Create Form Component

Now that we have function to make the API call, let's create the form component.

Add a file `movie-form.js` with the following content:

```jsx
// src/movie-form.js
import React from 'react';
import { createMovie } from './api';

export const MovieForm = () => {
  const [name, setName] = React.useState('');
  const [releaseDate, setReleaseDate] = React.useState('');

  const handleSubmit = ev => {
    ev.preventDefault();
    createMovie(values).then(() => {
      setName('');
      setReleaseDate('');
    });
  };

  return (
    <div className="movie-form">
      <form onSubmit={handleSubmit}>
        <legend>Create Movie</legend>
        <div className="field">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            className="input"
            value={name}
            id="name"
            name="name"
            onChange={ev => setName(ev.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="releaseDate" className="label">
            Release Date
          </label>
          <input
            className="input"
            value={releaseDate}
            id="releaseDate"
            name="releaseDate"
            type="date"
            onChange={ev => setReleaseDate(ev.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
```

- we declare two states: `name` and `releaseDate` for the 2 values for the form.
- the state value is passed to the `value` attribute of the input, while the state setter is called in the `onChange` callback.
- we define a `handleSubmit` function, which will be passed to `onSubmit` props of the form element. When form is submitted, we will call `createForm` with the state. We call `event.preventDefault` because by default form submission will cause a page refresh, and we doesn't want that.

### Add MovieForm Into App

Now import `MovieForm` and include it in `App` component:

```jsx
import { MovieForm } from './movie-form';

function App() {
  const [moviesShown, toggleShowMovies] = useToggle(false);
  const { movies, isLoading } = useMovieData();

  return (
    <div>
      <TitleBar>
        <h1>React Movie App</h1>
      </TitleBar>
      <div className="container">
        <div>
          <div className="button-container">
            <Button onClick={toggleShowMovies}>
              {moviesShown ? 'Hide' : 'Show'} Movies
            </Button>
          </div>
          {moviesShown && (
            <BusyContainer isLoading={isLoading}>
              {movies.map(movie => (
                <Movie
                  name={movie.name}
                  releaseDate={movie.releaseDate}
                  key={movie.id}
                />
              ))}
            </BusyContainer>
          )}
        </div>
      </div>
      <div>
        <MovieForm />
      </div>
    </div>
  );
}
```

Now try to use the form, you can see the page is making the AJAX call, and after you refresh the page, the new movie will be there!

### Refresh Movie List after Submission

Currently the movie list is not updated after you create the new movie, which is a bug.
Therefore, we need to somehow let me `App` component know that the `MovieForm` has created a record, and it should refresh the list.
We can achieve this by passing a callback from `App` to `MovieForm`.

### Error Handling for Form Submission

To Be Continued

[restlet-client]: https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm?hl=en
