// A SAFE SPACE WHERE TO ADD MUSIC RELATED GLOBAL VARIABLES
//<3

let onAir = false;
let _notes = {
  C: 261.63,
  "C#": 277.18,
  D: 293.66,
  "D#": 311.13,
  E: 329.63,
  F: 349.23,
  "F#": 369.99,
  G: 392.0,
  "G#": 415.3,
  A: 440.0,
  "A#": 466.16,
  B: 493.88,
};

let playSynth = true;

let possible_notes = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
let tonalities = ["Maj", "Min"];

//Intervalli scale maggiori e minori
let major = [0, 2, 4, 5, 7, 9, 11];
let minor = [0, 2, 3, 5, 7, 8, 10];

// TODO:  initialize a key object that will be used to get the current key values
let key = new Key("C", "Maj");
let tempo = new Tempo(120);
let recorder = new Recorder();
let cprog = new ChordProgression();
let player = new Player()
let spicer = new PianoSpicer();

let metronome = new Metronome();

let chordsIntervals = {
  "[4,7]": new ChordType("maj", 0, 0),
  "[3,8]": new ChordType("maj", 1, 2),
  "[5,9]": new ChordType("maj", 2, 1),
  "[3,7]": new ChordType("min", 0, 0),
  "[4,9]": new ChordType("min", 1, 2),
  "[5,8]": new ChordType("min", 2, 1),
  "[3,6]": new ChordType("dim", 0, 0),
  "[3,9]": new ChordType("dim", 1, 2),
  "[6,9]": new ChordType("dim", 2, 1),
  "[4,8]": new ChordType("aug", 0, 0),
  "[4,7,11]": new ChordType("maj7", 0, 0),
  "[3,7,8]": new ChordType("maj7", 1, 3),
  "[4,5,9]": new ChordType("maj7", 2, 2),
  "[1,5,8]": new ChordType("maj7", 3, 1),
  "[3,7,10]": new ChordType("min7", 0, 0),
  "[4,7,9]": new ChordType("min7", 1, 3),
  "[3,5,8]": new ChordType("min7", 2, 2),
  "[2,5,9]": new ChordType("min7", 3, 1),
  "[4,7,10]": new ChordType("dom7", 0, 0),
  "[3,6,8]": new ChordType("dom7", 1, 3),
  "[3,5,9]": new ChordType("dom7", 2, 2),
  "[2,6,9]": new ChordType("dom7", 3, 1),
  "[3,6,9]": new ChordType("dim7", 0, 0),
  "[3,6,10]": new ChordType("sdim", 0, 0),
  "[3,7,9]": new ChordType("sdim", 1, 3),
  "[4,6,9]": new ChordType("sdim", 2, 2),
  "[2,5,8]": new ChordType("sdim", 3, 1),
};

timeThresh = 25; //time threshold under which we add a note to a chord
timeDist = 2;

//-----------FUNCTIONS---------

let currentTime = () => {
  return performance.now();
};

function shiftToOctave(octave, midiNote) {
  //shifts to a specific octave
  return midiNote - Math.floor(midiNote / 12) * 12 + 12 * octave;
}

function shiftOfOctave(nOctaves, midiNote) {
  return midiNote + 12 * nOctaves;
}

function mapLog(value, start1, stop1, start2, stop2) {
  start2 = Math.exp(start2);
  stop2 = Math.exp(stop2);
  return Math.log(
    start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
  );
}

function cleanRec() {
  recorder = new Recorder();
  cprog = new ChordProgression();
  spricer = new PianoSpicer();
}
