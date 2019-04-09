import React from "react";
import { FirebaseContext } from "./Firebase";
import Chart from "chart.js";

class Dashboard extends React.Component {
  dayChartRef = React.createRef();
  monthChartRef = React.createRef();
  state = { graphType: "day", currentChart: null };
  async componentDidMount() {}
  chartByMonth = async () => {
    let firebase = this.context;
    let data = await firebase.getVisitorsByMonth();
    let monthChart = new Chart(this.monthChartRef.current, {
      type: "line",
      data: {
        labels: Object.keys(data.new),
        datasets: [
          {
            label: "Number of new visitors",
            data: Object.values(data.new),
            fill: false,
            backgroundColor: "red",
            borderColor: "red"
          },
          {
            label: "Number of regular visitors",
            data: Object.values(data.regular),
            fill: false,
            backgroundColor: "blue",
            borderColor: "blue"
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Daily Visitors"
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Time"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Visitors"
              },
              ticks: {
                min: 0,
                precision: 0
              }
            }
          ]
        }
      }
    });
  };
  chartByDay = async () => {
    let firebase = this.context;
    let data = await firebase.getVisitorsByDay();
    let dayChart = new Chart(this.dayChartRef.current, {
      type: "line",
      data: {
        labels: Object.keys(data.new),
        datasets: [
          {
            label: "Number of new visitors",
            data: Object.values(data.new),
            fill: false,
            backgroundColor: "red",
            borderColor: "red"
          },
          {
            label: "Number of regular visitors",
            data: Object.values(data.regular),
            fill: false,
            backgroundColor: "blue",
            borderColor: "blue"
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: "Daily Visitors"
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Time"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Visitors"
              },
              ticks: {
                min: 0,
                precision: 0
              }
            }
          ]
        }
      }
    });
  };
  handleSelectChange = event => {
    console.log(event.target.value);
    this.setState({ graphType: event.target.value });
  };
  renderGraph = () => {
    this.chartByDay();

    this.chartByMonth();
  };

  render() {
    this.state.graphType && this.renderGraph();

    return (
      <div className="dashboard">
        <div className="dashboard-button">
          <button>Export to Excel</button>
        </div>
        <div
          className="visitor-graph"
          style={{ position: "relative", height: "50vh", width: "30vw" }}
        >
          <canvas
            ref={this.dayChartRef}
            id="myDayChart"
            width="100px"
            height="600px"
          />
          <canvas
            ref={this.monthChartRef}
            id="myMonthChart"
            width="100px"
            height="600px"
          />
        </div>
      </div>
    );
  }
}
Dashboard.contextType = FirebaseContext;

export default Dashboard;
