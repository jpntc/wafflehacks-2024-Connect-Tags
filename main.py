from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from io import BytesIO
import base64
import uuid
from diffusers import StableDiffusionPipeline
import torch
import cohere

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

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    user = User.query.filter_by(email=email, password=password).first()
    if user:
        return jsonify({
            'success': True,
            'user_id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'description': user.description,
            'image_url': user.image_url,
            'ai_description': user.ai_description
        })
    return jsonify({'success': False})

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']
    password = data['password']
    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'message': 'Email already exists'})
    new_user = User(first_name=first_name, last_name=last_name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'success': True})

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