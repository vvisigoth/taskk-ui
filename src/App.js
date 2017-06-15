import React, { Component } from 'react';
import { connect } from 'react-redux';

import Column from './Column';
import './App.css';
import './Tile.css';

const clone = function(obj) {
  let newObj = {};
  Object.keys(obj).forEach(k => { newObj[k] = obj[k] });
  return newObj
}

const colOrder = ['todo', 'doin', 'show', 'done'];

const destCol = function(sourceCol, dir) {
  if ((colOrder.indexOf(sourceCol) === 0 && dir === 'left') || (colOrder.indexOf(sourceCol) === 3 && dir === 'right')) {
    return sourceCol;
  }
  else if (dir === 'right') {
    return colOrder[colOrder.indexOf(sourceCol) + 1];
  } else if (dir === 'left') {
    return colOrder[colOrder.indexOf(sourceCol) - 1];
  }
}

const mapStateToProps = state => {
  return {
    board: state.board
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createIssue: (phase) => dispatch({
      type: 'CREATE_ISSUE',
      phase: phase
    })
  }
};

class App extends Component{
  constructor(props) {
    super(props);

    this.renderColumns = this.renderColumns.bind(this);
    this.state = {};
    this.state.showGhost = false;
    this.findNeighbor = this.findNeighbor.bind(this);
    this.findTile = this.findTile.bind(this);
    this.intersectRect = this.intersectRect.bind(this);
    this.clearWay = this.clearWay.bind(this);
    this.unBump = this.unBump.bind(this);
    this.contractAll = this.contractAll.bind(this);
    this.slideTile = this.slideTile.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.ptToTile = this.ptToTile.bind(this);
    this.dragging = this.dragging.bind(this);
  }

  slideTile(tile, dir) {
    let dc = destCol(tile.props.col, dir);
    let tmpIssueObj = clone(tile.state.issueData);
    let destTile = this.findNeighbor(tile, dir);

    this.refs[tile.props.col].removeTile(tile.props.id);
    this.refs[dc].insertTile(tmpIssueObj, destTile[0].props.id);
  }

  ptToTile(x, y) {
    var inter = [];
    var dimen = {top: y, bottom: y, left: x, right: x};

    Object.keys(this.refs).forEach(c => { Object.keys(this.refs[c].refs).map( t => { if (this.intersectRect(dimen, this.refs[c].refs[t].state.dimensions)) { inter.push(this.refs[c].refs[t])} })});

    return inter[0];
  }

  dragStart(e) {
    e.preventDefault();
    let t = this.ptToTile(e.clientX, e.clientY);
    this.setState({ tempTileId: t.props.id, tempTileCol: t.props.col, tempIssueObj: clone(t.state.issueData)});
    this.setState({showGhost: true});
  }

  dragEnd(e) {
    e.preventDefault();
    let t = this.ptToTile(e.clientX, e.clientY);
    this.refs[this.state.tempTileCol].removeTile(this.state.tempTileId);
    this.refs[t.props.col].insertTile(this.state.tempIssueObj, t.props.id);
    this.setState({showGhost: false});
  }

  dragging(e) {
    this.setState({ ghostStyle: { top: e.clientY + 'px', left: e.clientX + 'px'}});
  }

  intersectRect(r1, r2) {
    return !(r2.left > r1.right || 
      r2.right < r1.left || 
      r2.top > r1.bottom ||
      r2.bottom < r1.top);
  }

  findTile(key) {
    var a;
    this.state.columnList.forEach(c => { c.state.tileList.map( t => { if (t.props.issueData.issue === key) {a = t} })});
    return a
  }

  findNeighbor(eventTile, dir) {

    // shallow copy for reference
    let dim = eventTile.state.dimensions;

    // needed to make a deep copy here
    let dimen = {
      top: dim.top,
      right: dim.right,
      bottom: dim.bottom,
      left: dim.left,
      width: dim.width,
      height: dim.height
    }

    if (dir == 'left') {
      dimen.top = dimen.top + 40;
      dimen.bottom = dimen.bottom - 40;
      dimen.left = dimen.left - (dimen.width - 40);
      dimen.right = dimen.right - (dimen.width + 40);
    } else if (dir == 'right') {
      dimen.top = dimen.top + 40;
      dimen.bottom = dimen.bottom - 40;
      dimen.left = dimen.left + (dimen.width + 40);
      dimen.right = dimen.right + (dimen.width - 40);
    } else if (dir == 'up') {
      dimen.top = dimen.top - (dimen.height - 40);
      dimen.bottom = dimen.bottom - (dimen.height + 40);
      dimen.left = dimen.left + 40;
      dimen.right = dimen.right - 40;
    } else if (dir == 'down') {
      dimen.top = dimen.top + (dimen.height + 40);
      dimen.bottom = dimen.bottom + (dimen.height - 40);
      dimen.left = dimen.left + 40;
      dimen.right = dimen.right - 40;
    }

    var inter = [];


    Object.keys(this.refs).forEach(c => { 

      Object.keys(this.refs[c].wrappedInstance.refs).map( t => { 
        if (
          this.intersectRect(dimen, this.refs[c].wrappedInstance.refs[t].wrappedInstance.state.dimensions) && 
          eventTile.props.id != this.refs[c].wrappedInstance.refs[t].wrappedInstance.props.id) { 
          inter.push(this.refs[c].wrappedInstance.refs[t].wrappedInstance)
        } 
      })
    });


    // try not to mutate
    return [...inter.sort(a => a.state.dimensions.top)]

  }

  unBump() {
    Object.keys(this.refs).forEach(c => { Object.keys(this.refs[c].wrappedInstance.refs).map( t => { this.refs[c].wrappedInstance.refs[t].wrappedInstance.unBump() })});
  }

  contractAll(cb) {
    Object.keys(this.refs).forEach(c => { Object.keys(this.refs[c].wrappedInstance.refs).map( t => { this.refs[c].wrappedInstance.refs[t].wrappedInstance.contract() })});
    cb();
  }

  clearWay(tile, dir) {
    if (tile.state.expanded) {
      this.contractAll(this.unBump);
    } else {
      this.contractAll(this.unBump);
      let tarTiles = this.findNeighbor(tile, dir);

      let diff = tile.state.dimensions.top - tarTiles[0].state.dimensions.top;
      let bumpAmt = diff > 0 ? 630 + diff : 630;
      tarTiles[0].bump(bumpAmt);
    }
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }

  renderColumns() {
    return Object.keys(this.props.board).map((k, i) => (
      <Column key={k} col={i} colData={this.props.board[k]} slideTile={this.slideTile} name={k} clearWay={this.clearWay} ref={k}/>
    ));
  }

  requestBoard(h, b) {
    window.urb.send({
        action: 'request-board',
        host: '~rosfet-ronlyn-mirdel-sillev--satnes-haphul-habryg-loppeg',
        board: 'anewboard'
    });
  }

  render() {
    return (
      <div className="cont">
      {/*
      */}
        {this.renderColumns()}
        {/*
        <div id="ghost-tile" className={ this.state.showGhost ? "show": "hide"} style={this.state.ghostStyle}> 
          <div className="tile-container"> 
            <input className="title" type="text" value={this.state.ghostIssueData.title}/> 
            <input className="author" type="text" value={this.state.ghostIssueData.author}/> 
          </div> 
          <div className="indicator"></div> 
          <textarea className="description" value={this.state.ghostIssueData.description}></textarea> 
          <input className="assignee" type="text" value={this.state.ghostIssueData.assignee}/> 
        </div>
        */}
      </div>
    )
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(App);
