import React from "react";
import { FirebaseContext } from "./Firebase";

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
        <FirebaseContext.Consumer>
          {firebase => {
            return (
              <div className="buttons">
                <button onClick={() => firebase.addVisitor("new")}>
                  First-time Visitor
                </button>
                <button onClick={() => firebase.addVisitor("regular")}>
                  Regular
                </button>
              </div>
            );
          }}
        </FirebaseContext.Consumer>
      </div>
    );
  }
}
export default Landing;
