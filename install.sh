#!/bin/bash

echo "Installing Node.js dependencies..."

# Install all dependencies from package.json
npm install express body-parser dotenv

echo "Dependencies installed successfully!"
echo "You can now run the server with: ./run.sh"
