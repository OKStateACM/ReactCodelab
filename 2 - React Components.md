# 2. React Components

React is a library for building dynamic user interfaces for web applications. We'll use it to dynamically generate our webpage.

#### Components

The basic building block of React is the **component**. If you're familiar with object-oriented programming, the easiest way to think about components is as a class that represents a chunk of the UI.

Let's start by defining a `UserList` component. Create a file in your `react-codelab\` directory called `UserList.js`.

**`UserList.js`**

```js
var React = require('react');

class UserList extends React.Component {
    // TODO: implement
}

module.exports = UserList;
```

This bit of code isn't doing much yet. We're importing the `'react'` library under the alias `React`. Then we create a `UserList` class that extends React's `Component` class. Finally, we export the `UserList` class, which will allow us to import it and use it in our other files.

#### `render()` and ReactDOM

All subclasses of `Component` must implement the `render()` function, which is used to dynamically inject HTML elements into our webpage.

Inside your `UserList` class, implement `render()` like so:

```js
class UserList extends React.Component {
    render() {
        return (
            <ul>
                <li>Ada Lovelace</li>
                <li>George Boole</li>
                <li>Konrad Zuse</li>
            </ul>
        )
    }
}
```

The `render()` function returns some [JSX](https://reactjs.org/docs/introducing-jsx.html). JSX is a syntax extension to JavaScript that uses XML-style syntax to create DOM elements. The HTML tags you may be familiar with have been implemented in JSX -- here we see the `<ul>` and `<li>` tags in use to create a familiar HTML unordered list.

HTML elements aren't the only elements that we can represent in JSX -- we can also represent our own React components using `<UserList/>`. We'll do this next.

The HTML injection of JSX returned by `render()` happens thanks to the [ReactDOM](https://reactjs.org/docs/react-dom.html) library (`'react-dom'`). This library should really only be called/used in your main file.

#### Using `UserList`

Open up [`app.js`](https://github.com/OKStateACM/ReactCodelab/blob/master/react-codelab/app.js). This is your "main" file (notice the `"main": "index.js"` in [`package.json`](https://github.com/OKStateACM/ReactCodelab/blob/master/react-codelab/package.json)). [`index.html`](https://github.com/OKStateACM/ReactCodelab/blob/master/react-codelab/index.html) injects code from `app.js`'s bundled version.

Firstly, we'll need to import our `UserList` class module that we exported in `UserList.js`.

```js
var React = require('react');
var ReactDOM = require('react-dom');
var UserList = require('./UserList');

...
```

Then let's replace the

```html
<div>
    Hello World!
</div>
```

JSX with our own `UserList` component:

```js
class App extends React.Component {
    render () {
        return (
            <UserList/>
        );
    }
};
```

#### Seeing the Fruits of Our Labor Thus Far

We've written a `UserList` component class, and we've injected it into the DOM. Let's test it out to see it in action.

In your terminal, bundle your project with Webpack.

```
npm run webpack
```

Open up `index.html` in your web browser. With any luck, you should see

> * Ada Lovelace
> * George Boole
> * Konrad Zuse
