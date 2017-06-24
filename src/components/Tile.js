//The Tile is the basic reflection of the Issue

import React, {Component} from 'react';
import { connect } from 'react-redux';

import { moveIssue, updateIssue, deleteIssue } from '../actions/actions';

import './Tile.css';

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
    moveIssue: (sourcePhase, sourceId, targetPhase, targetId) => dispatch(moveIssue(sourcePhase, sourceId, targetPhase, targetId)),
    deleteIssue: (issueId) => dispatch(deleteIssue(issueId))
  }
};

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.issueData = props.issue;
    this.state.expanded = false;
    this.state.active = false;
    this.state.bumpAmt = 0;
    this.state.ogMarg = 0;
    this.state.bumped = false;
    this.state.dimensions = { width: -1, height: -1 };
    this.submitChanges = this.submitChanges.bind(this);
    this.classNames = this.classNames.bind(this);
    this.expand = this.expand.bind(this);
    this.activate = this.activate.bind(this);
    this.clearWay = this.clearWay.bind(this);
    this.slideTile = this.slideTile.bind(this);
    this.measureTile = this.measureTile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.bump = this.bump.bind(this);
    this.unBump = this.unBump.bind(this);
    this.contract = this.contract.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  submitChanges() {
    this.props.updateIssue(this.props.id, this.state.issueData);
  }

  handleDelete(e) {
    console.debug('handle delete');
    this.clearWay();
    this.props.deleteIssue(this.props.id);
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
    this.props.moveIssue(phase, id, this.props.col, this.props.id);
  }

  handleChange() {
    let tmpIssueObj = {
      title: this.refs.title.value,
      author: this.refs.author.value,
      assignee: this.refs.assignee.value,
      description: this.refs.description.value,
    }
    this.setState({issueData: tmpIssueObj});
  };

  handleDragStart(e) {
    e.nativeEvent.dataTransfer.setData('text', this.props.col + '|' + this.props.id);
  };

  handleClick(e) {
    e.preventDefault();
    this.clearWay(this, 'right');
    this.expand();
    //this.slideTile(this, 'right');
  }

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
  componentDidUpdate() {
  }
  activate() {
    if (this.state.active) {
      this.setState({ active: false });
    } else {
      this.setState({ active: true });
    }
    return
  }
  contract() {
    this.setState({ expanded: false });
  }
  expand() {
    if (this.state.expanded) {
      this.setState({ expanded: false });
    } else {
      this.setState({ expanded: true });
    }
    return
  }
  measureTile() {
    let rect = this.refs.tile.getBoundingClientRect();
    // people get mad at this, but otherwise it lags
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
  classNames() {
    let c = ['tile'];
    const count = (this.props.issue.description.match(/[\r\n]/g) || []).length;

    // class based 
    if (this.state.expanded) {
      c.push('expanded')
    };
    if (this.state.active) {
      c.push('active')
    }
    // Resize based on line height
    if (count < 2) {
      c.push('one')
    } else if (count >=2 && count < 7) {
      c.push('two')
    } else {
      c.push('three')
    }
    return c.join(' ');
  }


  render() {
    return (
      <div ref='tile' className={this.classNames()} onDoubleClick={this.handleClick} draggable="true" onDragStart={this.handleDragStart} onDragOver={this.handleDragOver} onDrop={this.handleDrop} style={{ marginTop: this.state.bumpAmt}} > 
        <div className="tile-container"> 
          <input className="title" type="text" ref="title" value={this.props.issue.title}/> 
          <input className="author" type="text" ref="author" value={this.props.issue.author}/> 
        </div> 
        <div className="indicator"></div> 
        <textarea className="description" ref="description" onChange={this.handleChange} defaultValue={this.props.issue.description}></textarea> 
        <input className="assignee" type="text" ref="assignee" value={this.props.issue.assignee}/> 
        <span className="delete" onClick={this.handleDelete}>X</span>
        <input className="submit" type="submit" onClick={this.submitChanges}/> 
      </div>
    );
  }       
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    withRef: true
  }
)(Tile);
