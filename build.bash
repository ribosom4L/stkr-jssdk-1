#!/usr/bin/env bash
yarn install
cp -r ./example/src/src ./src
yarn build
cp ./contract ./dist/lib/contract
