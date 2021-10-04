import React, { useState } from "react";
import Recognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechRecognition = () => {
  const commands = [
    {
      command: "ストップ",
      callback: (command) =>
        setMessage("終了する場合は「停止」ボタンを押してください"),
    },
  ];

  const {
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition({ commands });
  const [isAlertFlg, setIsAlertFlg] = useState(0);
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState("");

  // サポートされているブラウザか
  if (!browserSupportsSpeechRecognition) {
    return (
      <span>このブラウザは、speech recognitionをサポートしていません。</span>
    );
  }

  const handleStartListening = () => {
    if (!isMicrophoneAvailable) {
      return setIsAlertFlg(1);
    } else {
      setIsAlertFlg(0);
      // リスニング開始
      return Recognition.startListening({
        language: "ja",
        continuous: true,
      });
    }
  };

  const handleStopListening = () => {
    if (!isMicrophoneAvailable) {
      return setIsAlertFlg(1);
    } else {
      setIsAlertFlg(0);
      setOutput(finalTranscript);
      // リスニング開始
      return Recognition.stopListening();
    }
  };

  // ダウンロード処理
  const handleDownLoad = () => {
    const blob = new Blob([output]);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "文字起こし" + ".txt";
    a.click();
    a.remove();
  };

  return (
    <div className="container mx-auto px-8">
      <h1 className="text-4xl font-bold text-center">文字起こし</h1>
      <div className="text-center px-4 py-2 m-2">
        <p>文字起こし: {listening ? "開始" : "終了"}</p>
        <p>{isAlertFlg ? "マイクのアクセスを許可してください" : ""}</p>
      </div>
      <div class="grid grid-cols-4 gap-2">
        <div class="bg-blue-400 text-center text-white p-2 rounded">
          <button onClick={handleStartListening}>開始</button>
        </div>
        <div class="bg-blue-400 text-center text-white p-2 rounded">
          <button onClick={handleStopListening}>終了</button>
        </div>
        <div class="bg-blue-400 text-center text-white p-2 rounded">
          <button onClick={resetTranscript}>リセット</button>
        </div>
        <div class="bg-blue-400 text-center text-white p-2 rounded">
          <button onClick={handleDownLoad}>ダウンロード</button>
        </div>
      </div>
      <p>{finalTranscript}</p>
      <p>{message}</p>
    </div>
  );
};

export default SpeechRecognition;
