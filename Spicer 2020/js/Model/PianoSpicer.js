class PianoSpicer {
  #level
  #spiced_tracks

  constructor() {
    this.#level = 1;
    this.#spiced_tracks = undefined
  }




//spice verrà utilizzatov per creare le 3 tracce spiced subito dopo la rec
  spiceTrack(baseTrack,level){
    let cProg = baseTrack
    let track = Object.assign(cProg,baseTrack)

    if(track.constructor.name == ChordProgression.name){
      switch (level) {
        case 1: track.add7s();
        break;
        case 2: //track.add9sAndVoicings();
        break;
        default: //do nothing
      }
    }
    console.log("track level")
    console.log(level);
    console.log(track);

    return track
  }

  levelUp(){
    if(this.#level<1){
      level++
    }
  }

  levelDown(){
    if(this.#level>0){
      level--
    }
  }

  spice(cprog){ //returns the spiced track according to the level
    console.log("base track");
    console.log(cprog);
    if(this.#spiced_tracks === undefined){
      this.#spiced_tracks = []
      this.#spiced_tracks.push(cprog);
      this.#spiced_tracks.push(this.spiceTrack(this.#spiced_tracks[0],1)); //spices the base track
      this.#spiced_tracks.push(this.spiceTrack(this.#spiced_tracks[1],2)); //spices the already spiced track
    }

    return this.#spiced_tracks[this.#level]
  }

}