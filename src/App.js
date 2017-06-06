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
  }

  intersectRect(r1, r2) {
    console.debug(r1);
    console.debug(r2);
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

  findNeighbor(dimensions, dir) {
    console.debug('findneighbor');

    //var sourceTile = this.findTile(key);
    console.debug('dimensions before');
    console.debug(dimensions);

    if (dir == 'left') {
      dimensions.top = dimensions.top + 40;
      dimensions.bottom = dimensions.bottom - 40;
      dimensions.left = dimensions.left - (dimensions.width - 40);
      dimensions.right = dimensions.right - (dimensions.width + 40);
    } else if (dir == 'right') {
      dimensions.top = dimensions.top + 40;
      dimensions.bottom = dimensions.bottom - 40;
      dimensions.left = dimensions.left + (dimensions.width + 40);
      dimensions.right = dimensions.right + (dimensions.width - 40);
    } else if (dir == 'up') {
      dimensions.top = dimensions.top - (dimensions.height - 40);
      dimensions.bottom = dimensions.bottom - (dimensions.height + 40);
      dimensions.left = dimensions.left + 40;
      dimensions.right = dimensions.right - 40;
    } else if (dir == 'down') {
      dimensions.top = dimensions.top + (dimensions.height + 40);
      dimensions.bottom = dimensions.bottom + (dimensions.height - 40);
      dimensions.left = dimensions.left + 40;
      dimensions.right = dimensions.right - 40;
    }

    console.debug('dimensions after');
    console.debug(dimensions);

    var inter = [];

    this.state.columnList.forEach(c => { c.state.tileList.map( t => { if (this.intersectRect(dimensions, t.state.dimensions)) { inter.push(t)} })});

    console.debug(inter);

    return inter;



  }

  componentDidMount() {
    //console.debug(this.findNeighbor('25', 1));
  }

  renderColumns() {
    return this.state.board.map(c => (
      <Column key={c.name} colData={c} findNeighbor={this.findNeighbor} ref={i => {this.state.columnList.push(i)}}/>
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
