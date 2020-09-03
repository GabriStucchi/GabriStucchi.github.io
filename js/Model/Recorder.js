class Recorder {
  #track          // Recorded track
  #timeStart


  constructor() {
    this.#track = new RecTrack();
    this.#timeStart = 0;
  }

  record(note) {
    this.#track.addNote(note); //add note automatically checks if the arg is a note
  }

  //sets the timestamp of the start of the recording (first downbeat after preclick)
  //Change the graphic of the button
  start(timeStart) {
    onAir = true;
    this.#timeStart = timeStart;
    setOnAirTxt() //sets text in on air div
  }

  //Stop the recordig, change the graphic and if it's ok call the chord recognition and save the track
  stop(hasToBeSaved) {
    stopAllNotes()
    onAir = false;
    if (hasToBeSaved) {
      setLoopBtnTxt("STOP");                              // Set text in loop button
      cprog.detectChords(this.#track);                    // Do chord detection
      player.setTrack(spicer.spice().getNotesTrack());    // Set the piano track as the spiced track
      player.play(true);                                  // Play the track
    }
    else {
      this.clean();
    }
  }

  endNote(note, timeStamp) {
    if (note.getInstantOn() < this.#timeStart) {
      note.setInstantOn(0)
      this.record(note)
    } else {
      note.setInstantOn(note.getInstantOn() - this.#timeStart) //shifts the timestamp accordingly to the beginning of the recording
    }
    note.setInstantOff(timeStamp - this.#timeStart)
  }

  getRecTrack() {
    return this.#track;
  }

  clean() {
    this.#track = undefined;
    this.#timeStart = 0;
    this.#track = new RecTrack();
  }


}