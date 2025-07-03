import tensorflow as tf
from transformers import BertTokenizer
import numpy as np

class Model:
    def __init__(self):
        # Load tokenizer
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        # Load the SavedModel
        self.model = tf.saved_model.load("bert_toxic_model_saved")
        # Get the inference function
        self.infer = self.model.signatures["serving_default"]
        # Toxic comment categories
        self.labels = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']

    # Inference function
    def predict_toxicity(self, text, threshold=0.5):
        tokens = self.tokenizer(
            text,
            padding='max_length',
            truncation=True,
            max_length=128,
            return_tensors='tf'
        )

        # Call the model using keyword arguments
        outputs = self.infer(
            input_ids=tokens['input_ids'],
            attention_mask=tokens['attention_mask']
        )

        # Print keys to verify if needed:
        # print(outputs.keys())

        # Extract predictions
        probs = list(outputs.values())[0].numpy()[0]  # shape: (6,)

        # Get label names with prob ≥ threshold
        prediction = [self.labels[i] for i in range(6) if probs[i] >= threshold]
        return dict(zip(self.labels, probs)), prediction