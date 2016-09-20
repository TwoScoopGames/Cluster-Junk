#!/bin/sh
cordova create cordova com.splatjs.splatEcsStarterProject
cd cordova
cordova platform add ios --save
cd ..
npm run build
cd cordova
cp -R ../build/html/* www
cordova build
