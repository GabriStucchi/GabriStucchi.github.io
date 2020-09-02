class Player {
  #pianoTrack;        //Reference to the pianoTrack to play
  #bassTrack;         //Reference to the bass track to play
  #drums;             //Drums (scheduled in playDrum())
  #currentBeat;

  constructor() {
    this.#pianoTrack = undefined;
    this.#bassTrack = undefined;
    this.#drums = [new Audio('/css/Audio/kickHat.wav'), new Audio('/css/Audio/kickHard.wav'), new Audio('/css/Audio/snareRide.wav'), new Audio('/css/Audio/ch1.wav')];
    this.#currentBeat = 0;
  }

  // Set the piano track
  setTrack(track) {
    this.#pianoTrack = track;
  }

  // Set the bass track
  setBassTrack(track) {
    this.#bassTrack = track;
  }

  //Play/Stop the track depending on shouldPlay value
  play(shouldPlay) {
    if(this.#pianoTrack === undefined)
      console.log("Track undefined");
    else {
      if(shouldPlay) {
        this.#bassTrack = bass_spicer.spice();
        this.#pianoTrack.forEach((note) => playbackNote(note));    //Defined in midiManagement.js
        this.#bassTrack.forEach((note) => playbackBass(note));
      }
      else{
        this.#pianoTrack.forEach((note) => stopNote(note));        //Defined in midiManagement.js
        this.#bassTrack.forEach((note) => stopNote(note));
        this.#currentBeat = 0;
      }
    }
  }
 
  //Play the drum (at scheduled instants)
  playDrum() {
    switch(this.#currentBeat) {
      case 0:
        this.#drums[0].play();
        break;
      case 2:
      case 6:
      case 10:
      case 14:
      case 18:
      case 22:
      case 26:
      case 30:
        this.#drums[3].play();
        break;
      case 4:
      case 12:
      case 20:
      case 28:
        this.#drums[2].play();
        break;
      case 8:
      case 16:
      case 24:
        this.#drums[1].play();
        break;
      default:
        //do nothing
    }

    this.#currentBeat++;
    if(this.#currentBeat == 32)
      this.#currentBeat = 0;
  }

  // Clean the layer (deletes the tracks and restart the drums)
  clean() {
    if(this.#pianoTrack != undefined){
      this.#pianoTrack.forEach((note) => stopNote(note));        //Defined in midiManagement.js
      this.#bassTrack.forEach((note) => stopNote(note));
      this.#pianoTrack = undefined;
      this.#bassTrack = undefined;
    }
    this.#currentBeat = 0;
  }
}
