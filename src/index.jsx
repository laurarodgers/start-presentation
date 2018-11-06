import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as api from './api';
//import TextItem from './TextItem.jsx';
//import soundfile from '../assets/glass-ping.mp3';
import {Howl, Howler} from 'howler';
import ReactHowler from 'react-howler';
import Speech from 'react-speech';
import './styles.css';
//import Image from 'react-image-resizer';


//"curve"
const prompts0U =
  ["ויסבייג","puri","ខ្សែកោង","kurva","կորի","වක්රය","çûvelan","usoro","వక్రత","curve"];

//"sphere"
const prompts0O =
  ["Ayika", "جسم كروى", "sfera", "sphaera", "sohada", "kúla", "구체", "avanoa", "соҳа", "küre"];

// "relieve yourself"
const prompts1WASHROOM =
  ["lehtëso veten", "zvigadzirire iwe pachako",
  "бошотпойт бол",  "hoʻomahaʻoe",
  "өзіңізді босатыңыз", "faoiseamh duit féin",
  "너 자신을 풀어 라.", "پنهنجو پاڻ کي رهو",
  "daws koj tus kheej", "באַפרייַען זיך"];

//"change elevation"
const prompts1STAIRS =
  ["yükseklik değiştirmek", "高度を変更する", "ປ່ຽນຄວາມສູງ", "bidla fl-elevazzjoni", "ከፍታ ይለውጡ", "mainīt augstumu", "athrú ingearchló", "canvia l'elevació", "miova ny elevation", "änneren"];

//"get money"
const prompts2BANK =
  ["Geld kritt", "ստանալ գումար", "پئسا وٺ", "получать деньги", "kupeza ndalama", "بدست آوردن پول", "hel lacag", "ਪੈਸੇ ਕਮਾਓ", "nhận tiền", "fumana imali"];

//"compute"
const prompts3LAPTOP =
  ["qulunqa", "คำนวณ", "izračunati", "bereken", "गणना करना", "ማስላት", "مرکب", "пресмета", "compute", "kiszámít"];

//"take a break"
const prompts3COFFEE =
  ["szünetet tartani", "gabh fois", "направи паузу", "phumula", "សំរាក", "завсарлага авах", "ഒരു ഇടവേള എടുക്കുക", "magpahinga", "magpahinga", "taka hlé"];

//"go there"
const prompts4WALK =
  ["Farðu þangað", "저기로가", "vai lì", "అక్కడికి వెళ్ళు", "falbh an sin", "Pojdi tja", "mine sinna", "pitani kumeneko", "go there", "nenda pale"];

//"find them"
const promptsTOGETHER =
  ["онҳоро пайдо кунед", "trovali", "goleki", "e huli iā lākou", "ಅವರನ್ನು ಹುಡುಕಿ", "Nájdi ich", "hitta dem", "Encuéntralos", "ba fumane", "それらを見つけます"];

const vidDelays =
  [0, 0, 39, 35, 30, 34, 32, 38,
   0, 0, 36, 36, 32, 8, 8, 40];

// const vidDelays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

const bgsounds =
["../0917.mp3", "../0917.mp3", "../airport-security-1.mp3",
"../dishwasher-2.mp3", "../scanner-1.mp3", "../airport-gate-1.mp3",
"../restaurant-2.mp3", "..g-t-1.mp3", "../l-c-1.mp3",
"../0917.mp3", "../airport-security-1.mp3", "../dishwasher-2.mp3",
"../scanner-1.mp3", "../airport-gate-1.mp3", "../restaurant-2.mp3", "../g-t-1.mp3" ];

const panelName =
["BGNNNG: ", "CRV: ", "CRVLVTR: ", "CRVWSHRM: ", "CRVMNY: ", "CRVCMPTR: ", "CRVLKNG: ", "CRVCFF: ", "MTNG: ", "SPHR: ", "SPHRSTRS: ", "SPHRWSHRM: ", "SPHRMNY: ", "SPHRCMPTR: ", "SPHRCFF: ", "SPHRRL: "]


const fullPanelName =
["BEGINNING: ", "CURVE: ", "CURVE ELEVATOR: ", "CURVE WASHROOM: ", "CURVE MONEY: ", "CURVE COMPUTER: ", "CURVE LOOKING: ", "CURVE COFFEE: ", "MEETING: ", "SPHERE: ", "SPHERE STAIRS: ", "SPHERE WASHROOM: ", "SPHERE MONEY: ", "SPHERE COMPUTER: ", "SPHERE COFFEE: ", "SPHERE ROLL: "]


