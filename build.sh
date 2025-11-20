#!/bin/bash

npm install --legacy-peer-deps
npm run build
cp build/manifest.firefox.json build/manifest.json
