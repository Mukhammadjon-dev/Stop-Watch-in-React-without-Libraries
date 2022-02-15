import React from "react";
import ReactDOM from "react-dom";

class StopWatch extends React.Component {
  state = {
    second: 0,
    minute: 0,
    hour: 0,
    startDisabled: false,
    interval: "",
    savedIntervals: [],
  };

  onStartClicked = () => {
    this.setState({
      startDisabled: true,
    });

    let i = setInterval(() => {
      const { second, minute, hour } = this.state;
      if (second === 59) {
        if (minute === 59) {
          this.setState({
            second: 0,
            minute: 0,
            hour: hour + 1,
          });
        } else {
          this.setState({
            second: 0,
            minute: minute + 1,
          });
        }
      } else {
        this.setState({
          second: second + 1,
        });
      }
    }, 1000);
    this.setState({
      interval: i,
    });
  };

  onStopClicked = () => {
    clearInterval(this.state.interval);
    this.setState({
      startDisabled: false,
    });
  };

  onIntervalClicked = () => {
    const { savedIntervals, second, minute, hour } = this.state;
    savedIntervals.push(hour + ":" + minute + ":" + second);
    this.setState({
      savedIntervals: savedIntervals,
    });
  };

  onClearClicked = () => {
    this.onStopClicked();
    this.setState({
      second: 0,
      minute: 0,
      hour: 0,
      savedIntervals: [],
    });
  };

  render() {
    const { second, minute, hour, startDisabled, savedIntervals } = this.state;

    return (
      <div>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-4 offset-3">
              <div className="card">
                <div className="card-header">
                  <h2>Stop Watch</h2>
                </div>
                <div className="card-body">
                  <h2 className="text-center">
                    {" "}
                    {hour}:{minute}:{second}{" "}
                  </h2>
                </div>
                <div className="card-footer">
                  <div className="row">
                    <div className="col-md-3">
                      <button
                        className="btn btn-success"
                        onClick={this.onStartClicked}
                        disabled={startDisabled}
                      >
                        Start
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-warning"
                        onClick={this.onStopClicked}
                      >
                        Stop
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-info"
                        disabled={!startDisabled}
                        onClick={this.onIntervalClicked}
                      >
                        Interval
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-danger"
                        onClick={this.onClearClicked}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  {savedIntervals.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        ;
      </div>
    );
  }
}
ReactDOM.render(<StopWatch />, document.getElementById("root"));
