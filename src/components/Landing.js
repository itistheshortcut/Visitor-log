import React from "react";
import { FirebaseContext } from "./Firebase";
import Clock from "./Clock";
import "../css/Landing.css";
import { flavorText } from "../text/text.js";
import { ReactComponent as Facebook } from "../img/Facebook.svg";
import { ReactComponent as Instagram } from "../img/Instagram.svg";
import { ReactComponent as Twitter } from "../img/Twitter.svg";
import { ReactComponent as Logo } from "../img/logo.svg";

class Landing extends React.Component {
  state = {
    clicked: false,
    introText: flavorText.introText[1],
    media: 0,
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
                      Math.random() * flavorText.footerFirstText.length
                    )
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
                      Math.random() * flavorText.footerFirstText.length
                    )
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
  componentDidMount() {
    setInterval(() => {
      this.setState({
        footerText:
          flavorText.footerText[
            Math.floor(Math.random() * flavorText.footerFirstText.length)
          ]
      });
    }, 60000);
    setInterval(() => {
      this.setState({
        media: (this.state.media + 1) % 3
      });
    }, 3000);
  }
  mediaHandlerRender = handlerNumber => {
    switch (handlerNumber) {
      case 0:
        return <Facebook />;
      case 1:
        return <Instagram />;
      case 2:
        return <Twitter />;
      default:
        return "Loading";
    }
  };
  render() {
    return (
      <div className="landing">
        <Logo className="shortcut-logo" />
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
        <div className="media-handler">
          {this.mediaHandlerRender(this.state.media)}
        </div>
        <Clock />
      </div>
    );
  }
}

Landing.contextType = FirebaseContext;
export default Landing;
