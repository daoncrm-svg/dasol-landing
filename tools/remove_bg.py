import os

from rembg import remove


def remove_backgrounds(input_dir, output_dir):
    os.makedirs(output_dir, exist_ok=True)

    for filename in os.listdir(input_dir):
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            continue

        input_path = os.path.join(input_dir, filename)
        output_name = f"{os.path.splitext(filename)[0]}_no_bg.png"
        output_path = os.path.join(output_dir, output_name)

        print(f"Processing: {filename}...")
        try:
            with open(input_path, 'rb') as source:
                output_image = remove(source.read())

            with open(output_path, 'wb') as target:
                target.write(output_image)

            print(f"Saved: {output_name}")
        except Exception as error:
            print(f"Error processing {filename}: {error}")


if __name__ == "__main__":
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    img_dir = os.path.join(project_root, "assets", "img")
    remove_backgrounds(img_dir, img_dir)
