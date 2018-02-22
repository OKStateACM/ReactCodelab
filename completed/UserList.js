var React = require('react');

class UserList extends React.Component {
    render() {
        return (
            <ul>
                <li>Ada Lovelace</li>
                <li>George Boole</li>
                <li>Konrad Zuse</li>
            </ul>
        )
    }
}

module.exports = UserList;