const crowdMessages =
["../0917.mp3","../0917.mp3",
"../2.mp3", "../3.mp3", "../0917.mp3", "../5.mp3", "../6.mp3", "../0917.mp3", "../0917.mp3", "../0917.mp3",
"../10.mp3", "../11.mp3", "../0917.mp3","../0917.mp3","../0917.mp3","../0917.mp3","../0917.mp3"]
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
      timestamp: new Date(),
      //last time this user pressed button
      // time anyone last pressed button
      buttonTimestamp: '',
      // active video panel
      panel: STARTSCREEN,
      // control of bell (pinged for global buttonpress)
      sound1playing: false,
      showButtons: true,
      mouseMoved: false,
      population: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      absPopulation: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      crowdMessagem2: false,
      cm2Played: false,
      crowdMessagem3: false,
      cm3Played: false,
      crowdMessagem5: false,
      cm5Played: false,
      crowdMessagem6: false,
      cm6Played: false,
      crowdMessagem10: false,
      cm10Played: false,
      crowdMessagem11: false,
      cm11Played: false,
      promptA: 0,
      promptB: 0,
      finale: false

    };
    this.audio = React.createRef();
}

componentDidMount() {
  api.subscribeToTimer((err, timestamp) => {this.setState({timestamp});
                                            if (this.state.mouseMoved) {
                                              this.changePrompts();
                                              this.setState({mouseMoved: false});
                                            }
                                            //console.log('time callback!')
                                            });

  api.subscribeToButton((err,buttonTimestamp) => {this.setState({buttonTimestamp});
                                            this.playSound1();
                                            console.log('buttton callback!');})

  api.subscribeToPopulation((err,population) => {this.setState({population});});

  api.subscribeToAbsPopn((err,absPopulation) => {this.setState({absPopulation});
                                                console.log('absolute pop callback!');

});

  document.body.style.margin = 0;
                                            //console.log('population callback!');})

 api.updatePopulation(50);
 api.subscribeToCrowdMessage((err,panel) => {
                                            if (panel == 2 && this.state.cm2Played == false) {this.setState({crowdMessagem2: true, cm2Played: true});
                                            setTimeout((() => {this.setState({crowdMessagem2: false})}), 2000);}
                                            if (panel == 3 && this.state.cm3Played == false) {this.setState({crowdMessagem3: true, cm3Played: true});
                                            setTimeout((() => {this.setState({crowdMessagem3: false})}), 2000);}
                                            if (panel == 5 && this.state.cm5Played == false) {this.setState({crowdMessagem5: true, cm5Played: true});
                                            setTimeout((() => {this.setState({crowdMessagem5: false})}), 2000);}
                                            if (panel == 6  && this.state.cm6Played == false) {this.setState({crowdMessagem6: true, cm6Played: true});
                                            setTimeout((() => {this.setState({crowdMessagem6: false})}), 2000);}
                                            if (panel == 10  && this.state.cm10Played == false) {this.setState({crowdMessagem10: true, cm10Played: true});
                                            setTimeout((() => {this.setState({crowdMessagem10: false})}), 2000);}
                                            if (panel == 11  && this.state.cm11Played == false) {this.setState({crowdMessagem11: true, cm11Played: true});
                                            setTimeout((() => {this.setState({crowdMessagem11: false})}), 2000);}
                                           console.log('crowd message callback!' + panel);})
}

bgSound(){
  //console.log("establishig sound 1?");
  //console.log("bgsound");
  return (
  <ReactHowler
        src={bgsounds[this.state.panel]}
        playing={true}
        preload={true}
        loop={true}
        ref="bgsound"

      />);}
