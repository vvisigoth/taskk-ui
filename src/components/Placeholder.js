//The Placeholder is the basic reflection of the Issue

import React, {Component} from 'react';
import { connect } from 'react-redux';

import { postMoveIssue, postUpdateIssue, updateIssue, deleteIssue } from '../actions/actions';

import './Placeholder.css';

const mapStateToProps = (state, ownProps) => {
  let is;
  state.board[ownProps.col].forEach(function(v) {
    if (v.issueId === ownProps.id) {
      is = v;
    };
  });
  return {
    issue: is
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateIssue: (issueId, issueObj) => dispatch(updateIssue(issueId, issueObj)),
    postUpdateIssue: (issueId, issueObj) => dispatch(postUpdateIssue(issueId, issueObj)),
    postMoveIssue: (sourcePhase, sourceId, targetPhase, targetId) => dispatch(postMoveIssue(sourcePhase, sourceId, targetPhase, targetId)),
    deleteIssue: (issueId) => dispatch(deleteIssue(issueId))
  }
};

class Placeholder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.bumpAmt = 0;
    this.state.ogMarg = 0;
    this.state.bumped = false;
    this.state.dimensions = { width: -1, height: -1 };
    this.clearWay = this.clearWay.bind(this);
    this.measureTile = this.measureTile.bind(this);
    this.bump = this.bump.bind(this);
    this.unBump = this.unBump.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }

  handleDragOver(e) {
    e.preventDefault();
    // put some sort of indicator here
  };

  handleDrag(e) {
  };

  handleDrop(e) {
    e.preventDefault();
    let st = e.nativeEvent.dataTransfer.getData('text');
    let stParsed = st.split('|');
    const phase = stParsed[0];
    const id = stParsed[1];
    this.props.postMoveIssue(phase, id, this.props.col, this.props.id);
  }

  handleDragStart(e) {
    e.nativeEvent.dataTransfer.setData('text', this.props.col + '|' + this.props.id);
  };

  unBump() {
    this.setState({bumpAmt: 0});
    this.setState({bumped: false});
  }

  bump(amount) {
    //this.setState({ogMarg: this.state.bumpAmt});
    this.setState({bumpAmt: amount});
    this.setState({bumped: true});
  }

  clearWay(dim, dir) {
    return this.props.clearWay(dim, dir);
  }

  slideTile(t, d) {
    return this.props.slideTile(t, d);
  }
  componentDidMount() {
    this.measureTile();
  }

  contract() {
    this.setState({ expanded: false });
  }
  measureTile() {
    let rect = this.refs.tile.getBoundingClientRect();
    this.state.dimensions =
          {
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
            width: rect.width,
            height: rect.height
          };
  }

  render() {
    return (
      <div ref='tile' className="placeholder" draggable="false" onDragStart={this.handleDragStart} onDragOver={this.handleDragOver} onDrop={this.handleDrop} style={{ marginTop: this.state.bumpAmt}} > 
      </div>
    );
  }       
};

export default connect(
  null,
  mapDispatchToProps,
  null,
  {
    withRef: true
  }
)(Placeholder);
