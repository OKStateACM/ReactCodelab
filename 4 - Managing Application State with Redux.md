# 4. Managing Application State with Redux

In [sections 2](https://github.com/OKStateACM/ReactCodelab/blob/master/2%20-%20React%20Components.md) and [3](https://github.com/OKStateACM/ReactCodelab/blob/master/3%20-%20Component%20Props%2C%20States%2C%20and%20Lifecycles.md), we've explored how to use React components to dynamically create a front end. Let's switch gears for a bit and talk about Redux.

Where React is all about the front-end, [Redux](https://redux.js.org/) is more about the behind-the-scenes of a web app. Redux creates and manages one single, global state for the entire application called the **store**. The store is envisioned as one large, centralized state tree that stores data for the application as a whole. This data is manipulating by firing (or *dispatching*) **actions**.

***

### Actions and Action Creators

["Actions are payloads of information that send data from your application to your store. They are the only source of information for the store."](https://redux.js.org/basics/actions) In the code, actions are simply objects with the payload included as properties. A string `type` property is required to represent the kind of response we want.

For instance, to define an `'ADD_USER'` action that, when dispatched, will result in adding the name `Richard Stallman` to our list, we would probably have an object that looks something like

```js
{
    type: 'ADD_USER',
    name: 'Richard Stallman'
}
```

An **action creator** is any function that returns an action object. For instance, an `addUser()` action creator that takes a `name` and dispatches a relevant `'ADD_USER'` action might look like:

```js
function addUser(name) {
    return {
        type: 'ADD_USER',
        name: name
    };
}
```
