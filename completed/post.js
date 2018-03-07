import React from 'react';

class Post extends React.Component {

    constructor(props) {
        super(props);
        let id = "field" + this.props.id;
        this.state = {
            comments: [],
            field_id: id
        }
        this.submitComment = this.submitComment.bind(this);
        this.displayComments = this.displayComments.bind(this);
    }

    componentDidMount() {
        this.commentBox = document.getElementById(this.state.field_id);
    }

    submitComment(event) {
        this.setState({
            comments: [...this.state.comments, this.commentBox.value]
        });
    }

    displayComments() {
        let commentBlock = [];
        for(var i = 0; i < this.state.comments.length; i++) {
            let comment = <p>{this.state.comments[i]}</p>;
            commentBlock.push(comment);
        }
        return commentBlock;
    }

    render() {
        return (
            <div className="post-box">
                <img src={this.props.avatar} style={{width: 40, height: 40, display: "inline-block"}}/>
                <h1 style={{display: "inline-block"}}><a href={`./${this.props.user_id}`}>{this.props.name}</a></h1>
                <p>{this.props.status}</p>
                <hr/>
                {this.displayComments()}
                <textarea id={this.state.field_id} type="text" className="textarea"/>
                <button onClick={this.submitComment}>Comment</button>
            </div>
        );
    }
}

module.exports = Post;
