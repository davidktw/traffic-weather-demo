#!/usr/bin/env bash
pushd frontend
npm install
npm run build
popd 
pushd backend
npm install
npm run build
npm run start:prod
popd 
