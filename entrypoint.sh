#!/bin/sh

# TODO: devとprodでコマンドを切り替えられるようにする

echo 'Schema Migrate'
yarn migrate:dev

echo 'Model generate'
yarn model-generate

echo 'Srart server'
yarn dev
