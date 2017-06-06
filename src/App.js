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
  }
  findNeighbor(key, dir) {
    // utility for finding the node that must be messed with, moved
  }
  renderColumns() {
    return this.state.board.map(c => (
      <Column key={c.name} colData={c}/>
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
