import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as api from './api';
//import TextItem from './TextItem.jsx';
//import soundfile from '../assets/glass-ping.mp3';
import {Howl, Howler} from 'howler';
import ReactHowler from 'react-howler';
import Image from 'react-image-resizer';
import './styles.css';



const prompts0U =
  ["U","U","U","U","U","U","U","U","U","U"];

const prompts0O =
  ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"];
// "relieve yourself"
const prompts1WASHROOM =
  ["lehtëso veten", "zvigadzirire iwe pachako",
  "бошотпойт бол",  "hoʻomahaʻoe",
  "өзіңізді босатыңыз", "faoiseamh duit féin",
  "너 자신을 풀어 라.", "پنهنجو پاڻ کي رهو",
  "daws koj tus kheej", "באַפרייַען זיך"];

const prompts1STAIRS =
  ["stairs", "stairs", "stairs", "stairs", "stairs", "stairs", "stairs", "stairs", "stairs", "stairs"];

const prompts2BANK =
  ["bank", "bank", "bank", "bank", "bank", "bank", "bank", "bank", "bank", "bank"];

const prompts3LAPTOP =
  ["laptop", "laptop", "laptop", "laptop", "laptop", "laptop", "laptop", "laptop", "laptop", "laptop"];

const prompts3COFFEE =
  ["coffee", "coffee", "coffee", "coffee", "coffee", "coffee", "coffee", "coffee", "coffee", "coffee"];

const prompts4WALK =
  ["walk", "walk", "walk", "walk", "walk", "walk", "walk", "walk", "walk", "walk"];

const promptsTOGETHER =
  ["together", "together", "together", "together", "together", "together", "together", "together", "together", "together"];

// scenes:
// opening
const STARTSCREEN = 0;
// U:
// opening
const U_0OPEN = 1;
// stairs, washroom
const U_1STAIRS = 2; const U_1WASHROOM = 3;
// bank
const U_2BANK = 4;
// laptop, coffee
const U_3LAPTOP = 5; const U_3COFFEE = 6;
// walking
const U_4WALK = 7;
// together
const FINAL_TOGETHER = 8;
//
// O (BALL):
// opening
const O_0OPEN = 9;
// stairs, washroom
const O_1STAIRS = 10; const O_1WASHROOM = 11;
// bank
const O_2BANK = 12;
// store, mailbox
const O_3LAPTOP = 13; const O_3COFFEE = 14;
// walking
const O_4WALK = 15;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // time sent from server
      timestamp: '',
      // time anyone last pressed button
      buttonTimestamp: '',
      // active video panel
      panel: STARTSCREEN,
      // control of bell (pinged for global buttonpress)
      sound1playing: false,
      promptA: 0,
      promptB: 0,
    };
    this.audio = React.createRef();
}

