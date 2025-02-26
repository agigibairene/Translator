from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import Tokenizer
import json

app = FastAPI()

# Loading the trained model
model = load_model("trannslation_model.keras")

# Loading the tokenizers
with open('english_tokenizer.json', 'r') as f:
    english_tokenizer = Tokenizer()
    english_tokenizer.word_index = json.load(f)

with open('kinyarwanda_tokenizer.json', 'r') as f:
    kinyarwanda_tokenizer = Tokenizer()
    kinyarwanda_tokenizer.word_index = json.load(f)

# Pydantic model for request body
class TranslationRequest(BaseModel):
    text: str

# Creating the translate function
def translate(text: str):
    # Tokenize the input text using the English tokenizer
    input_sequence = english_tokenizer.texts_to_sequences([text])

    # Reshaping the input sequence to match the model's expected input shape
    input_sequence = np.array(input_sequence)

    # Creating a decoder input
    decoder_input = np.zeros_like(input_sequence)

    # Predicting the translated sequence
    predicted_sequence = model.predict([input_sequence, decoder_input])

    translated_token_indices = predicted_sequence.argmax(axis=-1)

    # Converting the translated token indices into text
    translated_token_indices = translated_token_indices.tolist()

    translated_text = kinyarwanda_tokenizer.sequences_to_texts([translated_token_indices])

    return translated_text[0]


@app.post("/translate/")
async def translate_text(request: TranslationRequest):
    try:
        translated_text = translate(request.text)
        return {"translated_text": translated_text}
    except Exception as e:
        return {"error": str(e)}
