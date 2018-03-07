# 5. State and Lifecycles

At this point, our site is a glorified list. It isn't interactive in any way. In this section, we'll add a commenting feature to our news feed. Along the way, we'll discuss a component's state and its lifecycle.

***

### Adding the Necessary HTML Elements

To add commenting to our news feed, each post will need a comment section, a field to enter your comment in, and a button to submit your comment:

**`post.js`**

```js
import React from 'react';

let field_id;

class Post extends React.Component {
    render() {
        field_id = "field" + this.props.id;
        return (
            <div className="post-box">
                <img src={this.props.avatar} style={{width: 40, height: 40, display: "inline-block"}}/>
                <h1 style={{display: "inline-block"}}><a href={`./${this.props.user_id}`}>{this.props.name}</a></h1>
                <p>{this.props.status}</p>
                <hr/>
                <textarea id={field_id} className="textarea"/>
                <button>Comment</button>
            </div>
        );
    }
}

module.exports = Post;

```

Here, we're taking advantage of the `id` prop we've passed our `<Post/>`. Soon we'll want to target our textarea to process comments, but it's easiest to do that if each textarea on the page has its own unique identifier. We used `id` because we as developers don't really have access to the `key` prop. When I tried using `this.props.key` instead of `this.props.id`, I got `undefined` instead of a number.

***

### Component State

