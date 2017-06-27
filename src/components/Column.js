//The Column is the reflection of a phase

import React, {Component} from 'react';

import { connect } from 'react-redux';
import Tile from './Tile';
import './Column.css';
import { postCreateIssue, postMoveIssue, createIssue } from '../actions/actions';

import { defaultIssue } from '../utils';

const mapStateToProps = (state, ownProps) => {

  return {
    phase: state.board[ownProps.name]
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createIssue: (phase, issueObj) => dispatch(createIssue(phase, issueObj)),
    postCreateIssue: (phase, issueObj) => dispatch(postCreateIssue(phase, issueObj)),
    postMoveIssue: (sourcePhase, sourceId, targetPhase, targetId) => dispatch(postMoveIssue(sourcePhase, sourceId, targetPhase, targetId))
  }
};

class Column extends Component {
  constructor(props) {
    super(props);

    this.renderTiles = this.renderTiles.bind(this);
    this.clearWay = this.clearWay.bind(this);
    this.slideTile = this.slideTile.bind(this);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }
  handleClick() {
    this.props.postCreateIssue(this.props.name, defaultIssue);
  }
  clearWay(dim, dir) {
    return this.props.clearWay(dim, dir);
  }
  slideTile(t, d) {
    return this.props.slideTile(t, d);
  }
  renderTiles() {
    return this.props.phase.map(t => (
      <Tile draggable="true" key={t.issueId} id={t.issueId} col={this.props.name} clearWay={this.clearWay} slideTile={this.slideTile} issueData={t} ref={t.issueId}/>
    ));
  }
  render() {
    return (
      <div className="column">
        <div className="headlet">
          <div className="headlet-container">{this.props.name}</div>
          <div className="add-button" onClick={this.handleClick} >+</div>
        </div>
        <div className="col-container" >
          {this.renderTiles()}
        </div>
      </div>
    );
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true}
)(Column);

