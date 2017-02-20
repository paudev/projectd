#!/bin/bash

# Please note that this script requires the following dependencies:
# node v0.10.43
# meteor v1.3
# forever via npm

# For Ubuntu/Debian:
# sudo apt-get install build-essential g++

APP_NAME='projectd'
SCRIPT_PATH=`dirname $0`
DEPLOY_PATH='/var/www/'$APP_NAME
GIT_BRANCH='develop'
SSH_USER='projectd'
SSH_HOST='localhost'
SSH_PORT=22
SERVER='http://localhost'

function deployLocal {
  echo 'set environment variables'
  $SCRIPT_PATH/env.sh $1
  source .env

  echo 'installing and building package'
  meteor npm install
  meteor build --architecture=os.linux.x86_64 --server=$SERVER --directory $DEPLOY_PATH

  echo 'install server NPM modules'
  cd $DEPLOY_PATH/bundle/programs/server
  npm install
}

function deployRemote {
  echo 'updating code to latest package'
  git clean -fd
  git reset --hard
  git checkout $GIT_BRANCH
  git pull

  deployLocal $1
}

function restartForever {
  echo 'restarting service'
  forever stop $DEPLOY_PATH/bundle/main.js
  forever start $DEPLOY_PATH/bundle/main.js
}

case "$1" in
  local)
    deployLocal $1
    restartForever
    ;;
  dev)
    deployRemote $1
    restartForever
    ;;
  *)
    echo "Usage: $0 {local|dev}"
    exit 1
    ;;
esac