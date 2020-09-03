<p align="center">
  <img src="https://user-images.githubusercontent.com/24576858/92103904-e0e85080-ede0-11ea-8e61-5ba2f4050be4.gif" width="50%"//>
</p>

<h3 align="center"> A tool for spicing up your music: as simple as a loop station, as spicy as a whole band! </h3>

![tag](https://img.shields.io/aur/last-modified/google-chrome) ![Mozilla Add-on](https://img.shields.io/amo/rating/dustman) ![Github All Contributors](https://img.shields.io/github/all-contributors/all-contributors/all-contributors/master) 

<p align="center">
  <img src="https://user-images.githubusercontent.com/57997005/91635013-1f52c980-e9f5-11ea-852c-8e1d80ab34b9.png?raw=true" alt="image"/>
</p>

## How To Use
The Spicer is meant to spice up your music performances offering a virtual band playing live together with you: just play the basic chord progression of your piece and let the magic happen! 

You can choose which instruments to include in your band and their level of expertise and also modify them while playing to create different textures.

Follow this simple steps to get started:

1. Connect a MIDI keyboard
2. Select the tonality and bpm of your music piece
3. Press 'R' and wait for the countdown to start recording
4. Play in four bars the basic chords of your piece, then they will loop and form the harmony structure 
5. Choose which instruments to include and their spicer levels
6. Now you can start playing and improvising your solo with a synth and obtain the spiciest sound by tuning its parameters

* EASY MODE: Instead of playing the chords for defining the harmony of the piece it's possible to play just the root of each one; then they will be harmonized by looking at the key.
* PIANO SOUNDS: It's possible to choose between different types of pianos, including organs and pads. The set of possible sampled sounds is selected from [WebAudioFont](https://surikov.github.io/webaudiofont/).


<h3 align="center"> youtube demo link </h3>

## Features
### Band Instrument Selection

| Instrument | Low Complexity | High Complexity | 
| :---         | :---      | :--- |
| **Piano**   | Enriches the chords with maj and min 7th, if possible, depending on the chord progression.    | Enriches the chords with 9th and generates voicings if possible.    |
| **Bass**   | Plays the fundamental note of each chord and the leading tone to the next fundamental .      | Create a walking bass line.      |
| **Drums**    | Plays a standard drumfill.       | Plays a strong drumfill.     |

### Different piano sounds

### Voicings
If the piano complexity level is set to its maximum, whenever in the chord progression is detected a II - V - I fragement, then voicings are performed. 
Voicings are particular arangements and movementes of the pitches of a chord aimed at achieving a pleasurable effect. The chords used can include 7ths, 9ths and also 13ths and they can have two configurations:
* Basic:
<img src="https://user-images.githubusercontent.com/57997005/92108562-e8f7be80-ede7-11ea-824f-5250d232e16a.jpg" alt="beat_4" width="300"/> 

* First Inversion:
<img src="https://user-images.githubusercontent.com/57997005/92108563-ea28eb80-ede7-11ea-85c5-ac1946a0e525.jpg" alt="beat_4" width="300"/>

The algorithm chooses everytime the one that falls within the range D4 - F5.

### Synthesizer
Inspired by the colorful design of the _Moog Grandmother_ and build using [Tone.js](https://tonejs.github.io/) framework the Spicer monophonic Synthesizer gives the opportunity to jam on top of your spiced arrangement.
The synth is composed of the following components:

| Control |  |
| :---  | :---  | 
| **Oscillators** | There are two of them: both are able to play the classic four waveforms (_Sine_, _Triangle_, _Square_ and _Sawtooth_) and have a dedicated octave control. |
| **Mixer** | Craft the sound by controlling the oscillators' gains and by adding some Noise that can be _White_, _Pink_ or _Brown_. |
| **Filter** | Can be _low pass_, _high pass_ or _bandpass_ with a 24 dB/octave slope and a Resonance control. |
| **Envelope** | Shapes the sound amplitude and (optionally) the filter cutoff frequency. |
| **Output** | Control the main output gain. |
| **Effects** | The sound generated can be spiced up even more applying a _PingPong Delay_ and a _Convolution Reverb_. |
| **Modulation** | Two indipendent LFOs that can be used to give life to the sound created. The LFOs are pre-routed to modulate the oscillators' pitches and the filter cutoff frequency. Both can be toggled on or off and can be controlled in Frequency, Amplitude and Waveform generated. |

### Walking Bass
If the bass is active and set to the higher complexity level it plays an ever changing walking bass line, which consists of notes of equal duration (typically 1/4 notes) that create a feeling of forward motion. Its implementation is designed in order to give a realistic feel and a certain degree of freedom to it and the four beats <img src="https://user-images.githubusercontent.com/57997005/91971162-0a3da980-ed19-11ea-9efc-2077535bb9c8.png" alt="beat_1" width="23"/>  <img src="https://user-images.githubusercontent.com/57997005/91971170-0ca00380-ed19-11ea-9836-c5f73ef1b3a4.png" alt="beat_2" width="23"/>  <img src="https://user-images.githubusercontent.com/57997005/91971174-0e69c700-ed19-11ea-93cb-64aacc608455.png" alt="beat_3" width="23"/>  <img src="https://user-images.githubusercontent.com/57997005/91971178-10338a80-ed19-11ea-9988-25bf541da008.png" alt="beat_4" width="23"/> of each bass line are choosen by following specific rules:
* beat <img src="https://user-images.githubusercontent.com/57997005/91971162-0a3da980-ed19-11ea-9efc-2077535bb9c8.png" alt="beat_1" width="23"/> : It must be the root of the chord played on this beat. It's the first to be computed by the algorithm by randomly choosing the root on different octaves (but constrained to the walking bass range).



* beat  <img src="https://user-images.githubusercontent.com/57997005/91971170-0ca00380-ed19-11ea-9836-c5f73ef1b3a4.png" alt="beat_2" width="23"/> : It must be a note of the selected key. It's the last to be computed by the algorithm by choosing from a set of possible notes which depends on the other beats' choices and on a series of constraints about intervals' length and type.



* beat <img src="https://user-images.githubusercontent.com/57997005/91971174-0e69c700-ed19-11ea-93cb-64aacc608455.png" alt="beat_3" width="23"/> : It must be a note of the selected key. It's the third to be computed by the algorithm by choosing from a set of possible notes which depends on the other beats' choices and on a series of constraints about intervals' length and type.



* beat <img src="https://user-images.githubusercontent.com/57997005/91971178-10338a80-ed19-11ea-9988-25bf541da008.png" alt="beat_4" width="23"/> : It must be a _leading tone_ (chromatic, diatonic or dominant). It's the second to be computed by the algorithm by randomly choosing one of the leading tones.


The choice of <img src="https://user-images.githubusercontent.com/57997005/91971170-0ca00380-ed19-11ea-9836-c5f73ef1b3a4.png" alt="beat_2" width="23"/> and <img src="https://user-images.githubusercontent.com/57997005/91971174-0e69c700-ed19-11ea-93cb-64aacc608455.png" alt="beat_3" width="23"/> can follow two logics:
* **Close Walking** : They are chosen from the _possible beats sets_ by minimizing the distances between the beats. The result will be a walking bass line in which the notes played are as close as possible but still respect the basic constrains.

* **Random Walking** : They are chosen from the _possible beats sets_ randomly. The result will be a walking bass with a more random behaviour, possibly showing certain number of jumps, but still respect the basic constrains.

After having computed these two different walking bass bars the algorithm will randomly choose one of them and construct a multicolored and ever changing bass line!
![1](https://user-images.githubusercontent.com/57997005/91876344-e167d680-ec7c-11ea-9260-d4bf05276bb9.png)

