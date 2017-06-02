import React, { Component } from 'react';
import Column from './Column';

class App extends Component{
  constructor(props) {
    super(props);
    this.renderColumns = this.renderColumns.bind(this);
    // fetch full board
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
  renderColumns() {
    return this.state.board.map(c => (
      <Column key={c.name} colData={c}/>
    ));
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
