#! /bin/sh

## this script will run the app and clean up /temp folder 

rm -f ./server/public/upload/temp/*
# rm -f ./public/upload/*

node server.js
