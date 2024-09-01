from diffusers import StableDiffusionPipeline
import torch
import sys

def generate_image(prompt, output_path):

    pipe = StableDiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-3-medium-diffusers")
    pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")

    images = pipe(prompt, negative_prompt="human, person, modelBad anatomy, Bad proportions, Deformed, Disconnected limbs, Disfigured, Extra arms, Extra limbs, Extra hands, Fused fingers, Gross proportions, Long neck, Malformed limbs, Mutated, Mutated hands, Mutated limbs, Missing arms, Missing fingers, Poorly drawn hands, Poorly drawn face.", num_inference_steps=50).images

    image = images[0]
    image.save(output_path)

if __name__ == "__main__":
    
    if len(sys.argv) != 3:
        print("Usage: python generate_image.py <prompt> <output_path>")
        sys.exit(1)

    prompt = sys.argv[1]
    output_path = sys.argv[2]

    try:
        generate_image(prompt, output_path)
        print(f"Image successfully generated and saved to {output_path}")

    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)
