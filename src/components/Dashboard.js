import React from "react";
import { FirebaseContext } from "./Firebase";
import Canvas from "./Canvas";

class Dashboard extends React.Component {
  state = {
    graphType: "day",
    currentChart: null,
    currentData: {},
    dailyVisitors: 0,
    monthlyVisitors: 0,
    yearlyVisitors: 0
  };
  async componentDidMount() {
    let firebase = this.context;
    let currentData = await firebase.getVisitors();
    let dailyVisitors = await firebase.getVisitorsToday();
    let monthlyVisitors = await firebase.getVisitorsThisMonth();
    let yearlyVisitors = await firebase.getVisitorsThisYear();
    this.setState({
      currentData: currentData,
      dailyVisitors,
      monthlyVisitors,
      yearlyVisitors
    });
  }
parseJSONToCSVStr = jsonData => {
    if (jsonData.length === 0) {
      return "";
    }

    let keys = Object.keys(jsonData[0]);

    let columnDelimiter = ",";
    let lineDelimiter = "\n";

    let csvColumnHeader = "date," + keys.join(columnDelimiter);
    console.log(csvColumnHeader);
    let csvStr = csvColumnHeader + lineDelimiter;

    jsonData.forEach(item => {
      console.log(item);
      keys.forEach((key, index) => {
        if (key === "time") {
          csvStr +=
            item[key].toDate().getFullYear() +
            "-" +
            (item[key].toDate().getMonth() + 1) +
            "-" +
            item[key].toDate().getDate() +
            columnDelimiter +
            item[key].toDate().getHours() +
            ":" +
            item[key].toDate().getMinutes() +
            ":" +
            item[key].toDate().getSeconds();
        } else {
          csvStr += item[key];
        }
        if (index < keys.length - 1) {
          csvStr += columnDelimiter;
        }
      });
      csvStr += lineDelimiter;
    });
    console.log(csvStr);
    return encodeURIComponent(csvStr);
  };
  exportToCsvFile = jsonData => {
    let csvStr = this.parseJSONToCSVStr(jsonData);
    let dataUri = "data:text/csv;charset=utf-8," + csvStr;

    let exportFileDefaultName = "data.csv";

    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-button">
          <button onClick={() => this.exportToCsvFile(this.state.currentData)}>
            Export to Excel
          </button>
        </div>
        <Canvas />
        <div>
          Today's visitors: {this.state.dailyVisitors} <br />
          This month's Visitors: {this.state.monthlyVisitors} <br />
          This year's Visitors: {this.state.yearlyVisitors} <br />
        </div>
      </div>
    );
  }
}
Dashboard.contextType = FirebaseContext;

export default Dashboard;
