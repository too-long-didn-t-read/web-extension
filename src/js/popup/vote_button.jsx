import React, { Component } from 'react';

class VoteButton extends Component {
    render() {
        return (
            <i
                onClick={this.props.vote}
                className={
                    `vote-button fa 
                     ${this.props.type === 'up' ? 'fa-arrow-up mr-2' : 'fa-arrow-down'}
                     ${this.props.voted !== null ? 'grey ' : 'black'}
                     ${this.props.voted === 'up' && this.props.type === 'up'  ? 'green' : 'grey'}
                     ${this.props.voted === 'down' &&  this.props.type === 'down' ? 'red' : 'grey'}
                     `
                }
            ></i>
        );
    }
}

export default VoteButton;