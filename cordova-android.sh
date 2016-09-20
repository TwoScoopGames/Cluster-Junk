#!/bin/sh
cordova create cordova com.splatjs.splatEcsStarterProject
cd cordova
cordova platform add android --save
cd ..
npm run build
cd cordova
cp -R ../build/html/* www
cordova build
