import React, {Component} from 'react'; 
import { isValid } from 'ipaddr.js';
  
class ColorInputUnit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorcode: this.props.color,
            colorinc: this.props.inc
        };
    }

    updateState = (cc) =>{
        this.setState({colorcode: cc});
    }

    notValid = str => {
        const regexp = /^[0-9a-fA-F]{1,2}$/;  
        return !regexp.test(str);
    }

    handleOnChange = event => {
        if(event.target.name === 'colorcode'){
            if(this.notValid(event.target.value)){
                alert("Not Valid Hex code");
                return;
            }
        }
        this.setState({
            [event.target.name]: event.target.value
        }, () =>{
            this.props.inputCallback(this.state, this.props.title)
        });
    }
    render() {
        return (
            <form className="color-input-form">
                { this.props.title } <br/><br/>
                <input type="text" name="colorcode" pattern="^([a-fA-F0-9]{2})$" onChange={this.handleOnChange} value={this.props.color} disabled={this.props.disabled}/><br/><br/>
                <input type="text" name="colorinc" onChange={this.handleOnChange} value={this.props.inc} disabled={this.props.disabled}/>
            </form>
        );
    }
} 
  
export default ColorInputUnit; 