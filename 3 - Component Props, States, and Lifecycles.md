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
