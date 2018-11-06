import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as api from './api';
import TextItem from './TextItem.jsx';
//import soundfile from '../assets/glass-ping.mp3';
import Sound from 'react-sound';
import {Howl, Howler} from 'howler';
import ReactHowler from 'react-howler';
import Vimeo from '@u-wave/react-vimeo';
import './styles.css';


//var pingSound = require('../glass-ping.mp3');
// import pingSound from "../glass-ping.mp3"
// import image1 from "../kiss.jpg"
// import ComponentName from '../subdir/ComponentFilename.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: '',
      buttonArg: '',
      video: 1,
      sound1playing: false,
      relieve: {a: "lehtëso veten", b: "zvigadzirire iwe pachako", c: "бошотпойт бол"},
      getmoney: {a: "kuwana mari", b: "акча алуу", c: "mendapatkan uan"},
      relieveWhich: 0,
      moneyWhich: 0,
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

relieve() {
  if (this.state.relieveWhich == 0) {
    return (this.state.relieve.a);}
    else if (this.state.relieveWhich == 1) {
        return (this.state.relieve.b);
    }
    else {
      return (this.state.relieve.c);
    }
}

money() {
  if (this.state.moneyWhich == 0) {
    return (this.state.getmoney.a);}
    else if (this.state.moneyWhich == 1) {
        return (this.state.getmoney.b);
    }
    else {
      return (this.state.getmoney.c);
    }
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


UButton() {
  return(
  <button className='CheckButton' onClick={() => {api.pressButton(); this.setState({video: 2});
    this.setState({relieveWhich: Math.floor((Math.random() * 3))});
    this.playSound1();}}>{this.relieve()}</button>);
}

BButton() {
  return(
  <button className='CheckButton' onClick={() => {api.pressButton(); this.setState({video: 3});
    this.setState({moneyWhich: Math.floor((Math.random() * 3))});
    this.playSound1();}}>{this.money()}</button>);
}

TimeText() {
    if (this.state.buttonArg != '') {
      return (
        new Date(this.state.buttonArg).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
                timeZoneName: 'short'
              }).toLowerCase()

      );
  }
  else if (this.state.timestamp != '') {
    return (
      new Date(this.state.timestamp).toLocaleString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true,
              timeZoneName: 'short'
            }).toLowerCase()


      ); }
  else {
    return (
    "I don't know when");}
}

videoVid() {
  if (this.state.video == 1) {
    return (
      <div className="VidDiv">
    <Vimeo
video="5358349"
autoplay="true" volume="0"/>
</div>);}
else if (this.state.video == 2) {
  return (
    <div className="VidDiv">
  <Vimeo
video="36912360"
autoplay="true" volume="0"/>
</div>
);
}
  else {
    return (
      <div className="VidDiv">
    <Vimeo
  video="153447976"
  autoplay="true" volume="0"/>
  </div>
  );
  }
}


render() {
  return (
    <div className="App">
      <div className='PageBG'></div>
      <p className="TitleText">
        {this.TimeText()}
        </p>
      {this.sound1()}
      {this.videoVid()}
      <div className="VidDiv">
  {this.UButton()}
  {this.BButton()}
  </div>
</div>
  );
}

}

ReactDOM.render(<App/>, document.getElementById('appPage'));
