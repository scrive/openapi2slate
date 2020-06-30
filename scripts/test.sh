#!/bin/bash -eux

echo "Running comparison tests"

check=./test/check
output=./test/output
mkdir -p $output

echo "# Help text matches"
./main.js --help > $output/help
diff $check/help $output/help

# TODO add some example conversions
# TODO run with different flags
