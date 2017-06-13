import rootReducer from './index';

describe('>>>BOARD REDUCER', () => {
  it('creates a phase from nothing', () => {
    const stateBefore = {};
    const stateAfter = {
      board: {
        'todo': []
      }
    }
    const action = {type: 'CREATE_PHASE', phase: 'todo'};
    expect(rootReducer(stateBefore, action)).toEqual(stateAfter);
  });
  it('adds a phase', () => {
    const stateBefore = {
      board: {
        'todo': []
      }
    };
    const stateAfter = {
      board: {
        'todo': [],
        'doin': []
      }
    };
    const action = {type: 'CREATE_PHASE', phase: 'doin'};
    expect(rootReducer(stateBefore, action)).toEqual(stateAfter);
  });
  it('deletes an issue', () => {
    const stateBefore = {
      board: {
        'todo': [
          {
            issueId: '123',
            title:'',
            description:'',
            author:'',
            assignee: ''
          }
        ]
      }
    };
    const stateAfter = {
      board: {
        'todo': []
      }
    };
    const action = {type: 'DELETE_ISSUE', issueId: '123'};
    expect(rootReducer(stateBefore, action)).toEqual(stateAfter);
  });
  it('creates an issue in an existing phase', () => {
    const stateBefore = {
      board: {
        'todo': [
          {
            issueId: '123',
            title:'',
            description:'',
            author:'',
            assignee: ''
          }
        ]
      }
    };
    const stateAfter = {
      board: {
        'todo': [
          {
            issueId: '789',
            title:'',
            description:'',
            author:'',
            assignee: ''
          },
          {
            issueId: '123',
            title:'',
            description:'',
            author:'',
            assignee: ''
          }
        ]
      }
    };
    const newIssue = {
      issueId: '789',
      title:'',
      description:'',
      author:'',
      assignee: ''
    };
    const action = {type: 'CREATE_ISSUE', phase: 'todo', issueObj: newIssue};
    expect(rootReducer(stateBefore, action)).toEqual(stateAfter);
  });
  it('updates an existing issue', () => {
    const stateBefore = {
      board: {
        'todo': [
          {
            issueId: '123',
            title:'',
            description:'',
            author:'~ted',
            assignee: ''
          }
        ]
      }
    };
    const stateAfter = {
      board: {
        'todo': [
          {
            issueId: '123',
            title:'a new title',
            description:'',
            author:'~ted',
            assignee: ''
          }
        ]
      }
    };
    const action = {type: 'UPDATE_ISSUE', issueId: '123', issueObj: {title: 'a new title'}};
    console.log(action);
expect(rootReducer(stateBefore, action)).toEqual(stateAfter);
  });
  it('moves issues', () => {
    const stateBefore = {
      board: {
        'todo': [
          {
            issueId: '123',
            title:'',
            description:'',
            author:'',
            assignee: ''
          },
          {
            issueId: '789',
            title:'',
            description:'',
            author:'',
            assignee: ''
          }
        ],
        'doin': [
          {
            issueId: '489',
            title:'',
            description:'',
            author:'',
            assignee: ''
          },
          {
            issueId: '989',
            title:'',
            description:'',
            author:'',
            assignee: ''
          }
        ]
      }
    };
    const stateAfter = {
      board: {
        'todo': [
          {
            issueId: '123',
            title:'',
            description:'',
            author:'',
            assignee: ''
          }
        ],
        'doin': [
          {
            issueId: '489',
            title:'',
            description:'',
            author:'',
            assignee: ''
          },
          {
            issueId: '789',
            title:'',
            description:'',
            author:'',
            assignee: ''
          },
          {
            issueId: '989',
            title:'',
            description:'',
            author:'',
            assignee: ''
          }
        ]
      }
    };
    const action = {
      type: 'MOVE_ISSUE',
      sourcePhase: 'todo',
      sourceId: '789',
      targetPhase: 'doin',
      targetId: '989'
    };
    expect(rootReducer(stateBefore, action)).toEqual(stateAfter);
  });
});


