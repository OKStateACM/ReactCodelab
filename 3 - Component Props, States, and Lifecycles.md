# 3. Component Props, States, and Lifecycles

[In the previous section,](https://github.com/OKStateACM/ReactCodelab/blob/master/2%20-%20React%20Components.md) we created a `<UserList/>` component and injected it into our DOM. However, it's not very dynamic. In this section, we'll explore some features of components that make them very dynamic -- props and state -- and the overall component lifecycle.

### Props

As we put components in components, they naturally take on a kind of hierarchical structure. For instance, in our project right now, the `<App/>` component is our root, and the `<UserList/>` component is its child.

It's sometimes very useful for a parent component to pass information down to a child component via parameters. In the React world, these parameters are called **props**, short for *properties*. Props use XML-style attributes in the JSX. For instance, if you want to pass a `foo` prop with a value of `"Hello"` to your `<MyComponent/>`, you would use:

```js
<MyComponent foo="Hello"/>
```

Instead, let's pass a fourth and fifth name to add to our `UserList`.

**`app.js`**

```js
class App extends React.Component {
    render () {
        return (
            <UserList name4="Grace Hopper" name5="Alan Turing"/>
        );
    }
};
```

We can access these props in our `UserList.js` by `this.props.name4` and `this.props.name5` respectively. To inject a variable into our JSX, just surround the variable with curly braces like `{this.props.name4}`.

Let's add some JSX to add our two new names to the end of the bulleted list.

**`UserList.js`**

```js
class UserList extends React.Component {
    render() {
        return (
            <ul>
                <li>Ada Lovelace</li>
                <li>George Boole</li>
                <li>Konrad Zuse</li>
                <li>{this.props.name4}</li>
                <li>{this.props.name5}</li>
            </ul>
        )
    }
}
```

You can confirm that your props are being passed and injected properly by calling `npm run webpack` and reloading your webpage.

***

### Prop Caveats

As we'll see, React is very particular about its components' lifecycles. One consequence of that is that component props are *immutable* -- once they've been passed to a component, they can't be modified. If you want to modify a prop, you have to scrap the current instance of a component and replace it with a similar instance with the relevant prop(s) changed.

Additionally, we may not want parent components to pass props willy-nilly. It may be very, very important for us to designate certain props as required and to provide some sort of type-checking. React accomplishes this with `propTypes`. A lot more is said about the importance and structure of `propTypes` [here](https://wecodetheweb.com/2015/06/02/why-react-proptypes-are-important/).

For now, we'll just add some simple `propTypes` functionality to require string values for the `name4` and `name5` props:

**`UserList.js`**

```js
var React = require('react');
var PropTypes = require('prop-types');

class UserList extends React.Component {
    // ...
}

UserList.propTypes = {
    name4: PropTypes.string.isRequired,
    name5: PropTypes.string.isRequired,
}

module.exports = UserList;
```

Now if you don't pass string values for both `name4` and `name5`, your webpage throws an error.

***

### Component State

Props are defined by a component's parent and will never change. **State** data is created by the component itself, is local to the component itself, and is expected to change.

State data should be defined in the component's constructor. Because we haven't needed anything beyond the default constructor, we haven't overriden the `constructor()` function yet. Let's do that now:

**`UserList`**

```js
class UserList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: []
        };
    }

    render() {
        // ...
    }
}
```

Notice that the `constructor()` function takes the `props` argument. This is how our component receives its props from the parent component.

We're first calling `super(props);`, which calls the `Component` class's `constructor()` function. Then we define this component's `state` object:

```js
this.state = {
    list: []
};
```

We're giving our state an empty array called `list`. We'll soon refactor our code so that all of the names that will show up in our bulleted list are stored in this `list` array.

If we want to access this state `list` array throughout the rest of `UserList.js`, we can do so using `this.state.list`.

> **NOTE:** This direct `this.state = { ... }` assignment should only ever be done in `constructor()`. This is because React wants to treat all changes to a component's state as an opportunity to re-render the component in the DOM, and it can't do that if you change `this.state` directly. Instead, throughout the rest of the code, you should use [`this.setState()`](https://reactjs.org/docs/react-component.html#setstate) to manipulate the state.

Let's now modify `render()` to load the bulleted list directly from `this.state.list`:

**`UserList.js`**

```js
render() {
    // Converts the this.state.list array to JSX
    return (
        <ul>
            {this.state.list.map((name) => {
                return (<li>{name}</li>);
            })}
        </ul>
    );
}
```

This modified `render()` function makes use of Javascript's array [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function to create a kind of for-loop to generate JSX for each name in `this.state.list`.

***

### Manipulating Component State with `this.setState()`

As mentioned in the above note, we should only use `this.state =` to modify a component's state *in the constructor*. Elsewhere, we should use `this.setState()`.

Let's create an `addToList()` function that calls `setState()`:

**`UserList.js`**

```js
class UserList extends React.Component {

    constructor(props) {
        // ...
    }

    addToList(name) {
        this.setState({
            list: this.state.list.concat(name)
        });
    }

    render() {
        // ...
    }
}
```

`addToList()` takes a `name` parameter. `setState()` takes an object of every state property we want to modify or add. Since we only want to modify `list`, the object we're passing to `setState()` only contains a `list` property. The value of the `list` property is a new array (created by [`concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)) that is identical to the preexisting `list` array but with `name` added to the end.

Since `addToList()` modifies the component's state, calling it will trigger `render()`. In this case, since `render()` reads from `this.state.list`, which has just been modified by `addToList()`, leading to the page being refreshed and our new bullet point at the end.

***

### Cleaning Up After Using Props

At this point, you'll probably want to remove any evidence of us using props, since we won't really need them anymore.

**`app.js`**

```js
class App extends React.Component {
    render () {
        return (
            <UserList/>
        );
    }
};
```

**`UserList.js`**

```js
var React = require('react');

class UserList extends React.Component {
    // ...
}

module.exports = UserList;
```

***

### The Component Lifecycle

We're not currently calling `addToList()` yet, so our page only features an empty list. When would be the best time to call `addToList()`?

If this were a bigger projects with more scripts and components working together, we could imagine some uses for having other components call `<UserList/>`'s `addToList()` function. Instead, we'll have to work with the **component lifecycle**. React's `Component` class provides several **lifecycle methods** that are automatically called at various stages in the component's lifecycle. We can override these functions to add our own functionality.

There are several stages in a component's lifecycle:

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

***

### Making Use of the Component Lifecycle

Let's use the component lifecycle to call `addToList()`. Since we aren't calling `addToList()` in our constructor, and we want our list elements to be rendered once the component has been mounted, this leaves `componentWillMount()`. Let's override that now:

**`UserList.js`**

```js
constructor(props) {
    // ...
}

componentWillMount() {
    this.addToList('Ada Lovelace');
    this.addToList('George Boole');
    this.addToList('Konrad Zuse');
    this.addToList('Grace Hopper');
    this.addToList('Alan Turing');
}

addToList(name) {
    // ...
}
```

Our `componentWillMount()` function will be called between instantiating the `<UserList/>` component and before the `<UserList/>` is inserted into the DOM. It will add these five names to `this.state.list`, which will get rendered as a bulleted list.

Let's test it out! Run

```
npm run webpack
```

and refresh `index.html`. If you see

> * Ada Lovelace
> * George Boole
> * Konrad Zuse
> * Grace Hopper
> * Alan Turing

then you're good to go! If something is wrong, refer to the state of the code below and see if you've done something wrong.

***

### The State of the Code So Far

**`app.js`**

```js
var React = require('react');
var ReactDOM = require('react-dom');
var UserList = require('./UserList');

class App extends React.Component {
    render () {
        return (
            <UserList/>
        );
    }
};

ReactDOM.render(<App/>, document.getElementById("app"));
```

**`UserList.js`**

```js
var React = require('react');

class UserList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: []
        };
    }

    componentWillMount() {
        this.addToList('Ada Lovelace');
    }

    addToList(name) {
        this.setState({
            list: this.state.list.concat(name)
        });
    }

    render() {
        // Converts the this.state.list array to JSX
        return (
            <ul>
                {this.state.list.map((name) => {
                    return (<li>{name}</li>);
                })}
            </ul>
        );
    }
}

module.exports = UserList;
```

***
