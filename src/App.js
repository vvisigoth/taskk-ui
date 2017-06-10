import React, { Component } from 'react';
import Column from './Column';
import './App.css';

class App extends Component{
  constructor(props) {
    super(props);

    //window.urb.appl = "taskk";

    //window.urb.bind('/~rosfet-ronlyn-mirdel-sillev--satnes-haphul-habryg-loppeg/anewboard', (e,d) => {
    //  console.debug(e);
    //  console.debug(d);
    //});

    this.renderColumns = this.renderColumns.bind(this);

    this.state = {
      board: 
        [
          {
            name: 'todo',
            issues: 
              [
                {
                  issue: '25',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below\n\n\n\n\n'
                },
                {
                  issue: '32',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, \n\nso below'
                },
                {
                  issue: '39',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so \n\nbelow'
                },
                {
                  issue: '46',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below\n\n\n\n\n\n'
                }
              ]
          },
          {
            name: 'doin',
            issues: 
              [
                {
                  issue: '59',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '66',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '73',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '80',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                }
              ]
          },
          {
            name: 'show',
            issues: 
              [
                {
                  issue: '93',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '100',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '107',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '114',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                }
              ]
          },
          {
            name: 'done',
            issues: 
              [
                {
                  issue: '127',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '134',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '141',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '148',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                }
              ]
          }
        ]
    };
    this.state.columnList = [];
    this.findNeighbor = this.findNeighbor.bind(this);
    this.findTile = this.findTile.bind(this);
    this.intersectRect = this.intersectRect.bind(this);
    this.clearWay = this.clearWay.bind(this);
    this.unBump = this.unBump.bind(this);
    this.contractAll = this.contractAll.bind(this);
    this.moveTile = this.moveTile.bind(this);
  }

  moveTile(tile, dir) {

  }

  intersectRect(r1, r2) {
    return !(r2.left > r1.right || 
      r2.right < r1.left || 
      r2.top > r1.bottom ||
      r2.bottom < r1.top);
  }

  findTile(key) {
    var a;
    this.state.columnList.forEach(c => { c.state.tileList.map( t => { if (t.props.issueData.issue == key) {a = t} })});
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

    console.debug('dimen after');
    console.debug(dimen);

    var inter = [];

    this.state.columnList.forEach(c => { c.state.tileList.map( t => { if (this.intersectRect(dimen, t.state.dimensions) && eventTile.props.id != t.props.id) { inter.push(t)} })});

    return inter;

  }

  unBump() {
    this.state.columnList.forEach(c => { c.state.tileList.map( t => { t.unBump() })});
  }

  contractAll(cb) {
    this.state.columnList.forEach(c => { c.state.tileList.map( t => { t.contract() })});
    cb();
  }

  clearWay(tile, dir) {
    if (tile.state.expanded) {
      console.debug('contract');

      this.contractAll(this.unBump);
    } else {
      console.debug('expand');
      this.contractAll(this.unBump);
      let tarTiles = this.findNeighbor(tile, dir);

      let diff = tile.state.dimensions.top - tarTiles[0].state.dimensions.top;
      let bumpAmt = diff > 0 ? 630 + diff : 630;
      tarTiles[0].bump(bumpAmt);
    }
  }

  componentDidMount() {
    //console.debug(this.findNeighbor('25', 1));
  }

  renderColumns() {
    return this.state.board.map((c, i) => (
      <Column key={c.name} col={i} colData={c} moveTile={this.moveTile} clearWay={this.clearWay} ref={i => {this.state.columnList.push(i)}}/>
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
      {this.renderColumns()}
      </div>
    )
  }
};

export default App;