componentDidMount() {
  api.subscribeToTimer((err, timestamp) => {this.setState({timestamp});
                                            console.log('time callback!');});

  api.subscribeToButton((err,buttonTimestamp) => {this.setState({buttonTimestamp});
                                            this.playSound1();
                                            console.log('buttton callback!');})
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

buttons() {
  // which button do you want
  console.log("in buttons");
  switch(this.state.panel) {
    case STARTSCREEN:
      return (
        <div className="ButtonDiv">
          <button className='NavButton'
            onClick={() => {api.pressButton();
                            this.setState({panel: U_0OPEN});
                            this.changepromptA();
                            this.playSound1();
                          }}>
                          {prompts0U[this.state.promptA]}
         </button>
         <button className='NavButton'
           onClick={() => {api.pressButton();
                           this.setState({panel: O_0OPEN});
                           this.changepromptB();
                           this.playSound1();
                         }}>
                         {prompts0O[this.state.promptB]}
        </button>
      </div>
      );
    case U_0OPEN:
      return (
      <div className="ButtonDiv">
        <button className='NavButton'
          onClick={() => {api.pressButton();
                          this.setState({panel: U_1STAIRS});
                          this.changepromptA();
                          this.playSound1();
                        }}>
                        {prompts1STAIRS[this.state.promptA]}
       </button>
       <button className='NavButton'
         onClick={() => {api.pressButton();
                         this.setState({panel: U_1WASHROOM});
                         this.changepromptB();
                         this.playSound1();
                       }}>
                       {prompts1WASHROOM[this.state.promptB]}
      </button>
    </div>
      );
    case U_1STAIRS:
    case U_1WASHROOM:
      return (
        <div className="ButtonDiv">
          <button className='NavButton'
            onClick={() => {api.pressButton();
                            this.setState({panel: U_2BANK});
                            this.changepromptA();
                            this.playSound1();
                          }}>
                          {prompts2BANK[this.state.promptA]}
         </button>
      </div>
      );
    case U_2BANK:
    return (
    <div className="ButtonDiv">
      <button className='NavButton'
        onClick={() => {api.pressButton();
                        this.setState({panel: U_3LAPTOP});
                        this.changepromptA();
                        this.playSound1();
                      }}>
                      {prompts3LAPTOP[this.state.promptA]}
     </button>
     <button className='NavButton'
       onClick={() => {api.pressButton();
                       this.setState({panel: U_3COFFEE});
                       this.changepromptB();
                       this.playSound1();
                     }}>
                     {prompts3COFFEE[this.state.promptB]}
    </button>
  </div>
    );
    case U_3COFFEE:
    case U_3LAPTOP:
      return (
        <div className="ButtonDiv">
          <button className='NavButton'
            onClick={() => {api.pressButton();
                            this.setState({panel: U_4WALK});
                            this.changepromptA();
                            this.playSound1();
                          }}>
                          {prompts4WALK[this.state.promptA]}
         </button>
      </div>
      );
    case U_4WALK:
    case O_4WALK:
      return (
        <div className="ButtonDiv">
          <button className='NavButton'
            onClick={() => {api.pressButton();
                            this.setState({panel: FINAL_TOGETHER});
                            this.changepromptA();
                            this.playSound1();
                          }}>
                          {promptsTOGETHER[this.state.promptA]}
         </button>
      </div>
      );
    case FINAL_TOGETHER:
      return (<div/>);
  }
}

changepromptA() {
  this.setState({promptA: Math.floor((Math.random() * 10))});
}

changepromptB() {
  this.setState({promptB: Math.floor((Math.random() * 10))});
}

TimeText() {
    if (this.state.buttonTimestamp != '') {
      return (
        this.humanized_time_span(this.state.buttonTimestamp)
        // new Date(this.state.buttonTimestamp).toLocaleString('en-US', {
        //         weekday: 'short',
        //         month: 'short',
        //         day: 'numeric',
        //         year: 'numeric',
        //         hour: 'numeric',
        //         minute: 'numeric',
        //         second: 'numeric',
        //         hour12: true,
        //         timeZoneName: 'short'
        //       }).toLowerCase()

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

videoPanel() {
  switch(this.state.panel) {
    case STARTSCREEN:
      return (
        <div className="VidDiv">
          <p className="MessageText">
            This is the start.
          </p>
        </div>
      );
    case U_0OPEN:
      return (
        <div className="VidDiv">
          <p className="MessageText">
            U
          </p>
        </div>
      );
    case U_1STAIRS:
      return (
        <div className="VidDiv">
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/489ddeb0191fe5c6c0/b2f93f8fc3c6acbb?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case U_1WASHROOM:
      return (
        <div className="VidDiv">
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/489ddeb01919e4c1c0/fb8cde0f81b24e24?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case U_2BANK:
      return (
        <div className="VidDiv">
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/d49ddeb01919e4c25c/8f920320563f4217?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case U_3LAPTOP:
      return (
        <div className="VidDiv">
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/4c9ddeb01919e4c4c4/360da22554e2fca4?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case U_3COFFEE:
      return (
        <div className="VidDiv">
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/a49ddeb01919e4c62c/52e7895790efd1a7?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case U_4WALK:
      return (
        <div className="VidDiv">
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/709ddeb0191ee5c1f8/c31a4698d13a9e14?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case O_0OPEN:
      return (
        <div className="VidDiv">
          <p className="MessageText">
            O
          </p>
        </div>
      );
    case O_1STAIRS:
      return (
        <div className="VidDiv">
        </div>
      );
    case O_1WASHROOM:
      return (
        <div className="VidDiv">
        </div>
      );
    case O_2BANK:
      return (
        <div className="VidDiv">
        </div>
      );
    case O_3LAPTOP:
      return (
        <div className="VidDiv">
        </div>
      );
    case O_3COFFEE:
      return (
        <div className="VidDiv">
        </div>
      );
    case O_4WALK:
      return (
        <div className="VidDiv">
        </div>
      );
    case FINAL_TOGETHER:
      return (
        <div className="VidDiv">
        </div>
      );
  }
}

testButton() {
  return(
  <button className='NavButton' onClick={() => {api.pressButton();
    this.playSound1();}}>Test</button>);
}

//##############################################################################
// Copyright (C) 2011 by Will Tomlins
//
// Github profile: http://github.com/layam
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


humanized_time_span(date, ref_date, date_formats, time_units) {
  //Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
  date_formats = date_formats || {
    past: [
      { ceiling: 60, text: "$seconds seconds ago" },
      { ceiling: 3600, text: "$minutes minutes ago" },
      { ceiling: 86400, text: "$hours hours ago" },
      { ceiling: 2629744, text: "$days days ago" },
      { ceiling: 31556926, text: "$months months ago" },
      { ceiling: null, text: "$years years ago" }
    ],
    future: [
      { ceiling: 60, text: "in $seconds seconds" },
      { ceiling: 3600, text: "in $minutes minutes" },
      { ceiling: 86400, text: "in $hours hours" },
      { ceiling: 2629744, text: "in $days days" },
      { ceiling: 31556926, text: "in $months months" },
      { ceiling: null, text: "in $years years" }
    ]
  };
  //Time units must be be ordered largest -> smallest
  time_units = time_units || [
    [31556926, 'years'],
    [2629744, 'months'],
    [86400, 'days'],
    [3600, 'hours'],
    [60, 'minutes'],
    [1, 'seconds']
  ];

  date = new Date(date);
  ref_date = ref_date ? new Date(ref_date) : new Date();
  var seconds_difference = (ref_date - date) / 1000;

  var tense = 'past';
  if (seconds_difference < 0) {
    tense = 'future';
    seconds_difference = 0-seconds_difference;
  }

  function get_format() {
    for (var i=0; i<date_formats[tense].length; i++) {
      if (date_formats[tense][i].ceiling == null || seconds_difference <= date_formats[tense][i].ceiling) {
        return date_formats[tense][i];
      }
    }
    return null;
  }

  function get_time_breakdown() {
    var seconds = seconds_difference;
    var breakdown = {};
    for(var i=0; i<time_units.length; i++) {
      var occurences_of_unit = Math.floor(seconds / time_units[i][0]);
      seconds = seconds - (time_units[i][0] * occurences_of_unit);
      breakdown[time_units[i][1]] = occurences_of_unit;
    }
    return breakdown;
  }

  function render_date(date_format) {
    var breakdown = get_time_breakdown();
    var time_ago_text = date_format.text.replace(/\$(\w+)/g, function() {
      return breakdown[arguments[1]];
    });
    return depluralize_time_ago_text(time_ago_text, breakdown);
  }

  function depluralize_time_ago_text(time_ago_text, breakdown) {
    for(var i in breakdown) {
      if (breakdown[i] == 1) {
        var regexp = new RegExp("\\b"+i+"\\b");
        time_ago_text = time_ago_text.replace(regexp, function() {
          return arguments[0].replace(/s\b/g, '');
        });
      }
    }
    return time_ago_text;
  }

  return render_date(get_format());
}
//##############################################################################

render() {
  return (
    <div className="App">
      <div className='PageBG'></div>
      <p className="TitleText">
        {this.TimeText()}
        </p>
      {this.sound1()}
      {this.testButton()}
      {this.videoPanel()}
      {this.buttons()}
</div>
  );
}

}

ReactDOM.render(<App/>, document.getElementById('appPage'));
