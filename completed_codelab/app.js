var React = require('react');
var ReactDOM = require('react-dom');
var list = require('./list.json');
var Post = require('./post');

class App extends React.Component {
    render () {
        let feed = [];

        for(var i = 0; i < list.length; i++) {
            let post = <Post key={i} avatar={list[i].avatar} user_id={list[i].user_id}
                name={list[i].name} status={list[i].status}/>

            feed.push(post);
        }

        return feed;
    }
};

ReactDOM.render(<App/>, document.getElementById("app"));
