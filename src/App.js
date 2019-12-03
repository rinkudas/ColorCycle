import React, {Component} from 'react'; 
import './App.css';
import ColorDisplayScreen from './components/ColorDisplayScreen';
import ColorInputUnit from './components/ColorInputUnit';
import TimerInput from './components/TimerInput';
import ActionButton from './components/ActionButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rcolor: '10',
      gcolor: '1b',
      bcolor: 'ab',
      rinc: 15,
      ginc: 5,
      binc: 10,
      bgcolor: "#101bab",
      interval: '250',
      allowInput: true
    };
    this.changeColor = this.changeColor.bind(this);
    this.ciu1 = React.createRef();
    this.ciu2 = React.createRef();
    this.ciu3 = React.createRef();
  }

  changeColor = () => {
    const r = this.computeColorComponent(this.state.rcolor, this.state.rinc);
    const g = this.computeColorComponent(this.state.gcolor, this.state.ginc);
    const b = this.computeColorComponent(this.state.bcolor, this.state.binc);
    const color = '#' + r + '' + g + '' + b;
    this.setState({bgcolor: color, rcolor: r, bcolor: b, gcolor: g});
    this.ciu1.current.updateState(r);
    this.ciu2.current.updateState(g);
    this.ciu3.current.updateState(b);
  }

  computeColorComponent = (current, inc) => {
    const c = parseInt(current, 16);
    const i = c + parseInt(inc);
    const f = Math.round(i % 256).toString(16).padStart(2, "0");
    return f;
  }

  handleInterval = unit => {
    this.setState({interval: unit});
  }

  handleColorUnit = (obj, title) => {
    switch(title){
      case 'R': this.setState({rcolor: obj.colorcode});
                this.setState({rinc: obj.colorinc});
                break;
      case 'G': this.setState({gcolor: obj.colorcode});
                this.setState({ginc: obj.colorinc});
                break;
      case 'B': this.setState({bcolor: obj.colorcode});
                this.setState({binc: obj.colorinc});
                break;
    }

  }

  handleBtnClick = btnState => {
    this.setState({allowInput: !btnState});
    switch(btnState){
      case true: this.timer = setInterval(this.changeColor, this.state.interval);
                  break;

      case false: clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div className="App">
        <ColorDisplayScreen bgcolor={this.state.bgcolor}/>
        <div>
          <div className="label">
            <br/><br/>
            <span>#</span><br/><br/>
            <span>Increment:</span>
          </div>
          <ColorInputUnit ref={this.ciu1} inputCallback={this.handleColorUnit.bind(this)} title="R" color={this.state.rcolor} inc={this.state.rinc} disabled={!this.state.allowInput}/>
          <ColorInputUnit ref={this.ciu2} inputCallback={this.handleColorUnit.bind(this)} title="G" color={this.state.gcolor} inc={this.state.ginc} disabled={!this.state.allowInput}/>
          <ColorInputUnit ref={this.ciu3} inputCallback={this.handleColorUnit.bind(this)} title="B" color={this.state.bcolor} inc={this.state.binc} disabled={!this.state.allowInput}/>
          
        </div>
        <div>
          <div className="timer-div">
            <TimerInput inputCallback={this.handleInterval.bind(this)} value={this.state.interval} disabled={!this.state.allowInput}/>
          </div>
          <ActionButton inputCallback={this.handleBtnClick.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default App;
