var React = require('react');
var ReactDOM = require('react-dom');
var UserList = require('./UserList');

class App extends React.Component {
    render () {
        return (
            <UserList name4="Grace Hopper" name5="Alan Turing"/>
        );
    }
};

ReactDOM.render(<App/>, document.getElementById("app"));
