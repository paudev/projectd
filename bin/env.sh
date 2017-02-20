#!/bin/bash

#!---- START of LOCAL variables
read -r -d '' LOCAL_ENV << EOM
export ROOT_URL=http://localhost:3000
export BIND_IP=0.0.0.0
export PORT=3000
EOM
#!---- END of LOCAL variables

#!---- Start of DEV variables
read -r -d '' DEV_ENV << EOM
export MONGO_URL=mongodb://pausuero:eloquence100!@ds153689.mlab.com:53689/projectd
export ROOT_URL=http://159.203.112.26:3000
export BIND_IP=0.0.0.0
export PORT=3000
EOM
#!---- End of DEV variables

case "$1" in
  local)
    echo "Setting environment to $1"
    echo "$LOCAL_ENV" > .env
    ;;
  dev)
    echo "Setting environment to $1"
    echo "$DEV_ENV" > .env
    ;;
  *)
    echo $"Usage: $0 {local|dev}"
    exit 1
esac