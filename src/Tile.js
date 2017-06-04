//The Tile is the basic reflection of the Issue

import React, {Component} from 'react';
import Measure from 'react-measure';
import './Tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {issueData: props.issueData};
    this.state.expanded = false;
    this.state.active = false;
    this.state.dimensions = {
      width: -1,
      height: -1,
    };
    this.submitChanges = this.submitChanges.bind(this);
    this.classNames = this.classNames.bind(this);
    this.expand = this.expand.bind(this);
    this.activate = this.activate.bind(this);
  }
  submitChanges() {
    console.debug("submit");
    return;
  }
  activate() {
    if (this.state.active) {
      this.setState({ active: false });
    } else {
      this.setState({ active: true });
    }
    return
  }
  expand() {
    if (this.state.expanded) {
      this.setState({ expanded: false });
    } else {
      this.setState({ expanded: true });
    }
    return
  }
  classNames() {
    let c = ['tile'];
    const count = (this.state.issueData.description.match(/[\r\n]/g) || []).length;

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
      <Measure 
        bounds 
        onResize={(contentRect) => {
          this.setState({dimensions: contentRect.bounds })
        }}
      >
        {({measureRef}) => (
          <div ref={measureRef} className={this.classNames()} onClick={this.activate} style={{ marginTop: this.props.bumpAmt}} > 
            <div className="tile-container"> 
              <input className="title" type="text" value={this.state.issueData.title}/> 
              <input className="author" type="text" value={this.state.issueData.author}/> 
            </div> 
            <div className="indicator"></div> 
            <textarea className="description" value={this.state.issueData.description}></textarea> 
            <input className="assignee" type="text" value={this.state.issueData.assignee}/> 
            <input className="submit" type="submit" onClick={this.submitChanges}/> 
          </div>
        )}
      </Measure>
    );
  }       
};

export default Tile
