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
        this.addToList('George Boole');
        this.addToList('Konrad Zuse');
        this.addToList('Grace Hopper');
        this.addToList('Alan Turing');
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
