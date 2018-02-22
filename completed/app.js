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
