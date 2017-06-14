//The Tile is the basic reflection of the Issue

import React, {Component} from 'react';
//import Measure from 'react-measure';
import './Tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {issueData: props.issueData};
    this.state.expanded = false;
    this.state.active = false;
    this.state.bumpAmt = 0;
    this.state.ogMarg = 0;
    this.state.bumped = false;
    this.state.dimensions = {
      width: -1,
      height: -1,
    };
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
  }
  submitChanges() {
    return;
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
  handleClick() {
    this.clearWay(this, 'right');
    this.expand();
    //this.slideTile(this, 'right');
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
      <div ref='tile' className={this.classNames()} onDoubleClick={this.handleClick} style={{ marginTop: this.state.bumpAmt}} > 
        <div className="tile-container"> 
          <input className="title" type="text" value={this.state.issueData.title}/> 
          <input className="author" type="text" value={this.state.issueData.author}/> 
        </div> 
        <div className="indicator"></div> 
        <textarea className="description" value={this.state.issueData.description}></textarea> 
        <input className="assignee" type="text" value={this.state.issueData.assignee}/> 
        <input className="submit" type="submit" onClick={this.submitChanges}/> 
      </div>
    );
  }       
};

export default Tile
