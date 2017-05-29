#!/bin/sh

cd `dirname $0`
state=`cat state.txt`
if [ ${state} = "start" ]; then
	node app.js
fi
