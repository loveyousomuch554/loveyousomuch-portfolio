#!/bin/bash
command=$1

# If input is empty set the variable to null
if [ -z "$command" ]
then
     $command="huita"
fi

if [ $command == 'start' ]
then    
    # Star npm script
    cd /opt/bitnami/apps/portfolio
    sudo npm run server
elif [ $command == 'stop' ]
then
    # Kill process on port 443 
    sudo kill -9 $(sudo lsof -t -i:443)
elif [ $command == 'restart' ]
then    
    cd /opt/bitnami/apps/portfolio
    sudo kill -9 $(sudo lsof -t -i:443)
    sudo npm run server
else
    echo "invalid command"
fi
