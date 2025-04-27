#!/bin/bash

check_docker() {
  if ! docker --version > /dev/null 2>&1; then
    echo "Docker is not installed or running. Please install Docker and start it."
    exit 1
  fi
}

check_env() {
  if [ ! -f .env ]; then
    echo ".env file is missing. Please create the .env file with your environment variables."
    exit 1
  fi
}

wait_for_services() {
  echo "Waiting for PostgreSQL and Redis to be ready..."
  sleep 5 
}

reset_docker_containers() {
  read -p "Do you want to reset the Docker containers and database (this will lose all data)? (y/n): " choice
  if [[ "$choice" == "y" || "$choice" == "Y" ]]; then
    echo "Bringing down Docker containers and removing volumes..."
    docker-compose down -v
    echo "Docker containers and volumes removed."
  elif [[ "$choice" == "n" || "$choice" == "N" ]]; then
    echo "Skipping Docker reset."
  else
    echo "Invalid input. Skipping Docker reset."
  fi
}

# Start setup process
echo "Starting setup..."

# Check for Docker installation
check_docker

# Check for .env file
check_env

reset_docker_containers

echo "Building Docker containers..."
docker-compose up -d --build

echo "Installing Node.js dependencies..."
npm install --legacy-peer-deps > /dev/null 2>&1  

wait_for_services

echo "Seeding the database..."
npm run seed

echo "Running the application..."
npm run dev

echo "API is running and Docker containers are up! 🚀"
