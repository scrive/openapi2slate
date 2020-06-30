#!/bin/bash -eux

echo "Running comparison tests"

input=./test/input
check=./test/check
output=./test/output
mkdir -p $output

echo "# Help text matches"
./main.js --help > $output/help
diff $check/help $output/help

echo "# basic.yaml matches"
./main.js $input/basic.yaml > $output/basic.md
diff $check/basic.md $output/basic.md

echo "# Scrive API docs match"
./main.js $input/scrive-apidocs/scrive_api.yaml > $output/scrive_api.md
diff $check/scrive_api.md $output/scrive_api.md

# TODO add more example conversions

# TODO run with different flags
