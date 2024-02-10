import * as fs from 'fs';
import path from 'path';

import yaml from 'js-yaml';

import { PORT_ENV_KEY } from '../src/config';

interface Workflow {
    jobs: {
        build: {
            steps: { name: string; run?: string; id?: string }[];
        };
    };
}

type Job = Workflow['jobs']['build']['steps'][0];

const excludeFromImport = [
    'get_node_yarn_versions',
    'yarn_cache_dir',
    'generate_token',
    'output',
    'zip',
    'git_prepare',
    'import_gpg',
    'git_push',
];
const excludeFromFullBuild = ['serve'];
const shortcuts = {
    'dependencies': ['yarn_setup', 'versions', 'yarn_install', 'browserslist'],
    'quick': ['env', 'format', 'eslint', 'tsc', 'webpack'],
    'local': [
        'yarn_setup',
        'versions', //not required, just for debugging
        'yarn_install',
        'env',
        'tsc',
        'userscript',
        'webpack',
        'serve',
    ],
    'pre-commit': ['format', 'eslint', 'tsc'],
    'full': [],
};
const extraConditions: Record<string, string[]> = {
    git_diff: ['$GIT_REPO = true'],
};

const getExtraConditionsString = (step: string) => {
    const conditions = extraConditions[step];
    if (!conditions) return '';
    return ` && ${conditions
        .map(condition => `[[ ${condition} ]]`)
        .join(' && ')}`;
};

const script = [
    `#!/usr/bin/env bash
# DO NOT EDIT THIS FILE AS IT IS AUTOGENERATED!

# exit script when any command fails
set -e`,
    `# Use tput for enhanced styling only if terminal type is set and a tty.
# ESC is directly included in the string to avoid the -e flag on echo calls.
if [[ -z "$TERM" ]] || [[ ! -t 1 ]]; then
    normal="\x1b[0m"
    bold="\x1b[1m"
    blue="\x1b[34m"
    green="\x1b[32m"
else
    normal=$(tput -T "$TERM" sgr0)
    bold=$(tput -T "$TERM" bold)
    blue=$(tput -T "$TERM" setaf 4)
    green=$(tput -T "$TERM" setaf 2)
fi`,
    `enable_debugging () {
    if [[ $DEBUG = true ]]; then
        set -x
    fi
}`,
    `disable_debugging () {
    if [[ $DEBUG = true ]]; then
        set +x
    fi
}`,
    `now () {
    local timestamp
    timestamp="$(date +%s%N)"
    echo "\${timestamp/N/000000000}"
}`,
    `ms_elapsed () {
    local timestamp_now
    timestamp_now=$(now)
    echo $(((10#$timestamp_now - 10#$1) / 1000000))ms
}`,
    `print_start_message () {
    echo "\${bold}$\{blue}### $1 ###$\{normal}"
}`,
    `print_end_message () {
    echo "\${bold}$\{green}=== $1: $(ms_elapsed "$2") [$(date +"%Y-%m-%d %H:%M:%S %Z")] ===$\{normal}"
}`,
];

const getStepName = (step: string) => `_run_step_${step}`.toUpperCase();

