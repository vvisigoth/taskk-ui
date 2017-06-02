//The Tile is the basic reflection of the Issue

import React, {Component} from 'react';

class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = props.issueData;
        this.submitChanges = this.submitChanges.bind(this);
    }
    submitChanges() {
        return;
    }
	render() {
		return (
			<div className="tile"> 
				<div className="tile-container"> 
					<input className="title" type="text" value={this.state.title}/> 
					<input className="author" type="text" value={this.state.author}/> 
				</div> 
				<div className="indicator"></div> 
				<textarea className="description" value={this.state.description}></textarea> 
				<input className="assignee" type="text" value={this.state.assignee}/> 
				<input className="submit" type="submit" onClick={this.submitChanges()}/> 
			</div>
		);
	}		
};

export default Tile
