import React from "react";

class Landing extends React.Component {
  state = {
    firstTime: 0,
    regular: 0,
    visitor: 0
  };
  firstTimeCount = () => {
    let { firstTime, visitor } = this.state;
    this.setState({
      firstTime: firstTime + 1,
      visitor: visitor + 1
    });
  };
  regularCount = () => {
    let { regular, visitor } = this.state;
    this.setState({
      regular: regular + 1,
      visitor: visitor + 1
    });
  };
  render() {
    return (
      <div className="landing">
        <div className="intro">Welcome to the Shortcut blah blah</div>
        <div className="buttons">
          <button onClick={this.firstTimeCount}>First-time Visitor</button>
          <button onClick={this.regularCount}>Regular</button>
        </div>
        <div>
          Current number of visitors: <br />
          First time visitors: {this.state.firstTime} <br />
          Regulars: {this.state.regular} <br />
          Total: {this.state.visitor} <br />
        </div>
      </div>
    );
  }
}
export default Landing;
