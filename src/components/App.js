import React, { Component } from 'react';
import { connect } from 'react-redux';

import Column from './Column';
import './App.css';
import './Tile.css';

import { colOrder } from '../utils';

import { postMoveIssue, setBoard } from '../actions/actions';

//import moveTile from './actions/board';

//import intersectRect from './utils';

const clone = function(obj) {
  let newObj = {};
  Object.keys(obj).forEach(k => { newObj[k] = obj[k] });
  return newObj
}

//const colOrder = ['todo', 'doin', 'show', 'done'];

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
    board: state.board,
    urb: state.urb,
    loading: state.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    postMoveIssue: (sourcePhase, sourceId, targetPhase, targetId) => dispatch(postMoveIssue(sourcePhase, sourceId, targetPhase, targetId)),
    getBoard: () => {dispatch({type: 'GET_BOARD_DATA'})},
    setBoard: (host, board) => {dispatch(setBoard(host, board))}
  }
};

class App extends Component{
  constructor(props) {
    super(props);

    //this.props.setBoard(
    //
    console.debug(this.props);

    let params = this.props.match.params;

    this.props.setBoard(params.host, params.board);

    // TODO: See if component is mounted and get board?
    //props.getBoard()

    this.renderColumns = this.renderColumns.bind(this);
    this.state = {};
    this.findNeighbor = this.findNeighbor.bind(this);
    this.findTile = this.findTile.bind(this);
    this.clearWay = this.clearWay.bind(this);
    this.unBump = this.unBump.bind(this);
    this.contractAll = this.contractAll.bind(this);
    this.slideTile = this.slideTile.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.intersectRect = this.intersectRect.bind(this);
  }

  slideTile(tile, dir) {
    let dc = destCol(tile.props.col, dir);
    //let tmpIssueObj = clone(tile.state.issueData);
    let destTile = this.findNeighbor(tile, dir);
    this.props.postMoveIssue(tile.props.col, tile.props.id, dc, destTile[0].props.id);
  }

  intersectRect(r1, r2) {
    return !(r2.left > r1.right || 
      r2.right < r1.left || 
      r2.top > r1.bottom ||
      r2.bottom < r1.top);
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

  findTile(key) {
    var a;
    this.state.columnList.forEach(c => { c.state.tileList.map(t => { if (t.props.issueData.issue === key) {a = t} })});
    return a
  }

  componentWillReceiveProps() {
    console.debug(new Date().getTime());
    console.debug(this.props);
  }

  //componentDidMount() {
  //  console.debug(this.props);
  //  if (this.props.urb.subscribed) {
  //    this.props.getBoard();
  //  }
  //}
  //
  componentWillUpdate() {
    console.debug(new Date().getTime());
    console.debug(this.props);
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

    if (dir === 'left') {
      dimen.top = dimen.top + 40;
      dimen.bottom = dimen.bottom - 40;
      dimen.left = dimen.left - (dimen.width - 40);
      dimen.right = dimen.right - (dimen.width + 40);
    } else if (dir === 'right') {
      dimen.top = dimen.top + 40;
      dimen.bottom = dimen.bottom - 40;
      dimen.left = dimen.left + (dimen.width + 40);
      dimen.right = dimen.right + (dimen.width - 40);
    } else if (dir === 'up') {
      dimen.top = dimen.top - (dimen.height - 40);
      dimen.bottom = dimen.bottom - (dimen.height + 40);
      dimen.left = dimen.left + 40;
      dimen.right = dimen.right - 40;
    } else if (dir === 'down') {
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
          eventTile.props.id !== this.refs[c].wrappedInstance.refs[t].wrappedInstance.props.id) { 
          inter.push(this.refs[c].wrappedInstance.refs[t].wrappedInstance)
        } 
      })
    });

    // try not to mutate
    return [...inter.sort((a, b) => {return a.state.dimensions.top - b.state.dimensions.top})]

  }

  unBump() {
    Object.keys(this.refs).forEach(c => { Object.keys(this.refs[c].wrappedInstance.refs).map( t => { this.refs[c].wrappedInstance.refs[t].wrappedInstance.unBump() })});
  }

  contractAll(cb) {
    Object.keys(this.refs).forEach(c => { Object.keys(this.refs[c].wrappedInstance.refs).map( t => { this.refs[c].wrappedInstance.refs[t].wrappedInstance.contract() })});
    cb();
  }

  clearWay(tile, dir) {
    if (typeof(tile) === 'undefined') {
      this.contractAll(this.unBump);
      return;
    }
    if (tile.state.expanded) {
      this.contractAll(this.unBump);
    } else {
      this.contractAll(this.unBump);
      let tarTiles = this.findNeighbor(tile, dir);

      let diff = tile.state.dimensions.top - tarTiles[0].state.dimensions.top;
      let bumpAmt = diff > 0 ? 630 + diff : 630;
      console.debug(tarTiles.map(x=>{return x.props.id}));
      tarTiles[0].bump(bumpAmt);
    }
  }

  renderColumns() {
    return colOrder.map((k, i) => (
      <Column key={k} col={i} colData={this.props.board[k]} slideTile={this.slideTile} name={k} clearWay={this.clearWay} ref={k}/>
    ));
  }

  render() {
    console.debug('render');
    return (
      <div className="cont">
        <div id="loading-indicator" className={this.props.loading ? 'show' : 'hide'}>
        </div>
        {this.renderColumns()}
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
