//The Column is the reflection of a phase

import React, {Component} from 'react';
import Tile from './Tile';
import './Column.css';

class Column extends Component {
  constructor(props) {
    super(props);

    this.renderTiles = this.renderTiles.bind(this);
    this.clearWay = this.clearWay.bind(this);
    this.slideTile = this.slideTile.bind(this);
    this.state = props.colData;
    this.state.tileList = [];
    this.insertTile = this.insertTile.bind(this);
    this.removeTile = this.removeTile.bind(this);
  }
  clearWay(dim, dir) {
    return this.props.clearWay(dim, dir);
  }
  slideTile(t, d) {
    return this.props.slideTile(t, d);
  }
  renderTiles() {
    return this.props.colData.map(t => (
      <Tile draggable="true" key={t.issueId} id={t.issueId} col={this.props.name} clearWay={this.clearWay} slideTile={this.slideTile} issueData={t} ref={t.issueId}/>
    ));
  }
  componentDidUpdate() {
    console.debug('update');
    console.debug(this.props.colData);
  }
  //inserts a new tile before a tile with the given id
  //if beforeId undefined, inserts at top
  insertTile(issueObj, beforeId) {
    let insertIndex = 0;

    this.state.issues.forEach((v, i) => {if(beforeId == v.issue) {
      insertIndex = i;
    }})


    let newIssues = [...this.state.issues];
    newIssues.splice(insertIndex, 0, issueObj);
    this.setState({ issues: newIssues});
  }
  removeTile(tileId) {
    let removeIndex = 0;
    this.state.issues.forEach((v, i) => {if(tileId == v.issue) {
      removeIndex = i;
    }})
    let newIssues = [...this.state.issues];
    newIssues.splice(removeIndex, 1);
    this.setState({ issues: newIssues});
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
