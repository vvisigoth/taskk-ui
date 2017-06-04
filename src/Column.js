//The Column is the reflection of a phase

import React, {Component} from 'react';
import Tile from './Tile';
import './Column.css';

class Column extends Component {
  constructor(props) {
    super(props);

    this.renderTiles = this.renderTiles.bind(this);
    this.state = props.colData
  }
  renderTiles() {
    const marginTop = 0;
    return this.state.issues.map(t => (
      <Tile key={t.issue} issueData={t} bumpAmt={ marginTop }/>
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
