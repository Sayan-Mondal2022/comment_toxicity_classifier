from flask import Flask, request, jsonify, render_template
from model import Model
import logging

app = Flask(__name__)
model = Model()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        text = data.get('text', '')
        threshold = float(data.get('threshold', 0.5))
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
            
        logger.info(f"Predicting toxicity for text: {text[:50]}...")
        
        # Get predictions from model
        probabilities, predictions = model.predict_toxicity(text, threshold)
        probabilities = {k: float(v) for k, v in probabilities.items()}
        
        return jsonify({
            'probabilities': probabilities,
            'predictions': predictions
        })
        
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)