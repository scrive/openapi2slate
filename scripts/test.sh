#!/bin/bash -eux

echo "Hello, world!"

check=./test/check
out=./test/output

./main.js --help > $out/help
diff $check/help $out/help

# TODO add some example conversions
# TODO run with different flags
