import React from "react";
import { FirebaseContext } from "./Firebase";
import Chart from "chart.js";

class Canvas extends React.Component {
  state = { value: "", chart: null };
  chartRef = React.createRef();

  componentDidMount() {
    this.setState({ value: "Day" });
    this.drawChart(this.context.getVisitorsByDay, "Daily Visitors");
  }
  drawChart = async (func, text) => {
    let data = await func();
    let chart = new Chart(this.chartRef.current, {
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
          text: text
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
    this.setState({ chart: chart });
  };

  handleChange = event => {
    let value = event.target.value;
    this.setState({ value: value }, this.renderGraph(value));
  };

  renderGraph = value => {
    if (this.state.chart) {
      this.state.chart.destroy();
    }
    switch (value) {
      case "Day":
        this.drawChart(this.context.getVisitorsByDay, "Daily Visitors");
        break;
      case "Month":
        this.drawChart(this.context.getVisitorsByMonth, "Monthly Visitors");
        break;
      case "Year":
        this.drawChart(this.context.getVisitorsByYear, "Yearly Visitors");
        break;
      default:
    }
  };
  render() {
    return (
      <div>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="Day">Day</option>
          <option value="Month">Month</option>
          <option value="Year">Year</option>
        </select>
        <div
          className="visitor-graph"
          style={{ position: "relative", height: "50vh", width: "30vw" }}
        >
          <canvas
            ref={this.chartRef}
            id="myDayChart"
            width="100px"
            height="600px"
          />
        </div>
      </div>
    );
  }
}
Canvas.contextType = FirebaseContext;

export default Canvas;
