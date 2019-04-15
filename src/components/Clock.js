import React from "react";

class Clock extends React.Component {
  state = { date: "", time: "" };
  componentDidMount() {
    setInterval(() => {
      let now = new Date(Date.now());
      let nowYear = now.getFullYear() % 100;
      let nowMonth = (now.getMonth() < 10 ? "0" : "") + now.getMonth();
      let nowDay = (now.getDate() < 10 ? "0" : "") + now.getDate();
      let nowHour = (now.getHours() < 10 ? "0" : "") + now.getHours();
      let nowMin = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
      let nowDate = nowDay + "/" + nowMonth + "/" + nowYear;
      let nowTime = nowHour + ":" + nowMin;
      console.log(nowDate);
      this.setState({ date: nowDate, time: nowTime });
    }, 1000);
  }
  render() {
    return (
      <div className="clock">
        <div className="clock-time">{this.state.time}</div>
        <div className="clock-date">{this.state.date}</div>
      </div>
    );
  }
}

export default Clock;
