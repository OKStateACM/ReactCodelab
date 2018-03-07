# 4. Props

As it stands, our `<Post/>` components don't have any real information in them. Everything is either empty or dummy values. How would our `<Post/>`s get that information? That information would have to be passed down from the `<Posts/>`s' parent component: `<App/>`. Values passed from parent components to children components are called **props**.

### Passing Down Props

Props are passed down using JSX's XML-like syntax. For instance, if `<MyParentComponent/>` wants to pass a `foo` prop with a value of 5 to its `<MyChildComponent/>`, then it could call

```xml
<MyChildComponent foo=5 />
```

If instead `<MyParentComponent/>` wants to pass the contents of the `num` variable as the `foo` prop, it could use JSX's curly bracket syntax:

```xml
<MyChildComponent foo={num} />
```

What information do our `<Post/>` components need from `<App/>`? They need the URL for their posters' avatar, they need their posters' name, they need their posters' unique identifier so that the names can link to the posters' profile, and they need the actual contents of the status. That makes five props:

* `key`, which is required whenever you're injecting a list of child components

* `avatar`, which represents the poster's avatar URL

* `name`, which represents the poster's name

* `user_id`, which could -- in a more complete app -- be used to navigate to the poster's profile page

* `status`, which represents the post contents

Let's add these props in `app.js`:

```js
render () {
    let feed = [];

    for(var i = 0; i < list.length; i++) {
        let post = <Post key={i} avatar={list[i].avatar} user_id={list[i].user_id}
            name={list[i].name} status={list[i].status}/>

        feed.push(post);
    }

    return feed;
}
```

***

### Using Props Inside the Component

Now that `<App/>` has given each `<Post/>` their props, we can use those inside the `<Post/>` component.

If a component is given a `foo` prop, the component can access it by calling `this.props.foo`.

Using this, let's start to implement our props in the `<Post/>` component. Since we're injecting the props' values into our JSX, we'll have to use curly brackets.

**`post.js`**

```js
render() {
    return (
        <div>
            <img src={this.props.avatar}/>
            <h1><a href={`./${this.props.user_id}`}>{this.props.name}</a></h1>
            <p>{this.props.status}</p>
        </div>
    );
}
```

Run `npm run webpack` and refresh. With any luck, each post should now have the actual contents of our JSON file. Clicking on each user's name should take you to a separate (and not yet implemented) page based on their `user_id`. The images should be functional as well.

***

### Applying CSS in JSX

One of the files given to you in the boilerplate was [`style.css`](https://github.com/OKStateACM/ReactCodelab/blob/master/react-codelab/style.css), which has already been imported into [`index.html`](). `style.css` defines a `.post-box` rule that might help make each post its own distinct-looking component:

**`style.css`**

```css
.post-box {
    box-shadow: 0px 0px 20px gray;
    margin: 10px;
    padding: 10px;
    font-family: sans-serif;
}
```

We can apply this to our `<div>` inside `<Post/>`'s `render()` function:

```js
render() {
    return (
        <div>
            <img src={this.props.avatar} className="post-box"/>
            <h1><a href={`./${this.props.user_id}`}>{this.props.name}</a></h1>
            <p>{this.props.status}</p>
        </div>
    );
}
```

Notice that we used the `className` attribute. JSX is not exactly identical to HTML. [Here's why the decision to use `className` over `class` was used.](https://www.quora.com/Why-do-I-have-to-use-className-instead-of-class-in-ReactJs-components-done-in-JSX-JSX-is-preprocessed-so-shouldnt-that-conversion-happen-when-JSX-is-converted-to-JavaScript/answer/Sophie-Alpert-1)

Those avatars are pretty big, aren't they? It'd be nice if we could make them much smaller, and make them inline to the users' names.

```js
render() {
    return (
        <div className="post-box">
            <img src={this.props.avatar} style={{width: 40, height: 40, display: "inline-block"}}/>
            <h1 style={{display: "inline-block"}}><a href={`./${this.props.user_id}`}>{this.props.name}</a></h1>
            <p>{this.props.status}</p>
            <hr/>
            <textarea id="write-comment" className="textarea"/>
            <button>Comment</button>
        </div>
    );
}
```

Notice how JSX treats the `style` attribute instead of using a string like HTML would. The doubled-up curly braces indicate that this is a JSON object (inner braces) being injected into the JSX (outer braces). Each style attribute is a key-value pair in that `style` object. Every CSS attribute that would have included dashes (like `margin-top`, for instance) is instead represented in camelcase (`marginTop`).

Run `npm run webpack` and revel in a slightly better looking news feed!
