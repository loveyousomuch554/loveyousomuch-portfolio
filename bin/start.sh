#!/bin/bash

cd /opt/bitnami/apps/portfolio/bin

# If input is empty set the variable to some value
if [ -z "$1" ]
then
    $1="author_wants_to_break_the_script"
fi

if [ $1 == 'start' ]
then
    # Start server with pm2
    pm2 start server.sh --name site --no-autorestart
elif [ $1 == 'stop' ]
then
    # Kill process on port 443 
    echo "Closing server..."
    sudo kill -9 $(sudo lsof -t -i:443)
elif [ $1 == 'restart' ]
then
    echo "Restarting server..."
    sudo kill -9 $(sudo lsof -t -i:443)
    pm2 start server.sh --name site --no-autorestart
elif [ $1 == 'p&re' ]
then    
    # Load changes from github and start server
    echo "Update site version..."
    sudo git pull
    echo "Loading the server..."
    sudo kill -9 $(sudo lsof -t -i:443)
    pm2 start server.sh --name site --no-autorestart
elif [ $1 == 'pull' ]
then    
    # Just load changes
    echo "Update site version..."
    sudo git pull
else
    echo "invalid command"
fi

# Clearn console after exit from server
if [[ $? -eq 137 ]]
then
  exit 0
fi
