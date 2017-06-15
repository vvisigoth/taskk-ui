//The Column is the reflection of a phase

import React, {Component} from 'react';

import { connect } from 'react-redux';
import Tile from './Tile';
import './Column.css';

import defaultIssue from './utils';

const mapStateToProps = (state, ownProps) => {
  return {
    phase: state.board[ownProps.name]
  }
};

const mapDispatchToProps = dispatch => {
  return {
    newIssue: (phase, issueObj) => dispatch({
      type: 'CREATE_ISSUE',
      phase,
      issueObj
    }),
    testDispatch: (a) => dispatch({
      type: 'TEST_ACTION',
      testString: a
    })
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
  }
  handleClick() {
    this.props.newIssue(this.props.name, defaultIssue);
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
  componentDidMount() {
    this.props.testDispatch('test string');
  }
  componentDidUpdate() {
  }
  render() {
    return (
      <div className="column">
        <div className="headlet">
          <div className="headlet-container">{this.props.name}</div>
          <div className="add-button" onClick={this.handleClick} >+</div>
        </div>
        <div className="col-container">
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

