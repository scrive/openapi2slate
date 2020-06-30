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

# TODO add more example conversions

# TODO run with different flags
