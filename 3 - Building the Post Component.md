# 3. Building the `<Post/>` Component

[In the last section,](https://github.com/OKStateACM/ReactCodelab/blob/master/2%20-%20Introduction%20to%20React.md) we discussed what a component is. In this section, we'll get to build a component ourselves. This component will represent a post in our news feed. In our app, posts will have...

* The poster's avatar

* The poster's name, which is a link to their profile

* The content of the post

* Any comments to the post *(We'll get to this later)*

***

### Starting `<Post/>`

Inside your `react-codelab/` directory, create `post.js`.

**`post.js`**

```js
import React from 'react';

class Post extends React.Component {

    render() {
        return (
            <div>
                <img src=""/>
                <h1><a href="">Name goes here!</a></h1>
                <p>Status goes here!</p>
            </div>
        );
    }
}

module.exports = Post;
```

This hits all of the same component notes as `<App/>` in the previous section. It imports `'react'`, it creates a class that extends React's `Component` class, and that class implements a `render()` function that returns some JSX.

Inside `render()`'s JSX, we see an `<img>` tag that we'll use for the avatar, a link inside of a header that we'll use for the poster's name, and a `<p>` tag that we'll use for the status itself.

The last line in our `post.js` file is

```js
module.exports = Post;
```

This exports our `Post` class so that it can be imported and used in another file. Speaking of...

***

### Importing the `<Post/>` Component

Let's now import `<Post/>` in `app.js`:

**`app.js`**

```js
var React = require('react');
var ReactDOM = require('react-dom');
var list = require('./list.json');
var Post = require('./post');
```

We can now use `<Post/>` components. Let's try replacing `<App/>`'s current `render()` function with

```js
render() {
    return (
        <Post/>
    );
}
```

Now run `npm run webpack` in your terminal and refresh your page. If all has gone smoothly, you should see

> # [Name goes here!](#)
> Status goes here!

There won't be any images yet because we haven't defined their source.

***

### Rendering Multiple Posts

With a bit of refactoring, we can get our news feed to show one post for every element in our `list` array:

**`app.js`**

```js
var React = require('react');
var ReactDOM = require('react-dom');
var list = require('./list.json');
var Post = require('./post');

class App extends React.Component {
    render () {
        let feed = [];

        for(var i = 0; i < list.length; i++) {
            let post = <Post/>

            feed.push(post);
        }

        return feed;
    }
};

ReactDOM.render(<App/>, document.getElementById("app"));
```

Run `npm run webpack` in the terminal again and refresh your webpage. You should now have several dummy posts.

Wouldn't it be nice if they *weren't* dummy posts?
