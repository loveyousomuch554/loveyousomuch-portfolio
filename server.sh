#!/bin/bash
command=$1

# If input is empty set the variable to some value
if [ -z "$command" ]
then
    $command="the_author_wants_to_break_the_script"
fi

if [ $command == 'start' ]
then    
    # Star npm script
    echo "Loading the server..."
    cd /opt/bitnami/apps/portfolio
    sudo npm run server
elif [ $command == 'stop' ]
then
    # Kill process on port 443 
    echo "Closing server..."
    sudo kill -9 $(sudo lsof -t -i:443)
elif [ $command == 'restart' ]
then    
    cd /opt/bitnami/apps/portfolio
    echo "Restarting server..."
    sudo kill -9 $(sudo lsof -t -i:443)
    sudo npm run server
elif [ $command == 'pull&start' ]
then    
    # Load changes from github and start server
    cd /opt/bitnami/apps/portfolio
    echo "Update site version..."
    sudo git pull
    echo "Loading the server..."
    sudo npm run server
elif [ $command == 'pull' ]
then    
    # Just load changes
    cd /opt/bitnami/apps/portfolio
    echo "Update site version..."
    sudo git pull
else
    echo "invalid command"
fi

# Clearn console after exit from server
if [[ $? == 137 ]]
then
  clear
fi
