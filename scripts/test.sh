#!/bin/bash -eux

echo "Running comparison tests"

input=./test/input
check=./test/check
output=./test/output
mkdir -p $output

out=help
echo "# $out matches"
./main.js --help > $output/$out
diff $check/$out $output/$out

out=basic.md
echo "# $out matches"
./main.js $input/basic.yaml > $output/$out
diff $check/$out $output/$out

out=scrive_api.md
echo "# $out matches"
./main.js $input/scrive-apidocs/scrive_api.yaml > $output/$out
diff $check/$out $output/$out

# TODO add more example conversions

# TODO run with different flags
