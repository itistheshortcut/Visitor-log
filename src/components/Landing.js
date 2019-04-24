import React from "react";
import { FirebaseContext } from "./Firebase";
import Clock from "./Clock";
import "../css/Landing.css";
const flavorText = {
  introText: ["", "hey, mind letting us know who you are?"],
  firstTimeText: [
    "first\ntimer",
    "nice to meet you,<br /> let's be best friends!",
    "hey, a smile is a great start",
    "cool to see you here! we've been waiting for you!",
    "winterfell is yours, your grace."
  ],
  regularText: [
    "regular\nvisitor",
    "great to see you again,<br /> have a good one!",
    "please leave your coat in the cloak room",
    "enjoy your day<br /> and stay happy & relaxed!"
  ],
  footerFirstText: [
    "you look great today by the way!",
    "confused? just grab one of our guys.\nFYI, they can't run",
    "feel free to take a cup of coffee or tea",
    "lost? no worries, everyone is pleased to help you.\n just ask for help"
  ],
  footerRegularText: [
    "stay fancy, my friend",
    "stay awesome, handsome!",
    "remember to use our job wall",
    "having you on the team makes a huge difference",
    "you are better than unicorns and sparkles combined",
    "your smile is awesome, keep it always"
  ],
  footerText: [
    "you look great today by the way!",
    "confused? just grab one of our guys.\nFYI, they can't run",
    "feel free to take a cup of coffee or tea",
    "lost? no worries, everyone is pleased to help you.\n just ask for help",
    "stay fancy, my friend",
    "stay awesome, handsome!",
    "remember to use our job wall",
    "having you on the team makes a huge difference",
    "you are better than unicorns and sparkles combined",
    "your smile is awesome, keep it always"
  ]
};

class Landing extends React.Component {
  state = {
    clicked: false,
    introText: flavorText.introText[1],
    footerText:
      flavorText.footerText[
        Math.floor(Math.random() * (flavorText.footerText.length - 1)) + 1
      ]
  };
  firstTimeRef = React.createRef();
  regularRef = React.createRef();
  firstTimeClick = () => {
    console.log("on click");
    this.context.addVisitor("new");
    this.setState(
      {
        clicked: true,
        introText: flavorText.introText[0],
        footerText:
          flavorText.footerText[
            Math.floor(
              Math.random() * (flavorText.footerFirstText.length - 1)
            ) + 1
          ]
      },
      () => {
        this.firstTimeRef.current.classList.add("clicked");
        this.firstTimeRef.current.disabled = true;
        this.firstTimeRef.current.innerHTML =
          flavorText.firstTimeText[
            Math.floor(Math.random() * (flavorText.firstTimeText.length - 1)) +
              1
          ];
        this.regularRef.current.classList.add("disappear");
        setTimeout(
          () =>
            this.setState(
              {
                clicked: false,
                introText: flavorText.introText[1],
                footerText:
                  flavorText.footerText[
                    Math.floor(
                      Math.random() * (flavorText.footerFirstText.length - 1)
                    ) + 1
                  ]
              },
              () => {
                this.firstTimeRef.current.classList.remove("clicked");
                this.firstTimeRef.current.disabled = false;
                this.firstTimeRef.current.innerHTML =
                  flavorText.firstTimeText[0];
                this.regularRef.current.classList.remove("disappear");
              }
            ),
          3500
        );
      }
    );
  };
  regularClick = () => {
    this.context.addVisitor("regular");
    let randFoot =
      Math.floor(Math.random() * (flavorText.footerRegularText.length - 1)) + 1;
    console.log(randFoot);
    this.setState(
      {
        clicked: true,
        introText: flavorText.introText[0],
        footerText: flavorText.footerRegularText[randFoot]
      },
      () => {
        this.regularRef.current.classList.add("clicked");
        this.regularRef.current.disabled = true;
        let rand =
          Math.floor(Math.random() * (flavorText.regularText.length - 1)) + 1;
        console.log(rand);
        this.regularRef.current.innerHTML = flavorText.regularText[rand];
        this.firstTimeRef.current.classList.add("disappear");
        setTimeout(
          () =>
            this.setState(
              {
                clicked: false,
                introText: flavorText.introText[1],
                footerText:
                  flavorText.footerText[
                    Math.floor(
                      Math.random() * (flavorText.footerFirstText.length - 1)
                    ) + 1
                  ]
              },
              () => {
                this.regularRef.current.classList.remove("clicked");
                this.regularRef.current.disabled = false;
                this.regularRef.current.innerHTML = flavorText.regularText[0];
                this.firstTimeRef.current.classList.remove("disappear");
              }
            ),
          3500
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
          <div className="regular">
            <button ref={this.regularRef} onClick={this.regularClick}>
              {flavorText.regularText[0]}
            </button>
          </div>
          <div className="first-time">
            <button ref={this.firstTimeRef} onClick={this.firstTimeClick}>
              {flavorText.firstTimeText[0]}
            </button>
          </div>
        </div>
        <div className="landing-footer">{this.state.footerText}</div>
        <Clock />
      </div>
    );
  }
}

Landing.contextType = FirebaseContext;
export default Landing;