try {
    const workflow = yaml.load(
        fs.readFileSync(
            path.join(__dirname, '..', '.github', 'workflows', 'build.yml'),
            'utf8'
        )
    ) as Workflow;

    const steps = [
        {
            name: '[⬆️] Setup Node.js',
            run:
                'disable_debugging\n' +
                'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash\n' +
                // not a JS template string but bash
                // eslint-disable-next-line no-template-curly-in-string
                'if [[ -n "${NVM_DIR-}" ]]; then\n' +
                '    NVM_DIR="$NVM_DIR"\n' +
                // not a JS template string but bash
                // eslint-disable-next-line no-template-curly-in-string
                'elif [[ -n "${XDG_CONFIG_HOME-}" ]]; then\n' +
                // not a JS template string but bash
                // eslint-disable-next-line no-template-curly-in-string
                '    NVM_DIR="${XDG_CONFIG_HOME}/nvm"\n' +
                'else\n' +
                '    NVM_DIR="$HOME/.nvm"\n' +
                'fi\n' +
                '[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"\n' +
                'nvm install "$NODE_VERSION"\n' +
                'enable_debugging',
            id: 'node',
        } as Job,
    ]
        .concat(
            workflow.jobs.build.steps.filter(
                step => step.run && !excludeFromImport.includes(step.id ?? '')
            )
        )
        .concat([
            {
                name: 'Start test server',
                run: `ws -d ./dist/ --https --port="$${PORT_ENV_KEY}" --hostname localhost & echo "webserver moved to background. Get it back with 'fg'"`,
                id: 'serve',
            } as Job,
        ]);
    const stepIds = steps.map(step => step.id ?? '');

    script.push(
        `
# default values of variables set from params
${stepIds.map(id => `${getStepName(id)}=false`).join('\n')}
MODE="development"
DEBUG=false

while :; do
    case "\${1-}" in
${stepIds.map(id => `        --${id}) ${getStepName(id)}=true ;;`).join('\n')}
${Object.entries(shortcuts)
    .map(
        ([shortcut, steps]) => `        --${shortcut})
          ${(shortcut === 'full'
              ? stepIds.filter(step => !excludeFromFullBuild.includes(step))
              : steps
          )
              .map(step => `${getStepName(step)}=true`)
              .join('\n          ')} ;;`
    )
    .join('\n')}
        -p | --production) MODE="production" ;;
        --debug) DEBUG=true ;;
        --port) shift; _PORT=$1 ;;
        -?*)
          echo "Unknown option: $1"
          exit 1 ;;
        *) break ;;
    esac
    shift
done`,
        `# expose the set port (or default port) as environment variable for local server
if [[ $${getStepName('serve')} = true ]]; then
    if [[ -z "$_PORT" ]]; then
        export ${PORT_ENV_KEY}=36551 # because 536551 is LSSM in base 29 but port numbers are 16-bit only so we omit the leading 5
    else
        export ${PORT_ENV_KEY}=$_PORT
    fi
fi`,
        'total_start_time=$(now)',
        `NODE_VERSION=$(grep '"node":' ./package.json | awk -F: '{ print $2 }' | sed 's/[",]//g' | sed 's/\\^v//g' | tr -d '[:space:]')
YARN_VERSION=$(grep '"packageManager":' ./package.json | awk -F: '{ print $2 }' | sed 's/[",]//g' | sed 's/yarn@//g' | tr -d '[:space:]')
if [[ -n "$(git rev-parse --is-inside-work-tree 2>/dev/null)" ]]; then
    GIT_REPO=true
fi
if [[ $GIT_REPO = true ]]; then
    GIT_BRANCH=$(git branch --show-current)
    # Set ref to latest commit hash if HEAD is detached otherwise use branch name
    if [[ -z "$GIT_BRANCH" ]]; then
        REF=$(git rev-parse --short HEAD)
    else
        # | xargs to remove leading and trailing whitespaces
        REF=$(git show-ref --heads --abbrev "$GIT_BRANCH" | grep -Eo " .*$" --color=never | xargs)
    fi
else
    REF="dev"
fi`,
        ...steps.map(step =>
            [
                `# ${step.name}`,
                `if [[ $${getStepName(
                    step.id ?? ''
                )} = true ]]${getExtraConditionsString(step.id ?? '')}; then
    start_time=$(now)
    print_start_message "${step.name}"
    enable_debugging
    ${
        (step.id === 'env'
            ? step.run?.match(
                  /(?<=# ===BEGIN \$BRANCH===).*?(?=# ===END \$BRANCH===)/su
              )?.[0]
            : step.run
        )
            ?.trim()
            .replace(/\n/gu, '\n    ')
            .replace(/\$\{\{ env\.MODE \}\}/gu, '$MODE')
            .replace(/\$\{\{ env\.BRANCH \}\}/gu, '$BRANCH')
            .replace(/\$\{\{ env\.NODE_VERSION \}\}/gu, '$NODE_VERSION')
            .replace(/\$\{\{ env\.YARN_VERSION \}\}/gu, '$YARN_VERSION')
            .replace(/\$\{\{ inputs\.label \}\}/gu, '🦄 branch label')
            .replace(/\$\{\{ (github|inputs)\.ref \}\}/gu, '$REF') ?? ''
    }
    disable_debugging
    print_end_message "${step.name}" "$start_time"
fi`,
            ]
                .join('\n')
                .replace(
                    /(?<=\n)\W*enable_debugging\n\W*disable_debugging\n/gu,
                    ''
                )
        ),
        'print_end_message "Total" "$total_start_time"',
        'exit 0'
    );

    const scriptPath = path.join(__dirname, '..', 'build', 'build.sh');

    fs.writeFileSync(scriptPath, script.join('\n\n'));
    fs.chmodSync(scriptPath, 0o755);
} catch (e) {
    console.log(e);
}
