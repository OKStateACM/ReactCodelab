# 1. Getting Started

In this section, we'll copy our boilerplate resources and install any dependency libraries our project needs.

***

#### Installing Node

If you haven't done so already, install Node and npm by going to [nodejs.org](https://nodejs.org/en/).

You can confirm that Node and npm are installed by going into your terminal and giving the command

```
node -v
```

If you get a version number in response, you're good to go!

***

#### Grabbing the Boilerplate

This codelab makes use of a few libraries like Babel and Webpack that require some configuration that we don't have time to get into today. [I used this reference to get started, if you're interested.](http://ccoenraets.github.io/es6-tutorial-react/setup/) Instead, I've created a boilerplate React/Redux project with that configuration predone.

To get the boilerplate, you'll need a local copy of this repository. You can get that one of two ways:

* If you're familiar with Git, you can clone the repo with `git clone git@github.com:OKStateACM/ReactCodelab.git`

* If you're not familiar with Git, you can download a ZIP of the repo by going [here](https://github.com/OKStateACM/ReactCodelab), clicking the green **Clone or download** button, and then clicking the **Download ZIP** button ![Demonstration of downloading a ZIP of the repo from GitHub](http://i.imgur.com/5Ja4SFt.png)

Once you have the local copy of the repository, navigate inside it and drag the `react-codelab\` folder someplace accessible like your Desktop. This `react-codelab\` directory will be your workspace for this codelab.

***

#### Installing Dependencies

Inside your terminal, navigate into your `react-codelab\` workspace. Once there, call

```
npm install --save-dev
```

This will install all of the development dependency packages.

***

#### Testing Webpack

This codelab, and most React projects, will use a build tool called [Webpack](https://blog.andrewray.me/webpack-when-to-use-and-why/). Webpack is a module bundler, and it's used to efficiently load dependencies and assets into your project. We've already predefined your Webpack configurations in [`webpack.config.js`](https://github.com/OKStateACM/ReactCodelab/blob/master/react-codelab/webpack.config.js).

Our boilerplate defines one script in [`package.json`](https://github.com/OKStateACM/ReactCodelab/blob/master/react-codelab/package.json) for calling Webpack to build your project:

```
npm run webpack
```

After issuing the above command, open up the given `index.html` file in your web browser. If you've done all of the above steps correctly, you should have a webpage that simply reads:

> Hello World!

If you have that, you're good to go!

<br/>

###### [2. React »](https://github.com/OKStateACM/ReactCodelab/blob/master/2%20-%20React%20Components.md)
