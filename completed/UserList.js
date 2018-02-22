var React = require('react');
var PropTypes = require('prop-types');

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

UserList.propTypes = {
    name4: PropTypes.string.isRequired,
    name5: PropTypes.string.isRequired,
}

module.exports = UserList;
