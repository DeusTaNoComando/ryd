#!/bin/bash

echo ENVIRONMENT=$APP_ENVIRONMENT

cd /usr/src/app

if [[ $APP_ENVIRONMENT == "development" ]]
then
    npm start
# It is possible to create different start commands for many environments
# (i.e. npm run start:dev, npm run start:prod) and create a condition like this:
else
    npm run start:prod
fi

