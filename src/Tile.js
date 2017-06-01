//The Tile is the basic reflection of the Issue

import React, {Component} from 'react';

class Tile extends Component {
	render() {
		return (
			<div className="tile"> 
				<div className="tile-container"> 
					<input className="title" type="text" value={this.title}/> 
					<input className="author" type="text" value={this.author}/> 
				</div> 
				<div className="indicator"></div> 
				<textarea className="description">{this.description}</textarea> 
				<input className="assignee" type="text" value={this.assignee}/> 
				<input className="submit" type="submit" onClick={this.submitChanges}/> 
			</div>
		);
	}		
};

export default Tile
