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
                  issue: '123',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '456',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '789',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '321',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                }
              ]
          },
          {
            name: 'doin',
            issues: 
              [
                {
                  issue: '123',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '456',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '789',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '321',
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
                  issue: '123',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '456',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '789',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '321',
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
                  issue: '123',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '456',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '789',
                  title: 'Some Title',
                  author: '~poldec',
                  assignee: '~zod',
                  description: 'As above, so below'
                },
                {
                  issue: '321',
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
