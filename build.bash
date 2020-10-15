#!/usr/bin/env bash
cp -r ./example/src/src ./src
yarn build
cp ./contract ./dist/lib/contract
