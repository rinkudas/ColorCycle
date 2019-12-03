import React, {Component} from 'react'; 

class ActionButton extends Component {
  constructor(props) {
    super();
    this.state = { 
      buttonText: "Start",
      started: false
    };
  }

  click = e => {
    this.setState({ buttonText: (this.state.buttonText === 'Start') ? "Stop" : "Start", started: !this.state.started},
    () => 
        this.props.inputCallback(this.state.started)            
    );
  };

  render() {
    return (
      <div className="btn-div">
        <button className="action-btn" onClick={this.click}>
          {this.state.buttonText}
        </button>
      </div>
    );
  }
}

export default ActionButton; 