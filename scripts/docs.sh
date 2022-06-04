start_time=$(date +%s%N)
dir="$(dirname -- "$( readlink -f -- "$0"; )";)";
script_name="$(basename "$0")"

echo "$script_name": start

cd "$dir"/../ || exit 1

./docs/.vuepress/node_modules/.bin/vuepress build docs

mkdir -p ./dist/docs
rm -rd ./dist/docs/*
cp -r ./docs/.vuepress/dist ./dist/docs

end_time=$(date +%s%N)
echo "$script_name": $(((end_time - start_time) / 1000000))ms
