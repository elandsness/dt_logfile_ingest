#!/bin/bash

while(true) do
   sleep 60;
   echo "someserver: warning! level is currently at $(( $RANDOM % 10 ))" >> turtles.log
done;