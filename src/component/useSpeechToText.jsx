/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"

export default function useSpeechToText(options){
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recgnotionRef = useRef(null);

    useEffect(()=>{
        if (!("webkitSpeechRecognition" in window)){
            console.error("Web speech api is not supported");
            return;
        }
        recgnotionRef.current = new window.webkitSpeechRecognition();
        const recognition = recgnotionRef.current;
        recognition.interimResults = options.interimResults || true
        recognition.lang = options.lang || "en-US";
        recognition.continuous = options.continuous || false;

        if ("webkitSpeechGrammarList" in window){
            const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;"
            const speechRecognitionList = new window.webkitSpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionList
        }

        recognition.onresult = (event) =>{
            let text = ""
            for (let i=0; i<event.results.length; i++){
                text += event.results[i][0].transcript
            }
            setTranscript(text)
        }

        recognition.onerror = (event) =>{
            console.error("Speech recognition error: " + event.error)
        }

        recognition.onend = () =>{
            setIsListening(false)
            setTranscript("")
        }

        return () =>{
            recognition.stop();
        }
    }, []);

    const startListening = () =>{
        if (recgnotionRef.current && !isListening){
            recgnotionRef.current.start();
            setIsListening(true)
        }
    }

    const stopListening = () =>{
        if (recgnotionRef.current && isListening){
            recgnotionRef.current.stop();
            setIsListening(false)
        }
    }

    return {
        isListening, transcript, startListening, stopListening
    }
}