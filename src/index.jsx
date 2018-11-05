import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as api from './api';
import TextItem from './TextItem.jsx';
// import ComponentName from '../subdir/ComponentFilename.jsx';

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
  timestamp: 'no timestamp yet',
  buttonArg: 'no button arg yet',
  text: ''
  };
  //subscribeToTimer((err, timestamp) => {this.setState({
  //  timestamp: timestamp
  //}); console.log('time callback!');});
}

componentDidMount() {
  api.subscribeToTimer((err, timestamp) => {this.setState({timestamp});
                                            console.log('time callback!');});

  api.subscribeToButton((err,buttonArg) => {this.setState({buttonArg});
                                            console.log('buttton callback!');});
}

multiButton() {
  return(
  <button className='CheckButton' onClick={() => {api.pressButton()}}>Button</button>);
}

render() {
  return (
    <div className="App">
      <p className="App-intro">
      This is the timer value: {this.state.timestamp ? new Date(this.state.timestamp).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZoneName: 'short'
          }) : "no date yet"}
      </p>
      <p className="Button-info">
      Button last pressed at: {this.state.buttonArg ? new Date(this.state.buttonArg).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZoneName: 'short'
          }) : "no date yet"}
      </p>
      {this.multiButton()}

      <TextItem text={this.state.text}/>
    </div>
  );
}

}

ReactDOM.render(<App/>, document.getElementById('appPage'));
