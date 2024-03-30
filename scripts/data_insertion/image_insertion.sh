#!/bin/bash

# Function to upload an image file to MongoDB using mongofiles
upload_image_to_mongodb() {
  local image_path=$1
  local image_name=$(basename "$image_path")
  local db_name=$2
  mongofiles --db "$db_name" put "$image_name" --local "$image_path"
}

# Directory containing the images
image_directory="../../dataset/bird_images/nabirds/new_images"


# MongoDB Database Name
db_name="flock"

# Iterate over each image file in the directory and upload to MongoDB
for image_path in "$image_directory"/*; do
  if [ -f "$image_path" ]; then
    upload_image_to_mongodb "$image_path" "$db_name"
    echo "Uploaded $(basename "$image_path") successfully to $db_name database."
  else
    echo "Error: Image file $(basename "$image_path") not found in the specified directory."
  fi
done