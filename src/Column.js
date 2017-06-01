//The Column is the reflection of a phase

import React, {Component} from 'react';
import Tile from './Tile';

class Column extends Component {
	constructor(props) {
		super(props);
		this.renderTiles = this.renderTiles.bind(this);
		this.state = { tiles: [0, 1, 2] };
	}
	renderTiles() {
		return this.state.tiles.map(t => (
			<Tile key={t}/>
		));
	}
	render() {
		return (
			<div className="column">
				{this.renderTiles()}
			</div>
		);
	}
};

export default Column
