# 🧠 MULTI-LABEL TOXICITY CLASSIFICATION SYSTEM

🔍 **Toxicity Classifier** is a BERT-powered web app that detects harmful language in user comments across six categories (insult, threat, etc.).  
🛠️ Built with TensorFlow for model inference, Flask for backend API, and modern HTML/CSS for intuitive UI.  
🚀 Designed to help moderate online content with adjustable sensitivity thresholds and real-time analysis.


## 🖥️ User Interface Overview

The Toxicity Detection web application features a clean and intuitive interface:

![image](https://github.com/user-attachments/assets/3b08a30a-3837-4510-8e70-101523eb5d62)

### 🔹 UI Features:
- Clean and minimal UI built for intuitive interaction.
- An input box for users to type or paste any comment.
- Adjustable `Threshold` value (between 0 and 1) to control sensitivity.
- `Analyze Text` button to trigger the toxicity classification.
- Results section dynamically updates with:
  - Detected toxicity labels
  - Probability bars for each category
  - Clear message if the input is non-toxic

This UI is designed to provide immediate feedback on whether a comment contains toxic language and, if so, in what form.


## 🔍 Demo

### 1️⃣ Example: Toxic Comment

![image](https://github.com/user-attachments/assets/4c31139d-e987-470a-a8dd-99981dffb158)

**Input Comment:**
> "I hate you and I am going to hit you!!! you stupid"

**Detected Categories:**
`Toxic`, `Obscene`, `Threat`, `Insult`

**Probabilities:**
- Toxic: 92.1%  
- Threat: 70.2%  
- Obscene: 54.1%  
- Insult: 50.9%  
- Severe Toxic: 18.7%  
- Identity Hate: 14.9%

> 🟠 *This comment violates standard community guidelines due to threats, obscenity, and verbal abuse.*

**Note:** This example is used solely for demonstration purposes to show the model's ability to identify harmful content and flag violations of standard community guidelines.


### 2️⃣ Example: Non-Toxic Comment

![image](https://github.com/user-attachments/assets/7bd141f5-1fe6-4f6a-9b90-b60bc6c4a1b2)

**Input Comment:**
> "You are a good person."

**Detected Categories:**
✅ *No toxic content detected*

**Probabilities:**
All categories: `0.0%`

> 🟢 *This comment is respectful and free of any toxic or abusive language.*


## 🎯 Features
- 🔍 Detects multiple toxicity types:
  - Toxic
  - Severe Toxic
  - Obscene
  - Threat
  - Insult
  - Identity Hate
- 🎚️ Adjustable threshold for sensitivity control
- ⚡ Real-time prediction with probability breakdown
- 🎨 Clean, responsive web interface


## 💡 How It Works
1. The system uses a BERT model fine-tuned on the Jigsaw Toxic Comment dataset
2. Input text is processed through the model's neural network
3. The model outputs probabilities for each toxicity category
4. Results are displayed with visual indicators and confidence levels

**Technical Stack:**
- 🤗 HuggingFace Transformers for BERT implementation
- 🧠 TensorFlow/Keras for model training
- 🌐 Flask for backend API
- 🎨 HTML/CSS/JavaScript for frontend


## 🛠️ Setup Instructions

### Prerequisites
- Python 3.7+
- pip
- virtualenv (recommended)

```bash
# 1. Clone the repo
git clone https://github.com/Sayan-Mondal2022/comment_toxicity_classifier.git
cd comment_toxicity_classifier

# 2. Create a virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Train the Model
# Open and run the cells in the notebook to train the BERT model
# and save the final model as a folder 'bert_toxic_model_saved'

Jupyter notebook model.ipynb

# 5. Run the Web Application
# Once the model is saved, start the Flask app
python app.py
```


## 🗂 Project Structure

```bash
comment_toxicity_classifier/
├── static/
│   └── styles.css
│   └── script.js
├── templates/
│   └── index.html
├── app.py
├── model.ipynb
├── model.py
├── README.md
├── requirements.txt
└── train.csv
```


## 🙌 Acknowledgements

- Jigsaw & Google for the dataset.
- HuggingFace Transformers for pretrained BERT.

⭐ *Thank you for taking the time to explore my project! If you found it helpful, please consider giving it a star on GitHub — it truly motivates me to create more!* 🚀
