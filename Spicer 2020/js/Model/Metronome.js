
class Metronome {
  #audioContext;
  #isPlaying;      // Are we currently playing?
  #current16thNote;     // What note is currently last scheduled?
  #tempo;               // tempo (in beats per minute)
  #lookahead;           // How frequently to call scheduling function (in milliseconds)
  #scheduleAheadTime;   // How far ahead to schedule audio (sec). This is calculated from lookahead, and overlaps with next interval (in case the timer is late)
  #nextNoteTime;        // when the next note is due.
  #noteLength;          // length of "beep" (in seconds)
  #timerWorker;         // The Web Worker used to fire timer messages
  #bar;                 //Bar tracker
  #countdown;           //Countdown for recording

  constructor(bpm) {
    this.#audioContext = new AudioContext();
    this.#isPlaying = false;
    this.#current16thNote = 0;
    this.#tempo = bpm;
    this.#lookahead = 25.0;
    this.#scheduleAheadTime = 0.1;
    this.#nextNoteTime = 0.0;
    this.#noteLength = 0.05;
    this.#timerWorker = new Worker("js/Model/metronomeWorker.js");
    this.#bar = -1;
    this.#countdown = 4;

    //Manages the messages received from the Worker
    this.#timerWorker.onmessage = function (e) {
      if (e.data == "schedule") {
          // while there are notes that will need to play before the next interval, 
          // schedule them and advance the pointer.
          while (this.#nextNoteTime < this.#audioContext.currentTime + this.#scheduleAheadTime) {
            this.scheduleNote(this.#current16thNote, this.#nextNoteTime);
            this.nextNote();
          }
        }else
        console.log("message: " + e.data);
    }.bind(this); //this changes value in nested functions, so we have to bind the nested this to the current this
    this.#timerWorker.postMessage({ "interval": this.#lookahead });
  }

  setTempo(value) {
    this.#tempo = value;
  }

  getTempo() {
    return this.#tempo;
  }

  // Start and stop the metronome
  play() {
    this.#isPlaying = !this.#isPlaying;

    if(this.#isPlaying){
      this.#current16thNote = 0;
      this.#bar = -1;
      this.#countdown = 4;
      this.#nextNoteTime = this.#audioContext.currentTime;
      this.#timerWorker.postMessage("start");       //Message to worker
      toggleOnAirLight()      //Ligths up the label
    } else {
      this.#timerWorker.postMessage("stop");        //Message to worker
      toggleOnAirLight()      //Ligths off the label
      recorder.stop();
    }
  }

  scheduleNote(beatNumber, time) {

    if (beatNumber % 4)
      return; // we're not on beat

    // create an oscillator
    let osc = this.#audioContext.createOscillator();
    osc.connect(this.#audioContext.destination);

    if(!onAir){
      osc.frequency.value = 440.0;
      setOnAirTxt(this.#countdown) 
      this.#countdown--;
    }
    else{
      if (beatNumber % 16 === 0) {   // beat 0 == high pitch
        osc.frequency.value = 880.0;
      }
      else if (beatNumber % 4 === 0)    // quarter notes = medium pitch
        osc.frequency.value = 440.0;
    } 

  
    osc.start(time);
    osc.stop(time + this.#noteLength);
  }

 /* 
  scheduleNote(beatNumber, time) {

    if (beatNumber % 4)
      return; // we're not on beat

    let drum =[undefined,undefined,undefined]

    // create an oscillator
    let osc = this.#audioContext.createOscillator();
    osc.connect(this.#audioContext.destination);

    if(!onAir){
      osc.frequency.value = 440.0;
      setOnAirTxt(this.#countdown) 
      this.#countdown--;
    }
    else{
      if (beatNumber % 16 === 0) {   // beat 0 == high pitch
        osc.frequency.value = 880.0;
        drum[0] = new Audio('/css/Audio/kickHat.wav');
      }
      else{
        if (beatNumber % 8 === 0){    // 1/2 notes
          drum[0] = new Audio('/css/Audio/kickHard.wav');
        }else{
          if (beatNumber % 4 === 0){   // quarter notes = medium pitch
            osc.frequency.value = 440.0;
            drum[0] = new Audio('/css/Audio/kickSoft.wav');
            drum[1] = new Audio('/css/Audio/snare.wav');
          }
        }   
      }
    }

    drum.forEach(item=>{
      item != undefined ? item.play() : 0;
    })
    osc.start(time);
    osc.stop(time + this.#noteLength);
  }
*/

  nextNote() {
    // Advance current note and time by a 16th note...
    let secondsPerBeat = 60.0 / this.#tempo;    // Notice this picks up the CURRENT 
    // tempo value to calculate beat length.
    this.#nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

    this.#current16thNote++;    // Advance the beat number, wrap to zero
    if (this.#current16thNote == 16) {
      this.#current16thNote = 0;
      this.#bar++;

      if (this.#bar == 0){              // START RECORDING
        console.log("RECORDING");
        recorder.start(currentTime())
      }
      else if (this.#bar == 4){         // STOP RECORDING (after 4 bars)
        this.play();
      }
    }
  }

}