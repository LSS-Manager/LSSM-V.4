start_time=$(date +%s%N)
dir="$(dirname -- "$( readlink -f -- "$0"; )";)";
script_name="$(basename "$0")"

echo "$script_name": start

yarn eslint \
    "$dir"/../docs/.vuepress/ \
    "$dir"/../static/         \
    "$dir"/../prebuild/       \
    "$dir"/../build/          \
    "$dir"/../src/            \
    "$dir"/../scripts/        \
    "$dir"/../typings/        \
    --ext .js,.ts,.vue \
    -f table \
    --no-error-on-unmatched-pattern \
    --exit-on-fatal-error \
    --report-unused-disable-directives \
    --cache --cache-strategy content \
    --fix \
    || exit 1

end_time=$(date +%s%N)
echo "$script_name": $(((end_time - start_time) / 1000000))ms
