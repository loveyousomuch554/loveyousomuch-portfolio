#!/bin/bash
command=$1

# If input is empty set the variable to null
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
else
    echo "invalid command"
fi

# Clearn console after exit from server
if [[ $?==137 ]]
then
  clear
fi
