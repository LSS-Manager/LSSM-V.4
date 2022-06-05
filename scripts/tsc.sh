start_time=$(date +%s%N)
dir="$(dirname -- "$( readlink -f -- "$0"; )";)";
script_name="$(basename "$0")"

echo "$script_name": start

yarn tsc -b --pretty "$dir/../"

end_time=$(date +%s%N)
echo "$script_name": $(((end_time - start_time) / 1000000))ms
