# Use a base image with Java, Node.js, or whatever your environment needs
FROM gitpod/workspace-full

# Install any additional dependencies
RUN sudo apt-get update && sudo apt-get install -y maven docker.io

# Set up the working directory
WORKDIR /workspace/MobileStoreApplication

# Install any other dependencies specific to your environment

