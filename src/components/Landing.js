import React from "react";
import { FirebaseContext } from "./Firebase";
import "../css/Landing.css";

class Landing extends React.Component {
  state = {
    clicked: false,
    introText: flavorText.introText[1],
    footerText: flavorText.footerText[0]
  };
  firstTimeRef = React.createRef();
  regularRef = React.createRef();
  firstTimeClick = () => {
    this.context.addVisitor("new");
    this.setState(
      {
        clicked: true,
        introText: flavorText.introText[0],
        footerText: flavorText.footerText[1]
      },
      () => {
        this.firstTimeRef.current.classList.add("clicked");
        this.firstTimeRef.current.onClick = null;
        this.firstTimeRef.current.innerHTML = flavorText.firstTimeText[1];
        this.regularRef.current.classList.add("disappear");
        setTimeout(
          () =>
            this.setState(
              {
                clicked: false,
                introText: flavorText.introText[1],
                footerText: flavorText.footerText[0]
              },
              () => {
                this.firstTimeRef.current.classList.remove("clicked");
                this.firstTimeRef.current.onClick = this.firstTimeClick;
                this.firstTimeRef.current.innerHTML =
                  flavorText.firstTimeText[0];
                this.regularRef.current.classList.remove("disappear");
              }
            ),
          5000
        );
      }
    );
  };
  regularClick = () => {
    this.context.addVisitor("regular");
    this.setState(
      {
        clicked: true,
        introText: flavorText.introText[0],
        footerText: flavorText.footerText[2]
      },
      () => {
        this.regularRef.current.classList.add("clicked");
        this.regularRef.current.onClick = null;
        this.regularRef.current.innerHTML = flavorText.regularText[1];
        this.firstTimeRef.current.classList.add("disappear");
        setTimeout(
          () =>
            this.setState(
              {
                clicked: false,
                introText: flavorText.introText[1],
                footerText: flavorText.footerText[0]
              },
              () => {
                this.regularRef.current.classList.remove("clicked");
                this.regularRef.current.onClick = this.regularClick;
                this.regularRef.current.innerHTML = flavorText.regularText[0];
                this.firstTimeRef.current.classList.remove("disappear");
              }
            ),
          5000
        );
      }
    );
  };
  render() {
    return (
      <div className="landing">
        <img src="img/shortcut_logo_green.png" alt="the shortcut logo" />
        <div className="intro">{this.state.introText}</div>
        <div className="buttons">
          <div className="first-time">
            <button ref={this.firstTimeRef} onClick={this.firstTimeClick}>
              {flavorText.firstTimeText[0]}
            </button>
          </div>
          <div className="regular">
            <button ref={this.regularRef} onClick={this.regularClick}>
              {flavorText.regularText[0]}
            </button>
          </div>
        </div>
        <div className="landing-footer">{this.state.footerText}</div>
      </div>
    );
  }
}

Landing.contextType = FirebaseContext;
export default Landing;

const flavorText = {
  introText: ["", "hey, mind letting us know who you are?"],
  firstTimeText: [
    "first timer",
    "nice to meet you,<br/> let's be best friends!"
  ],
  regularText: [
    "regular visitor",
    "great to see you again,<br/> have a good one!"
  ],
  footerText: [
    "you look great today by the way!",
    "Confused? Just grab one of our guys. FYI, they can't run",
    "Stay awesome, handsome!"
  ]
};
