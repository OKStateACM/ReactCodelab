# 2. Introduction to React

The [React](https://reactjs.org) library was developed by Facebook. Facebook's site, unsurprisingly, makes a great case study for React's uses.

[![Blank Facebook News Feed](http://www.efoza.com/postpic/2011/06/blank-facebook-news-feed_689538.png)](http://www.efoza.com/post_facebook-news-feed-not-showing_689530/)

Facebook's News Feed is full of posts that all have the same general structure but different content. This *can* be done with just vanilla JavaScript, but React makes that process much more formalized and cleaner.

The core building block of a React web application is the **component**. A component is a class that represents some chunk of the user interface. Components can contain other components, meaning React web applications take on a very nested structure. For instance, a `<NewsFeed/>` component may contain many `<Post/>` components, and those `<Post/>` components may have several `<Comment/>` components. Or we could envision a `<ProfilePage/>` component which contains an `<Avatar/>` component, a `<Bio/>` component, and several `<Post/>` components. An eCommerce platform like Amazon could use this to show a list of products and product details.

In this codelab, we'll be building a very rudimentary news feed web app using some hardcoded "posts."

***

### A Look at `app.js`

Let's start by understanding the general structure of our boilerplate. Take a look at our entry file at [`app.js`](https://github.com/OKStateACM/ReactCodelab/blob/master/react-codelab/app.js):

```js
var React = require('react');
var ReactDOM = require('react-dom');
var list = require('./list.json');

class App extends React.Component {
    render () {
        return (
            <div>
                Hello World!
            </div>
        );
    }
};

ReactDOM.render(<App/>, document.getElementById("app"));
```

In the first two lines,

```js
var React = require('react');
var ReactDOM = require('react-dom');
```

we're importing the `'react'` and `'react-dom'` libraries, which we installed earlier with `npm install --save-dev`. These libraries are imported as modules that we save in `React` and `ReactDOM` respectively.

ReactDOM is a library that converts React components into HTML elements and injects them into the webpage.

```js
var list = require('./list.json')
```

This line imports the JSON array found in our [`list.json`](https://github.com/OKStateACM/ReactCodelab/blob/master/react-codelab/list.json) and saves it in the `list` variable. This array represents our hardcoded news feed data. In a real app, this data is probably something we would have obtained with an HTTP request or something like that.

```js
class App extends React.Component {
    render() {
        // ...
    }
}
```

Here, we're creating a class called `App`, which is a subclass of React's `Component` class. All subclasses of `Component` must implement a `render()` function:

```js
render() {
    return (
        <div>
            Hello World!
        </div>
    );
}
```

Components' `render()` functions return something called [**JSX**](https://reactjs.org/docs/introducing-jsx.html). JSX is a syntax addition to JavaScript that uses XML-like syntax to describe HTML elements (like `<div>`) and React components (like `<App/>`).

```js
ReactDOM.render(<App/>, document.getElementById("app"));
```

With this line, ReactDOM takes an instance of the `App` component class defined just before and, using `App`'s `render()` function, injects HTML elements into the `app` div in [`index.html`](https://github.com/OKStateACM/ReactCodelab/blob/master/react-codelab/index.html).

Only one component should get passed into `ReactDOM.render()`, so as a result, `<App/>` ends up being the root node for the entire web application. If we want our app to include post components, those will have to be children of `<App/>`.
