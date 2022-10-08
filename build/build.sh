#!/usr/bin/env bash
# DO NOT EDIT THIS FILE AS IT IS AUTOGENERATED!


# default values of variables set from params
YARN_SETUP=false
VERSIONS=false
YARN_INSTALL=false
BROWSERSLIST=false
UPDATE_EMOJIS=false
JSON_YAML_FORMAT=false
ESLINT=false
TSC=false
USERSCRIPT=false
BUILDSCRIPT=false
PREBUILD=false
WEBPACK=false
DOCS=false
GIT_DIFF=false
ZIP=false
MODE="development"

while :; do
    case "${1-}" in
        --yarn_setup) YARN_SETUP=true ;;
        --versions) VERSIONS=true ;;
        --yarn_install) YARN_INSTALL=true ;;
        --browserslist) BROWSERSLIST=true ;;
        --update_emojis) UPDATE_EMOJIS=true ;;
        --json_yaml_format) JSON_YAML_FORMAT=true ;;
        --eslint) ESLINT=true ;;
        --tsc) TSC=true ;;
        --userscript) USERSCRIPT=true ;;
        --buildscript) BUILDSCRIPT=true ;;
        --prebuild) PREBUILD=true ;;
        --webpack) WEBPACK=true ;;
        --docs) DOCS=true ;;
        --git_diff) GIT_DIFF=true ;;
        --zip) ZIP=true ;;
        --dependencies)
          YARN_SETUP=true
          VERSIONS=true
          YARN_INSTALL=true
          BROWSERSLIST=true ;;
        --quick)
          JSON_YAML_FORMAT=true
          ESLINT=true
          TSC=true
          WEBPACK=true ;;
        --full)
          YARN_SETUP=true
          VERSIONS=true
          YARN_INSTALL=true
          BROWSERSLIST=true
          UPDATE_EMOJIS=true
          JSON_YAML_FORMAT=true
          ESLINT=true
          TSC=true
          USERSCRIPT=true
          BUILDSCRIPT=true
          PREBUILD=true
          WEBPACK=true
          DOCS=true
          GIT_DIFF=true
          ZIP=true ;;
        -p | --production) MODE="production" ;;
        -?*)
          echo "Unknown option: $1"
          exit 1 ;;
        *) break ;;
    esac
    shift
done

total_start_time=$(date +%s%N)

# [⬆] set yarn to stable
if [[ $YARN_SETUP = true ]]; then
    start_time=$(date +%s%N)
    echo "### [⬆] set yarn to stable ###"
    corepack enable
    yarn set version stable
    end_time=$(date +%s%N)
    echo "=== [⬆] set yarn to stable: $(((end_time - start_time) / 1000000))ms ==="
fi

# [ℹ] print versions (node, yarn, git)
if [[ $VERSIONS = true ]]; then
    start_time=$(date +%s%N)
    echo "### [ℹ] print versions (node, yarn, git) ###"
    echo "node: $(node -v) – yarn: $(yarn -v) – git: $(git --version)"
    end_time=$(date +%s%N)
    echo "=== [ℹ] print versions (node, yarn, git): $(((end_time - start_time) / 1000000))ms ==="
fi

# [🍱] yarn install
if [[ $YARN_INSTALL = true ]]; then
    start_time=$(date +%s%N)
    echo "### [🍱] yarn install ###"
    yarn install --immutable
    end_time=$(date +%s%N)
    echo "=== [🍱] yarn install: $(((end_time - start_time) / 1000000))ms ==="
fi

# [⬆] update browserslist
if [[ $BROWSERSLIST = true ]]; then
    start_time=$(date +%s%N)
    echo "### [⬆] update browserslist ###"
    npx -y browserslist@latest --update-db
    end_time=$(date +%s%N)
    echo "=== [⬆] update browserslist: $(((end_time - start_time) / 1000000))ms ==="
fi

# [⬆] update emojis
if [[ $UPDATE_EMOJIS = true ]]; then
    start_time=$(date +%s%N)
    echo "### [⬆] update emojis ###"
    ./node_modules/.bin/ts-node scripts/utils/fetchEmojis.ts
    end_time=$(date +%s%N)
    echo "=== [⬆] update emojis: $(((end_time - start_time) / 1000000))ms ==="
fi