//onEnd={() => {this.setState({sound1playing:false})}}
//ref={(ref) => {this.audio = ref;}}
crowdMessages(){
  //console.log("establishig sound 1?");
  return (
    <div>
  <ReactHowler
        src={crowdMessages[2]}
        playing={this.state.crowdMessagem2}
        preload={true}
        loop={false}
      />
  <ReactHowler
        src={crowdMessages[3]}
        playing={this.state.crowdMessagem3}
        preload={true}
        loop={false}
      />
  <ReactHowler
        src={crowdMessages[5]}
        playing={this.state.crowdMessagem5}
        preload={true}
        loop={false}
      />
  <ReactHowler
        src={crowdMessages[6]}
        playing={this.state.crowdMessagem6}
        preload={true}
        loop={false}
      />
  <ReactHowler
        src={crowdMessages[10]}
        playing={this.state.crowdMessagem10}
        preload={true}
        loop={false}
      />
  <ReactHowler
        src={crowdMessages[11]}
        playing={this.state.crowdMessagem11}
        preload={true}
        loop={false}
      />
  </div>
);}

sound1(){
  //console.log("establishig sound 1?");
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

setComeUp(panel) {
  console.log('setting comeup');
  this.setState({showButtons:false});
    setTimeout((() => {this.setState({showButtons:true})}), vidDelays[panel]*1000);
  if (panel == FINAL_TOGETHER) {
    setTimeout((() => {this.setState({finale:true})}), 40000);
  }
}

renderFinale() {
  console.log("in rendering finale");
  if (this.state.finale) {
    console.log("RENDERING FINALE? " + this.state.absPopulation);
    window.Howler.mute(true);
    let populationString = "EYEBALLS: \n";
    for (var i = 0; i < 16; i++) {
          if (this.state.absPopulation[i] > 0) {
            if (i == 13) {
              populationString = populationString + 'SPHERE ALONE: ' + (this.state.absPopulation[i] + this.state.absPopulation[i+1]) +  "\n";
              i = i + 1;
            }
            else {
          populationString = populationString + fullPanelName[i] + this.state.absPopulation[i] + "\n";}
        }}
    return(
      <div className="FinaleBG">
        <p class="FinaleText">
          {populationString}
        </p>
      </div>
    );
  }
  else {
    return(<div/>);
  }
}

buttons() {
  // which button do you want
  //console.log("in buttons");
  if (this.state.showButtons) {
    //console.log('showing buttons');
    switch(this.state.panel) {
      case STARTSCREEN:
        return (
          <div>
          <div className="ButtonDivLeft">
            <button className='NavButton'
              onClick={() => {api.pressButton();
                              api.updatePopulation(-50);
                              api.updatePopulation(U_0OPEN);
                              this.setState({panel: U_0OPEN});
                              this.setComeUp(U_0OPEN);
                              this.changePrompts();
                              this.playSound1();


                            }}>
                            {prompts0U[this.state.promptA]}
           </button></div>
         <div className="ButtonDivRight">
           <button className='NavButton'
             onClick={() => {api.pressButton();
                             api.updatePopulation(-50);
                             api.updatePopulation(O_0OPEN);
                             this.setState({panel: O_0OPEN});
                             this.setComeUp(O_0OPEN);
                             this.changePrompts();
                             this.playSound1();

                           }}>
                           {prompts0O[this.state.promptB]}
          </button>
        </div></div>
        );
      case U_0OPEN:
        return (
          <div>
        <div className="ButtonDivLeft">
          <button className='NavButton'
            onClick={() => {api.pressButton();
                            api.updatePopulation(-U_0OPEN);
                            api.updatePopulation(U_1STAIRS);
                            this.setState({panel: U_1STAIRS});
                            this.setComeUp(U_1STAIRS);
                            this.changePrompts();
                            this.playSound1();

                          }}>
                          {prompts1STAIRS[this.state.promptA]}
         </button></div>
       <div className="ButtonDivRight">
         <button className='NavButton'
           onClick={() => {api.pressButton();
                           api.updatePopulation(-U_0OPEN);
                           api.updatePopulation(U_1WASHROOM);
                           this.setState({panel: U_1WASHROOM});
                           this.setComeUp(U_1WASHROOM);
                           this.changePrompts();
                           this.playSound1();

                         }}>
                         {prompts1WASHROOM[this.state.promptB]}
        </button>
      </div></div>
        );
      case U_1STAIRS:
        return (
          <div className="ButtonDiv">
            <button className='NavButton'
              onClick={() => {api.pressButton();
                              api.updatePopulation(-U_1STAIRS);
                              api.updatePopulation(U_2BANK);
                              this.setState({panel: U_2BANK});
                              this.setComeUp(U_2BANK);
                              this.changePrompts();
                              this.playSound1();
                            }}>
                            {prompts2BANK[this.state.promptA]}
           </button>
        </div>
        );
      case U_1WASHROOM:
      return (
        <div className="ButtonDiv">
          <button className='NavButton'
            onClick={() => {api.pressButton();
                            api.updatePopulation(-U_1WASHROOM);
                            api.updatePopulation(U_2BANK);
                            this.setState({panel: U_2BANK});
                            this.setComeUp(U_2BANK);
                            this.changePrompts();
                            this.playSound1();
                          }}>
                          {prompts2BANK[this.state.promptA]}
         </button>
      </div>
      );
      case U_2BANK:
          return (
            <div>
          <div className="ButtonDivLeft">
            <button className='NavButton'
              onClick={() => {api.pressButton();
                              api.updatePopulation(-U_2BANK);
                              api.updatePopulation(U_3LAPTOP);
                              this.setState({panel: U_3LAPTOP});
                              this.setComeUp(U_3LAPTOP);
                              this.changePrompts();
                              this.playSound1();

                            }}>
                            {prompts3LAPTOP[this.state.promptA]}
           </button></div>
         <div className="ButtonDivRight">
           <button className='NavButton'
             onClick={() => {api.pressButton();
                             api.updatePopulation(-U_2BANK);
                             api.updatePopulation(U_3COFFEE);
                             this.setState({panel: U_3COFFEE});
                             this.setComeUp(U_3COFFEE);
                             this.changePrompts();
                             this.playSound1();

                           }}>
                           {prompts3COFFEE[this.state.promptB]}
          </button>
        </div></div>
          );
      case U_3COFFEE:
        return (
          <div className="ButtonDiv">
            <button className='NavButton'
              onClick={() => {api.pressButton();
                              api.updatePopulation(-U_3COFFEE);
                              api.updatePopulation(U_4WALK);
                              this.setState({panel: U_4WALK});
                              this.setComeUp(U_4WALK);
                              this.changePrompts();
                              this.playSound1();

                            }}>
                            {prompts4WALK[this.state.promptA]}
           </button>
        </div>
        );
      case U_3LAPTOP:
      return (
        <div className="ButtonDiv">
          <button className='NavButton'
            onClick={() => {api.pressButton();
                            api.updatePopulation(-U_3LAPTOP);
                            api.updatePopulation(U_4WALK);
                            this.setState({panel: U_4WALK});
                            this.setComeUp(U_4WALK);
                            this.changePrompts();
                            this.playSound1();

                          }}>
                          {prompts4WALK[this.state.promptA]}
         </button>
      </div>
      );
      case U_4WALK:
        return (
          <div className="ButtonDiv">
            <button className='NavButton'
              onClick={() => {api.pressButton();
                              api.updatePopulation(-U_4WALK);
                              api.updatePopulation(FINAL_TOGETHER);
                              this.setState({panel: FINAL_TOGETHER});
                              this.setComeUp(FINAL_TOGETHER);
                              this.changePrompts();
                              this.playSound1();

                            }}>
                            {promptsTOGETHER[this.state.promptA]}
           </button>
        </div>
        );
      case O_0OPEN:
            return (
              <div>
            <div className="ButtonDivLeft">
              <button className='NavButton'
                onClick={() => {api.pressButton();
                                api.updatePopulation(-O_0OPEN);
                                api.updatePopulation(O_1STAIRS);
                                this.setState({panel: O_1STAIRS});
                                this.setComeUp(O_1STAIRS);
                                this.changePrompts();
                                this.playSound1();

                              }}>
                              {prompts1STAIRS[this.state.promptA]}
             </button></div>
           <div className="ButtonDivRight">
             <button className='NavButton'
               onClick={() => {api.pressButton();
                               api.updatePopulation(-O_0OPEN);
                               api.updatePopulation(O_1WASHROOM);
                               this.setState({panel: O_1WASHROOM});
                               this.setComeUp(O_1WASHROOM);
                               this.changePrompts();
                               this.playSound1();

                             }}>
                             {prompts1WASHROOM[this.state.promptB]}
            </button>
          </div></div>
            );
      case O_1STAIRS:
        return (
          <div className="ButtonDiv">
            <button className='NavButton'
              onClick={() => {api.pressButton();
                              api.updatePopulation(-O_1STAIRS);
                              api.updatePopulation(O_2BANK);
                              this.setState({panel: O_2BANK});
                              this.setComeUp(O_2BANK);
                              this.changePrompts();
                              this.playSound1();
                            }}>
                            {prompts2BANK[this.state.promptA]}
           </button>
        </div>
        );
      case O_1WASHROOM:
        return (
          <div className="ButtonDiv">
            <button className='NavButton'
              onClick={() => {api.pressButton();
                              api.updatePopulation(-O_1WASHROOM);
                              api.updatePopulation(O_2BANK);
                              this.setState({panel: O_2BANK});
                              this.setComeUp(O_2BANK);
                              this.changePrompts();
                              this.playSound1();
                            }}>
                            {prompts2BANK[this.state.promptA]}
           </button>
        </div>
        );
      case O_2BANK:
          return (
            <div>
          <div className="ButtonDivLeft">
            <button className='NavButton'
              onClick={() => {api.pressButton();
                              api.updatePopulation(-O_2BANK);
                              api.updatePopulation(O_3LAPTOP);
                              this.setState({panel: O_3LAPTOP});
                              this.setComeUp(O_3LAPTOP);
                              this.changePrompts();
                              this.playSound1();

                            }}>
                            {prompts3LAPTOP[this.state.promptA]}
           </button></div>
         <div className="ButtonDivRight">
           <button className='NavButton'
             onClick={() => {api.pressButton();
                             api.updatePopulation(-O_2BANK);
                             api.updatePopulation(O_3COFFEE);
                             this.setState({panel: O_3COFFEE});
                             this.setComeUp(O_3COFFEE);
                             this.changePrompts();
                             this.playSound1();

                           }}>
                           {prompts3COFFEE[this.state.promptB]}
          </button>
        </div></div>
          );
      case O_3LAPTOP:
        return (
          <div className="ButtonDiv">
            <button className='NavButton'
              onClick={() => {api.pressButton();
                              api.updatePopulation(-O_3LAPTOP);
                              api.updatePopulation(O_4WALK);
                              this.setState({panel: O_4WALK});
                              this.setComeUp(O_4WALK);
                              this.changePrompts();
                              this.playSound1();

                            }}>
                            {prompts4WALK[this.state.promptA]}
           </button>
        </div>
        );
      case O_3COFFEE:
        return (
          <div className="ButtonDiv">
            <button className='NavButton'
              onClick={() => {api.pressButton();
                              api.updatePopulation(-O_3COFFEE);
                              api.updatePopulation(O_4WALK);
                              this.setState({panel: O_4WALK});
                              this.setComeUp(O_4WALK);
                              this.changePrompts();
                              this.playSound1();

                            }}>
                            {prompts4WALK[this.state.promptA]}
           </button>
        </div>
        );
      case O_4WALK:
      return (
        <div className="ButtonDiv">
          <button className='NavButton'
            onClick={() => {api.pressButton();
                            api.updatePopulation(-O_4WALK);
                            api.updatePopulation(FINAL_TOGETHER);
                            this.setState({panel: FINAL_TOGETHER});
                            this.setComeUp(FINAL_TOGETHER);
                            this.changePrompts();
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
  else {
    return (<div/>);
  }
}

changePrompts() {
  this.setState({promptA: Math.floor((Math.random() * 10))});
  this.setState({promptB: Math.floor((Math.random() * 10))});
}

PopulationText() {
  let populationString = "PPLTN: \n";
  for (var i = 0; i < 16; i++) {
        if (this.state.population[i] > 0) {
          if (i == 13) {
            let totalNum = this.state.population[i] + this.state.population[i+1];
            populationString = populationString + 'SPHRALN: ' + totalNum +  "\n";
            i = i + 1;
          }
          else {
        populationString = populationString + panelName[i] + this.state.population[i] + "\n";}
      }
    }

  return (
    <div>
      <p className="PopulationPrintout">
        {populationString}
      </p>
    </div>
  )
}

TimeText() {
    if (this.state.buttonTimestamp != '') {
      //console.log('button timestamp: '+ this.state.buttonTimestamp);
      let date = new Date(this.state.buttonTimestamp);
      let ref_date = new Date();
      let diff_date = ref_date-date;
      //console.log('diff date: '+ diff_date);
      let hours = Math.floor(diff_date/3600000);
      if (hours < 10) {
        hours = "0" + hours;
      }
      let mins = Math.floor((diff_date-hours*3600000)/60000);
      if (mins < 10) {
        mins = "0" + mins;
      }
      let secs = Math.floor((diff_date-hours*3600000-mins*60000)/1000);
      if (secs < 10) {
        secs = "0" + secs;
      }
      return (
        hours + ":" + mins + ":" + secs
      //()=>{dateFormat(diff_date, "hh:MM:ss")};
        //ref_date = ref_date ? new Date(ref_date) : new Date();



        //this.humanized_time_span(this.state.buttonTimestamp)

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
      let date = new Date(this.state.timestamp);
      //console.log('diff date: '+ diff_date);
      let hours = Math.floor(date/3600000);
      if (hours < 10) {
        hours = "0" + hours;
      }
      let mins = Math.floor((date-hours*3600000)/60000);
      if (mins < 10) {
        mins = "0" + mins;
      }
      let secs = Math.floor((date-hours*3600000-mins*60000)/1000);
      if (secs < 10) {
        secs = "0" + secs;
      }
      return (
      "00:" + mins + ":" + secs);
      // new Date(this.state.timestamp).toLocaleString('en-US', {
      //   hour: 'numeric',
      //   minute: 'numeric',
      //   second: 'numeric',
      //   hour12: true
      }
      // new Date(this.state.timestamp).toLocaleString('en-US', {
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
  else {
    return (
    "i don't know when");}
}

videoPanel() {
  switch(this.state.panel) {
    case STARTSCREEN:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
        </div>
      );
    case U_0OPEN:
      return (
        <div onMouseMove={(e) => this.handleMouseMove(e)}>
          <img
          src="../U.jpg"
          className="TitleImage"
        />
        </div>
      );
    case U_1STAIRS:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/489ddeb0191fe5c6c0/b2f93f8fc3c6acbb?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case U_1WASHROOM:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/489ddeb01919e4c1c0/fb8cde0f81b24e24?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case U_2BANK:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/d49ddeb01919e4c25c/8f920320563f4217?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case U_3LAPTOP:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/4c9ddeb01919e4c4c4/360da22554e2fca4?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case U_3COFFEE:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/a49ddeb01919e4c62c/52e7895790efd1a7?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case U_4WALK:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/709ddeb0191ee5c1f8/c31a4698d13a9e14?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case O_0OPEN:
      return (
        <div onMouseMove={(e) => this.handleMouseMove(e)}>
          <img
          src="../O.jpg"
          className="TitleImage"
        />
        </div>
      );
    case O_1STAIRS:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/709ddeb0181ae1c0f8/abd20eceba2243cb?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case O_1WASHROOM:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/e89ddeb0181ae6c960/67b2897ce9c0de38?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case O_2BANK:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/1c9ddeb0181beac594/668a5aae7aec1d99?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case O_3LAPTOP:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/1c9ddeb01818e1cd94/38f18e8204d400eb?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case O_3COFFEE:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/1c9ddeb01818e1cd94/38f18e8204d400eb?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case O_4WALK:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/4c9ddeb01819e0c1c4/1d463b38ab4acaf2?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437'  className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
    case FINAL_TOGETHER:
      return (
        <div className="VidDiv" onMouseMove={(e) => this.handleMouseMove(e)}>
          <iframe class='sproutvideo-player' src='//videos.sproutvideo.com/embed/e89ddeb01819e1cd60/73434e38189ed8b6?autoPlay=true&amp;showControls=false&amp;playerTheme=dark&amp;playerColor=2f3437' className="VidStyle" frameborder='0' allowfullscreen></iframe>
        </div>
      );
  }
}

handleMouseMove(e) {
    this.setState({mouseMoved: true});
    //console.log('new mousemove, who dis: ', this);
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
      <div className='PageBG' onMouseMove={(e) => this.handleMouseMove(e)}></div>
      {this.renderFinale()}
      <p className="TitleText">
        {this.TimeText()}
        </p>
      {this.bgSound()}
      {this.sound1()}
      {this.crowdMessages()}
      {this.PopulationText()}
      {this.videoPanel()}
      {this.buttons()}
</div>
  );
}

}

ReactDOM.render(<App/>, document.getElementById('appPage'));
