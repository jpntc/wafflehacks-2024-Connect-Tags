from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from diffusers import StableDiffusionPipeline
import torch
import cohere
import pyrebase
app = Flask(__name__)
CORS(app)

# Ai generation
# Load the stable diffusion pipeline
pipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-3-medium-diffusers")
pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")

# Generate an image from text
def generate(prompt):
    default_prompt = "cartoon style, ((cool design for a profile banner)),"
    new_prompt = default_prompt + prompt
    images = pipe(
        new_prompt,
        negative_prompt="human, person, modelBad anatomy, Bad proportions, Deformed, Disconnected limbs, Disfigured, Extra arms, Extra limbs, Extra hands, Fused fingers, Gross proportions, Long neck, Malformed limbs, Mutated, Mutated hands, Mutated limbs, Missing arms, Missing fingers, Poorly drawn hands, Poorly drawn face.",
        num_inference_steps=50,
        ).images

    image = images[0]
    image.save('generated_image.png')

firebaseConfig = {
    "apiKey": "INSERT_YOUR_API_KEY_HERE",
    "authDomain": "INSERT_YOUR_AUTH_DOMAIN_HERE",
    "projectId": "INSERT_YOUR_PROJECT_ID_HERE",
    "storageBucket": "INSERT_YOUR_STORAGE_BUCKET_HERE",
    "messagingSenderId": "INSERT_YOUR_MESSAGING_SENDER_ID_HERE",
    "appId": "INSERT_YOUR_APP_ID_HERE",
    "measurementId": "INSERT_YOUR_MEASUREMENT_ID_HERE"
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()

@app.route('/signup', methods=['POST'])
def signup():
    email = request.json['email']
    password = request.json['password']
    try:
        user = auth.create_user_with_email_and_password(email=email, password=password)
        return jsonify({'message': 'User created successfully'}), 200
    except auth.AuthError as e:
        return jsonify({'error': str(e)}), 400

@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    try:
        user = auth.sign_in_with_email_and_password(email=email, password=password)
        return jsonify({'message': 'User logged in'}), 
    except auth.AuthError as e:
        return jsonify({'error': str(e)}), 401

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.get_json()
    description = data['description']
    
    result = generate(description)
    
    return send_file('generated_image.png', mimetype='image/png')

@app.route('/generate-description', methods=['POST'])
def generate_description():
    data = request.get_json()
    description = data['description']
    co = cohere.Client('YOUR_COHERE_API_KEY')
    response = co.summarize(text=description)
    summary = response['summary']

    return jsonify({'summary': summary})