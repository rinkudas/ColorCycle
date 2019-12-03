import React, {Component} from 'react'; 

class TimerInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval: ''
        };
    }

    handleOnChange = event => {        
        this.setState({
            [event.target.name]: event.target.value
        },() => 
            this.props.inputCallback(this.state.interval)
        );
    }
    render() {
        return (
            <form className="timer-input-form">
                <label htmlFor='interval'>Interval:</label>
                <input type="text" name="interval" onChange={this.handleOnChange} value={ this.props.value} disabled={this.props.disabled}/> ms
            </form>
        );
    }
}

export default TimerInput; 