#!/bin/bash -eux

echo "Hello, world!"

check=./test/check
out=./test/output
mkdir -p $out

./main.js --help > $out/help
diff $check/help $out/help

# TODO add some example conversions
# TODO run with different flags
