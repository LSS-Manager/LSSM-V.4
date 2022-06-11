start_time=$(date +%s%N)
dir="$(dirname -- "$( readlink -f -- "$0"; )";)";
script_name="$(basename "$0")"

echo "$script_name": start

mode="$1"

"$dir"/emojis.sh || exit 1
"$dir"/sort.sh || exit 1
"$dir"/lint_fix.sh || exit 1
"$dir"/tsc.sh || exit 1

ts-node "$dir"/../prebuild/index.ts "$mode"

end_time=$(date +%s%N)
echo "$script_name": $(((end_time - start_time) / 1000000))ms
