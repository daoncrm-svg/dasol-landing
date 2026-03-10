import os
from rembg import remove
from PIL import Image
import io

def remove_backgrounds(input_dir, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            input_path = os.path.join(input_dir, filename)
            output_name = os.path.splitext(filename)[0] + "_no_bg.png"
            output_path = os.path.join(output_dir, output_name)

            print(f"Processing: {filename}...")
            try:
                with open(input_path, 'rb') as i:
                    input_image = i.read()
                    output_image = remove(input_image)
                    
                    with open(output_path, 'wb') as o:
                        o.write(output_image)
                print(f"Saved: {output_name}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    img_dir = "img"
    # We will save to the same directory for convenience, or a separate one if preferred.
    # The user might want to replace original files eventually, but for now, let's create new ones.
    remove_backgrounds(img_dir, img_dir)
