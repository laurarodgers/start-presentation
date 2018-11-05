import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as api from './api';
import TextItem from './TextItem.jsx';
//import soundfile from '../assets/glass-ping.mp3';
import Sound from 'react-sound';
import {Howl, Howler} from 'howler';
import ReactHowler from 'react-howler';
// import ComponentName from '../subdir/ComponentFilename.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'no timestamp yet',
      buttonArg: 'no button arg yet',
      text: '',
      sound1playing: false,
      buttonURL: "../glass-ping.mp3",
    };
    this.audio = React.createRef();
  //subscribeToTimer((err, timestamp) => {this.setState({
  //  timestamp: timestamp
  //}); console.log('time callback!');});
}

componentDidMount() {
  api.subscribeToTimer((err, timestamp) => {this.setState({timestamp});
                                            console.log('time callback!');});

  api.subscribeToButton((err,buttonArg) => {this.setState({buttonArg});
                                            this.playSound1();
                                            console.log('buttton callback!');});

//   this.sound1 = new Howl({
//   src: ["../assets/glass-ping.mp3", "../assets/glass-ping.wav"],
//   autoplay: false,
//   loop: false,
//   volume: 1,
//   onend: function() {
//     console.log('Finished!');
//   }
// });
}

sound1(){
  console.log("establishig sound 1?");
  return (
  <ReactHowler
        src="../glass-ping.mp3"
        playing={this.state.sound1playing}
        preload={true}
        loop={false}
        ref="sound1"
        ref={(ref) => {this.audio = ref;}}
        onEnd={() => {this.setState({sound1playing:false})}}
      />);}

playSound1() {
  console.log("playing sound 1?");
  console.log(this.audio.howler.state());
  this.setState({sound1playing: true});
  this.audio.howler.play();
  //this.setState({sound1playing: true});
}

//onEnd={this.audio.howler([loop], [id])}

//playing={false}

//onEnd={()=>{this.setState({sound1playing: false})}}


        //ref={(ref) => (this.player = ref)}
    // var self = this;
    // //var sprite = self._spriteMap[key];
    //
    //   // Play the sprite sound and capture the ID.
    // var id = self.sound1.play();
    //
    // // When this sound is finished, remove the progress element.
    // self.sound1.once('end', function() {
    //   }, id);
    // }
  // var audio = document.getElementById("mySoundClip");
  // audio.play();
  // }

// playSound() {
//  this.myRef = React.createRef();
//  if(this.state.isPlaying)
//   return (
//    <audio ref={this.myRef} src={this.state.buttonURL} autoPlay/>
//   );
  // if (this.state.isPlaying) {
  //   console.log("button sound!");
  //   return (
  //     <Sound
  //       url={this.state.buttonURL}
  //       playStatus={Sound.status.PLAYING}
  //       onFinishedPlaying={() => {this.setState({isPlaying: false});}}
  //        />);}
  // else {
  //   return (<div/>);
  //}
 //  return (
 //  <div>
 // <audio ref="audio_tag" src="./assets/glass-ping.mp3" controls autoPlay/>
 // </div>)
//}


multiButton() {
  return(
  <button className='CheckButton' onClick={() => {api.pressButton(); this.playSound1();}}>Button</button>);
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
      {this.sound1()}

      <TextItem text={this.state.text}/>
    </div>
  );
}

}

ReactDOM.render(<App/>, document.getElementById('appPage'));
