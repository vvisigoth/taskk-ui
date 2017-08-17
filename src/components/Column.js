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
  handleDrop(e) {
    e.preventDefault();
    // only allow this if col is empty
    if (!this.props.phase || this.props.phase.length < 1) {
      let st = e.nativeEvent.dataTransfer.getData('text');
      let stParsed = st.split('|');
      const phase = stParsed[0];
      const id = stParsed[1];
      this.props.postMoveIssue(phase, id, this.props.name, 0);
    }
  }
  handleDragOver(e) {
    e.preventDefault();
  }
  renderTiles() {
    if (this.props.phase) 
    { return this.props.phase.map(t => (
      <Tile test draggable="true" key={t.issueId} id={t.issueId} col={this.props.name} lastCol={this.props.last} clearWay={this.clearWay} slideTile={this.slideTile} issueData={t} ref={t.issueId}/>
    ));
    } else {
      return (<div></div>)
    }
  }
  render() {
    return (
      <div className="column">
        <div className="headlet">
          <div className="headlet-container">{this.props.name}</div>
          <div className="add-button" onClick={this.handleClick} >+</div>
        </div>
        <div className={!this.props.phase || this.props.phase.length < 1 ? "nothing col-container" : "something col-container"} onDrop={this.handleDrop} onDragOver={this.handleDragOver}> 
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

