import React from 'react';
import Recognition, { useSpeechRecognition } from 'react-speech-recognition';


const parser = require('ua-parser-js');

const SpeechRecognition = () => {
    const ua = parser(navigator.userAgent.toLocaleLowerCase());
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }

    return (
        <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
        </div>
    );

}

export default SpeechRecognition;