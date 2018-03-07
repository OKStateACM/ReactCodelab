import React from 'react';

class Post extends React.Component {

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
}

module.exports = Post;
