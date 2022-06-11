start_time=$(date +%s%N)
dir="$(dirname -- "$( readlink -f -- "$0"; )";)";
script_name="$(basename "$0")"

echo "$script_name": start

mode="$1"

echo running a build in mode: "$mode"

ts-node "$dir"/../build/index.ts --esModuleInterop "$mode"
git --no-pager diff --color-words

end_time=$(date +%s%N)
echo "$script_name" "$mode": $(((end_time - start_time) / 1000000))ms
