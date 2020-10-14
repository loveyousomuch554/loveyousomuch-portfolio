#!/bin/bash
command=$1

# If input is empty set the variable to null
if [ -z "$command" ]
then
     $command="huita"
fi

if [ $command == 'start' ]
then
    echo "command is start"
elif [ $command == 'stop' ]
then
    echo "command is stop"
elif [ $command == 'restart' ]
then
    echo "restarting server"
else
    echo "invalid command"
fi