# [🚨] format JSON & YAML files
if [[ $JSON_YAML_FORMAT = true ]]; then
    start_time=$(date +%s%N)
    echo "### [🚨] format JSON & YAML files ###"
    ./node_modules/.bin/ts-node scripts/format.ts || exit 1
    end_time=$(date +%s%N)
    echo "=== [🚨] format JSON & YAML files: $(((end_time - start_time) / 1000000))ms ==="
fi

# [🚨] run ESLint
if [[ $ESLINT = true ]]; then
    start_time=$(date +%s%N)
    echo "### [🚨] run ESLint ###"
    yarn eslint \
    ./docs/.vuepress/ \
    ./static/         \
    ./prebuild/       \
    ./build/          \
    ./src/            \
    ./scripts/        \
    ./typings/        \
    --ext .js,.ts,.vue,.md \
    --no-error-on-unmatched-pattern \
    --exit-on-fatal-error \
    --report-unused-disable-directives \
    --cache --cache-strategy content \
    --fix \
    || exit 1
    end_time=$(date +%s%N)
    echo "=== [🚨] run ESLint: $(((end_time - start_time) / 1000000))ms ==="
fi

# [🚨] check TypeScript
if [[ $TSC = true ]]; then
    start_time=$(date +%s%N)
    echo "### [🚨] check TypeScript ###"
    yarn tsc -b --pretty "./" || exit 1
    end_time=$(date +%s%N)
    echo "=== [🚨] check TypeScript: $(((end_time - start_time) / 1000000))ms ==="
fi

# [📜] build userscript
if [[ $USERSCRIPT = true ]]; then
    start_time=$(date +%s%N)
    echo "### [📜] build userscript ###"
    yarn tsc --pretty "src/userscript.ts" || exit 1
    end_time=$(date +%s%N)
    echo "=== [📜] build userscript: $(((end_time - start_time) / 1000000))ms ==="
fi

# [📜] build buildscript
if [[ $BUILDSCRIPT = true ]]; then
    start_time=$(date +%s%N)
    echo "### [📜] build buildscript ###"
    ./node_modules/.bin/ts-node scripts/createBuildScript.ts || exit 1
    end_time=$(date +%s%N)
    echo "=== [📜] build buildscript: $(((end_time - start_time) / 1000000))ms ==="
fi

# [🚧] run prebuild
if [[ $PREBUILD = true ]]; then
    start_time=$(date +%s%N)
    echo "### [🚧] run prebuild ###"
    ./node_modules/.bin/ts-node prebuild/index.ts "$MODE" || exit 1
    end_time=$(date +%s%N)
    echo "=== [🚧] run prebuild: $(((end_time - start_time) / 1000000))ms ==="
fi

# [👷] webpack
if [[ $WEBPACK = true ]]; then
    start_time=$(date +%s%N)
    echo "### [👷] webpack ###"
    ./node_modules/.bin/ts-node build/index.ts --esModuleInterop "$MODE" "$(git show-ref --heads --abbrev "$(git branch --show-current)" | grep -Po "(?<=[a-z0-9]{9} ).*$" --color=never)" || exit 1
    end_time=$(date +%s%N)
    echo "=== [👷] webpack: $(((end_time - start_time) / 1000000))ms ==="
fi

# [📝] build docs
if [[ $DOCS = true ]]; then
    start_time=$(date +%s%N)
    echo "### [📝] build docs ###"
    ./docs/.vuepress/node_modules/.bin/vuepress build docs || exit 1
    mkdir -p ./dist/docs
    rm -rdf ./dist/docs/*
    cp -r ./docs/.vuepress/dist/* ./dist/docs
    end_time=$(date +%s%N)
    echo "=== [📝] build docs: $(((end_time - start_time) / 1000000))ms ==="
fi

# [ℹ️] git diff
if [[ $GIT_DIFF = true ]]; then
    start_time=$(date +%s%N)
    echo "### [ℹ️] git diff ###"
    git --no-pager diff --color-words
    end_time=$(date +%s%N)
    echo "=== [ℹ️] git diff: $(((end_time - start_time) / 1000000))ms ==="
fi

# [📦] zip files
if [[ $ZIP = true ]]; then
    start_time=$(date +%s%N)
    echo "### [📦] zip files ###"
    sudo apt-get install zip
    zip -r dist.zip dist
    end_time=$(date +%s%N)
    echo "=== [📦] zip files: $(((end_time - start_time) / 1000000))ms ==="
fi

total_end_time=$(date +%s%N)

echo "=== Total: $(((total_end_time - total_start_time) / 1000000))ms ==="