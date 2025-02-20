import { useState, useEffect } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdCopy } from "react-icons/io";
import useSpeechToText from "./useSpeechToText";
import { HiMiniMicrophone } from "react-icons/hi2";
import Animate from "./Animate";

export default function Translator() {
    const [inputText, setInputText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [showAnimate, setShowAnimate] = useState(false); 

    const { isListening, transcript, startListening, stopListening } = useSpeechToText({ continuous: true });

    useEffect(() => {
        setShowAnimate(isListening);
    }, [isListening]);

    const stopVoiceInput = () => {
        setInputText((prevVal) => prevVal + (transcript.length ? (prevVal.length ? " " : "") + transcript : ""));
        stopListening();
    };

    const handleMicrophoneClick = () => {
        if (isListening) {
            stopVoiceInput();
        } else {
            startListening();
        }
    };

    const handleTranslate = () => {
        setTranslatedText(inputText);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="container bg-white shadow-md rounded-lg p-8 mx-20">
                <h1 className="text-3xl font-bold mb-6 text-center">English to Kinyarwanda Translator</h1>

                <div className="flex flex-col lg:flex-row items-center gap-4">
                    {/* Input Textarea */}
                    <textarea
                        className="w-full lg:w-1/2 p-4 border border-gray-300 rounded-lg resize-none h-40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="Enter text in English..."
                        disabled={isListening}
                        value={inputText + (isListening ? (transcript.length ? " " + transcript : "") : "")}
                        onChange={(e) => setInputText(e.target.value)}
                    ></textarea>

                    <button
                        className="p-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition"
                        onClick={handleTranslate}
                        aria-label="Translate"
                    >
                        <IoMdArrowRoundForward size={24} />
                    </button>

                    <div className="relative w-full lg:w-1/2">
                        <textarea
                            className="w-full p-4 border border-gray-300 rounded-lg resize-none h-40 bg-gray-100 focus:outline-none"
                            placeholder="Translation will appear here..."
                            value={translatedText}
                            readOnly
                        ></textarea>
                        <IoMdCopy
                            className="absolute bottom-3 right-3 cursor-pointer text-gray-600 hover:text-gray-800"
                            onClick={() => navigator.clipboard.writeText(translatedText)}
                            size={24}
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-6 relative">
                    {/* Conditional Rendering of Animate or Microphone */}
                    {showAnimate ? (
                        <div onClick={stopVoiceInput} className="cursor-pointer">
                            <Animate />
                        </div>
                    ) : (
                        <HiMiniMicrophone
                            size={45}
                            className="cursor-pointer hover:text-purple-600"
                            onClick={handleMicrophoneClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
