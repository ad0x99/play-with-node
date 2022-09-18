#!/bin/bash

# Check if docker is running
if (! docker stats --no-stream ); then
  echo "🚀 Openning Docker Applications..."
  open /Applications/Docker.app

  # Wait for docker to start
  while (! docker stats --no-stream ); do
    echo "🎉 Waiting for Docker to launch..."
    sleep 1
  done
fi

if (docker stats --no-stream); then
  if [ "$(docker ps -q -f name=mypostgresdb)" ]; then
    # Cleanup
    echo "🎉 Waiting for cleanup container..."
    docker stop mypostgresdb
    sleep 3
    docker rm mypostgresdb
    sleep 3
    echo " 🎉 Completing cleanup container..."

  fi

  if [ ! "$(docker ps -q -f name=mypostgresdb)" ]; then
    # Run your container
    echo "🚀 Running new postgres container"
    docker run --name mypostgresdb -p 2345:5432 -e POSTGRES_PASSWORD=my_secret_password -d postgres

    if [ "$(docker ps -q -f name=mypostgresdb)" ]; then
      echo "🚀 Your container is ready !!! Happy coding 🙀"
    fi
  fi
fi