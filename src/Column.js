//The Column is the reflection of a phase

import React, {Component} from 'react';
import Tile from './Tile';
import './Column.css';

class Column extends Component {
  constructor(props) {
    super(props);

    this.renderTiles = this.renderTiles.bind(this);
    this.findNeighbor = this.findNeighbor.bind(this);
    this.state = props.colData;
    this.state.tileList = [];
  }
  findNeighbor(dim, dir) {
    return this.props.findNeighbor(dim, dir);
  }
  renderTiles() {
    const marginTop = 0;
    return this.state.issues.map(t => (
      <Tile key={t.issue} findNeighbor={this.findNeighbor} issueData={t} bumpAmt={ marginTop } ref={i => {this.state.tileList.push(i)}}/>
    ));
  }
  render() {
    return (
      <div className="column">
        <div className="headlet">
          <div className="headlet-container">{this.state.name}</div>
          <div className="add-button">+</div>
        </div>
        <div className="col-container">
          {this.renderTiles()}
        </div>
      </div>
    );
  }
};

export default Column
