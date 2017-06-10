//The Column is the reflection of a phase

import React, {Component} from 'react';
import Tile from './Tile';
import './Column.css';

class Column extends Component {
  constructor(props) {
    super(props);

    this.renderTiles = this.renderTiles.bind(this);
    this.clearWay = this.clearWay.bind(this);
    this.moveTile = this.moveTile.bind(this);
    this.state = props.colData;
    this.state.tileList = [];
  }
  clearWay(dim, dir) {
    return this.props.clearWay(dim, dir);
  }
  moveTile(t, d) {
    return this.props.moveTile(t, d);
  }
  renderTiles() {
    return this.state.issues.map(t => (
      <Tile key={t.issue} id={t.issue} col={this.props.col} clearWay={this.clearWay} moveTile={this.moveTile} issueData={t} ref={i => {this.state.tileList.push(i)}}/>
    ));
  }
  componentDidUpdate() {
    console.debug('column updated');

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