React components can store and access information in two different ways. The first way was discussed [in the previous section](https://github.com/OKStateACM/ReactCodelab/blob/master/4%20-%20Props.md): props. Props are passed down from parent to child, so they don't make for great local variable storage.

The second way is designed for local variable storage: the component's **state**. The state is a JavaScript object - so a set of key-value pairs - local to the component.

We can add key-value pairs to the state at any time, but it's customary to add them in the component's `constructor()` function.

**`post.js`**

```js
class Post extends React.Component {

    constructor(props) {
        super(props);
        let id = "field" + this.props.id;
        this.state = {
            comments: [],
            field_id: id
        }
    }

    render() {
        // ...
    }
}
```

> **NOTE:** `constructor()` is the *only* time you should ever set `this.state` directly like this. Elsewhere, you should always use `this.setState()`, which we cover further down.

This code stores a `comments` array in `this.state`. If we ever want to access `comments`, we can use `this.state.comments`. We'll want to modify the component's state whenever it receives a new comment. This code also stores our `field_id`, since soon enough, we'll want to use it across `<Post/>`. Let's go ahead and refactor `render()` to account for this new placement of `field_id`:

**`post.js`**

```js
render() {
    return (
        <div className="post-box">
            <img src={this.props.avatar} style={{width: 40, height: 40, display: "inline-block"}}/>
            <h1 style={{display: "inline-block"}}><a href={`./${this.props.user_id}`}>{this.props.name}</a></h1>
            <p>{this.props.status}</p>
            <hr/>
            <textarea id={this.state.field_id} type="text" className="textarea"/>
            <button>Comment</button>
        </div>
    );
}
```

We want to access the textarea, but it's not actually created for us until `render()`. So when can we access it?

***

### The Component Lifecycle

React provides some functions, called **lifecycle methods**, that are automatically called on each component at various stages of the component being inserted into the page, being updated, and being removed from the page. We've already worked with two of these: `constructor()` and `render()`.

There are three stages in the component lifecycle:

* **Mounting:** The process of initializing a component and inserting it into the DOM

    * [`constructor(props)`](https://reactjs.org/docs/react-component.html#constructor) -- instantiates a component with the given props

        * Useful for setting the component's initial state

    * [`componentWillMount()`](https://reactjs.org/docs/react-component.html#componentwillmount) -- called right before the component is inserted into the DOM

        * Not used terribly often, since anything you can do in `componentWillMount()`, you could probably do in `constructor()`.

    * [`render()`](https://reactjs.org/docs/react-component.html#render) -- returns the JSX to be injected into the DOM

        * Implementing this function is required.

        * **Cannot** modify state!

    * [`componentDidMount()`](https://reactjs.org/docs/react-component.html#componentdidmount) -- called right after the component has been inserted into the DOM

        * Useful if you need to use any DOM nodes once they've been initialized.

* **Updating:** The process of re-rendering a component after modifying its props or state.

    * [`componentWillReceiveProps(nextProps)`](https://reactjs.org/docs/react-component.html#componentwillreceiveprops) -- called before a component's props are (potentially) modified

        * Useful if you want the component state to change to prepare for the new props

    * [`shouldComponentUpdate(nextProps, nextState)`](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) -- evaluates, given the new props and state, whether the component should even re-render at all

        * If this function returns `false`, the component lifecycle will skip `componentWillUpdate()`, `render()`, and `componentDidUpdate()`.

        * Unless you know what you're doing, it's probably best to keep this as default behavior.

    * [`componentWillUpdate(nextProps, nextState)`](https://reactjs.org/docs/react-component.html#componentwillupdate) -- called right before the component is re-rendered

        * `nextProps` and `nextState` are useful to compare to `this.props` and `this.state`.

    * [`render()`](https://reactjs.org/docs/react-component.html#render) -- returns the JSX to be injected into the DOM

        * Implementing this function is required.

        * **Cannot** modify state!

    * [`componentDidUpdate(prevProps, prevState)`](https://reactjs.org/docs/react-component.html#componentdidupdate) -- called right after the component has been re-rendered

        * Can be good for manipulating the DOM following a re-render.

        * `prevProps` and `prevState` can be used to compare to `this.props` and `this.state`.

* **Unmounting:** The process of removing a component from the DOM

    * [`componentWillUnmount()`](https://reactjs.org/docs/react-component.html#componentwillunmount) -- called right before a component is removed from the DOM

        * Useful for any cleanup like cancelling outstanding requests.

Since we want to get access to our textbox the first time it's created (we'd rather not wait for an update), but we need to wait until after the component is rendered, this leaves us one choice: `componentDidMount()`.

**`post.js`**

```js
class Post extends React.Component {

    constructor(props) {
        // ...
    }

    componentDidMount() {
        this.commentBox = document.getElementById(this.state.field_id);
    }

    render() {
        // ...
    }
}
```

This code means that after the component has been rendered, `componentDidMount()` will be called, and the post's commenting textbox will be saved as `this.commentBox`. We're saving it as a `this.<something>` value instead of a state variable because our textbox isn't really going to be a changing value, and it won't force the component to re-render. For more information about when to use props, state, or simply `this`, go [here](https://medium.freecodecamp.org/where-do-i-belong-a-guide-to-saving-react-component-data-in-state-store-static-and-this-c49b335e2a00).

***

### Modifying State

Whenever a post's *Comment* button is pressed, we should add the contents of the post's commenting textbox to the post.

Let's start by creating a new function, `submitComment()`, to be invoked whenever the button is pressed:

**`post.js`**

```js
class Post extends React.Component {

    constructor(props) {
        // ...
    }

    componentDidMount() {
        // ...
    }

    submitComment(event) {
        this.setState({
            comments: [...this.state.comments, this.commentBox.value]
        });
    }

    render() {
        // ...
    }
}
```

Notice that, since we're not in `constructor()`, we have to call `this.setState()` to modify the state. `this.setState()` takes a JSON object as a parameter. This JSON object has key-value pairs for any state variables you want to modify. Since we only want to modify `this.state.comments`, `comments` is the only attribute in the object this time. The value of `comments` is an array:

```js
[...this.state.comments, this.commentBox.value]
```

This uses [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_array_literals) to create a new array filled with all of the contents of the previous `this.state.comments` array, just with our current comment box value added to the end.

Now we make sure we can call this `submitComment()` function. Inside React components, context gets really, *really* weird. As a result, whenever you create a new function like this, you have to **bind** it in the constructor:

**`post.js`**

```js
constructor(props) {
    super(props);
    let id = "field" + this.props.id;
    this.state = {
        comments: [],
        field_id: id
    }
    this.submitComment = this.submitComment.bind(this);
}
```

For more information about binding in React, go [here](http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/).

Now that we've bound `submitComment()`'s context, we can make our button call it every time it gets clicked. In your `render()` function, pass `this.submitComment` as the button's `onClick` attribute:

**`post.js`**

```js
render() {
    return (
        <div className="post-box">
            <img src={this.props.avatar} style={{width: 40, height: 40, display: "inline-block"}}/>
            <h1 style={{display: "inline-block"}}><a href={`./${this.props.user_id}`}>{this.props.name}</a></h1>
            <p>{this.props.status}</p>
            <hr/>
            <textarea id={this.state.field_id} type="text" className="textarea"/>
            <button onClick={this.submitComment}>Comment</button>
        </div>
    );
}
```

Notice that we're specifically using `this.submitComment` and not `submitComment`. Also, there aren't parentheses because we want to pass the actual `submitComment()` function itself, and not its return value.

Also bear in mind that in an actual web application, this function would be a little more intricate. It would probably alert the app's server through a request to its API or something.

***

### Displaying Comments

Every time the state is modified, it goes through the updating process of its lifecycle, which will generally lead to `render()` being called again. This is great for us, since it gives us a way to easily update the interface to new comments, so long as we can inject the JSX representation of each comment of `this.state.comments`.

Let's create a new function called `displayComments()`. This will iterate over `this.state.comments` and create and return an array of JSX elements representing the comments.

**`post.js`**

```js
import React from 'react';

class Post extends React.Component {

    constructor(props) {
        super(props);
        let id = "field" + this.props.id;
        this.state = {
            comments: [],
            field_id: id
        }
        this.submitComment = this.submitComment.bind(this);
        this.displayComments = this.displayComments.bind(this);
    }

    componentDidMount() {
        // ...
    }

    submitComment(event) {
        // ...
    }

    displayComments() {
        let commentBlock = [];
        for(var i = 0; i < this.state.comments.length; i++) {
            let comment = <p>{this.state.comments[i]}</p>;
            commentBlock.push(comment);
        }
        return commentBlock;
    }

    render() {
        // ,,,
    }
}
```

Since we now have a way to get an array of JSX elements, we can just directly inject that into `render()`:

**`post.js`**

```js
render() {
    return (
        <div className="post-box">
            <img src={this.props.avatar} style={{width: 40, height: 40, display: "inline-block"}}/>
            <h1 style={{display: "inline-block"}}><a href={`./${this.props.user_id}`}>{this.props.name}</a></h1>
            <p>{this.props.status}</p>
            <hr/>
            {this.displayComments()}
            <textarea id={this.state.field_id} type="text" className="textarea"/>
            <button onClick={this.submitComment}>Comment</button>
        </div>
    );
}
```

Now whenever the component's state is updated with the new comment, `render()` will call `displayComments()` to get the newest array of comment JSX elements.

If you run `npm run webpack` and refresh, you'll see that you should now be able to add comments! You'll probably get errors about the key not being defined, but it should otherwise be functional.
