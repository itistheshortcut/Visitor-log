import React from "react";
import { FirebaseContext } from "./Firebase";
import '../css/Landing.css';

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
        <img src="img/shortcut_logo_green.png" alt="the shortcut logo" />
        <div className="intro">hey, mind letting us know who you are?</div>
        <FirebaseContext.Consumer>
          {firebase => {
            return (
              <div className="buttons">
                <div className="first-time">
                  <button onClick={() => firebase.addVisitor("new")}>
                    first timer
                  </button>
                </div>
                <div className="regular">
                  <button onClick={() => firebase.addVisitor("regular")}>
                    regular visitor
                  </button>
                </div>
              </div>
            );
          }}
        </FirebaseContext.Consumer>
        <div className="landing-footer">you look great today by the way!</div>
      </div>
    );
  }
}
export default Landing;
