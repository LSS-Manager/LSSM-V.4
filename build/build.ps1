#This script is NOT autogenerated and needs manual updates.
#It is not recommanded to use it, because windows and node dont get along very well

# Use VT if Powershell version is > 5.1
if ($Host.Version.major -gt 5) {
    $normal = "[0m"
    $bold = "[1m"
    $blue = "[34m"
    $green = "[32m"

}
else {
    $normal = $style.default
    #there is no bold so we use inverted
    $bold = $style.negative
    $blue = $( tput -T "$TERM" setaf 4 )
    $green = $( tput -T "$TERM" setaf 2 )
}

function enable_debugging {
    if ($DEBUG) {
        Set-PSDebug -Trace 2
    }
}

function disable_debugging {
    if ($DEBUG) {
        Set-PSDebug -Trace 0
    }
}

function now {
    $timestamp = [System.DateTimeOffset]::Now.ToUnixTimeMilliseconds()
    return $timestamp
}

function ms_elapsed {
    param (
        [long]$startTimestamp
    )

    $timestampNow = now
    $elapsedMilliseconds = ($timestampNow - $startTimestamp) / 1000
    return "$elapsedMilliseconds ms"
}



function print_start_message {
    param (
        [string]$message
    )

    Write-Host "$bold $blue ### $message ###$normal"
}

function print_end_message {
    param (
        [string]$message,
        [long]$startTime
    )

    $elapsedTime = ms_elapsed $startTime
    Write-Host "$bold $blue === $message : $elapsedTime === $normal"
}


# default values of variables set from params
$_RUN_STEP_NODE = $false
$_RUN_STEP_YARN_SETUP = $false
$_RUN_STEP_YARN_SYMLINK = $false
$_RUN_STEP_VERSIONS = $false
$_RUN_STEP_YARN_INSTALL = $false
$_RUN_STEP_BROWSERSLIST = $false
$_RUN_STEP_ENV = $false
$_RUN_STEP_UPDATE_EMOJIS = $false
$_RUN_STEP_FORMAT = $false
$_RUN_STEP_ESLINT = $false
$_RUN_STEP_TSC = $false
$_RUN_STEP_USERSCRIPT = $false
$_RUN_STEP_BUILDSCRIPT = $false
$_RUN_STEP_PREBUILD = $false
$_RUN_STEP_WEBPACK = $false
$_RUN_STEP_DOCS = $false
$_RUN_STEP_GIT_DIFF = $false
$_RUN_STEP_SERVE = $false
$MODE = "development"
$DEBUG = $false

foreach ($arg in $args) {
    switch ($arg) {
        "--node" {
            $_RUN_STEP_NODE = $true
        }
        "--yarn_setup" {
            $_RUN_STEP_YARN_SETUP = $true
        }
        "--yarn_symlink" {
            $_RUN_STEP_YARN_SYMLINK = $true
        }
        "--versions" {
            $_RUN_STEP_VERSIONS = $true
        }
        "--yarn_install" {
            $_RUN_STEP_YARN_INSTALL = $true
        }
        "--browserslist" {
            $_RUN_STEP_BROWSERSLIST = $true
        }
        "--env" {
            $_RUN_STEP_ENV = $true
        }
        "--update_emojis" {
            $_RUN_STEP_UPDATE_EMOJIS = $true
        }
        "--format" {
            $_RUN_STEP_FORMAT = $true
        }
        "--eslint" {
            $_RUN_STEP_ESLINT = $true
        }
        "--tsc" {
            $_RUN_STEP_TSC = $true
        }
        "--userscript" {
            $_RUN_STEP_USERSCRIPT = $true
        }
        "--buildscript" {
            $_RUN_STEP_BUILDSCRIPT = $true
        }
        "--prebuild" {
            $_RUN_STEP_PREBUILD = $true
        }
        "--webpack" {
            $_RUN_STEP_WEBPACK = $true
        }
        "--docs" {
            $_RUN_STEP_DOCS = $true
        }
        "--git_diff" {
            $_RUN_STEP_GIT_DIFF = $true
        }
        "--serve" {
            $_RUN_STEP_SERVE = $true
        }
        "--dependencies" {
            $_RUN_STEP_YARN_SETUP = $true
            $_RUN_STEP_VERSIONS = $true
            $_RUN_STEP_YARN_INSTALL = $true
            $_RUN_STEP_BROWSERSLIST = $true
        }
        "--quick" {
            $_RUN_STEP_ENV = $true
            $_RUN_STEP_FORMAT = $true
            $_RUN_STEP_ESLINT = $true
            $_RUN_STEP_TSC = $true
            $_RUN_STEP_WEBPACK = $true
        }
        "--local" {
            $_RUN_STEP_YARN_SETUP = $true
            $_RUN_STEP_VERSIONS = $true
            $_RUN_STEP_PREBUILD = $true
            $_RUN_STEP_YARN_INSTALL = $true
            $_RUN_STEP_ENV = $true
            $_RUN_STEP_TSC = $true
            $_RUN_STEP_USERSCRIPT = $true
            $_RUN_STEP_WEBPACK = $true
            $_RUN_STEP_SERVE = $true
        }
        "--pre-commit" {
            $_RUN_STEP_FORMAT = $true
            $_RUN_STEP_ESLINT = $true
            $_RUN_STEP_TSC = $true
        }
        "--full" {
            $_RUN_STEP_NODE = $true
            $_RUN_STEP_YARN_SETUP = $true
            $_RUN_STEP_YARN_SYMLINK = $true
            $_RUN_STEP_VERSIONS = $true
            $_RUN_STEP_YARN_INSTALL = $true
            $_RUN_STEP_BROWSERSLIST = $true
            $_RUN_STEP_ENV = $true
            $_RUN_STEP_UPDATE_EMOJIS = $true
            $_RUN_STEP_FORMAT = $true
            $_RUN_STEP_ESLINT = $true
            $_RUN_STEP_TSC = $true
            $_RUN_STEP_USERSCRIPT = $true
            $_RUN_STEP_BUILDSCRIPT = $true
            $_RUN_STEP_PREBUILD = $true
            $_RUN_STEP_WEBPACK = $true
            $_RUN_STEP_DOCS = $true
            $_RUN_STEP_GIT_DIFF = $true
        }
        "-p" {
            $MODE = "production"
        }
        "--production" {
            $MODE = "production"
        }
        "--debug" {
            $Debug = $true
        }
        "--port" {
            $port = $_PORT
        }
        default {
            Write-Host "Unknown option: $arg"
            exit 1
        }
    }
}

# expose the set port (or default port) as environment variable for local server
if ($_RUN_STEP_SERVE) {
    if (!(Test-Path variable:port)) {
        Write-Host "Default Port"
        $env:LSSM_PORT = '36551' # because 536551 is LSSM in base 29 but port numbers are 16-bit only so we omit the leading 5
    }
    else {
        $env:LSSM_PORT = $port
    }
}

$total_start_time = now

$NODE_VERSION = (Get-Content -Path ./package.json | ConvertFrom-Json).engines.node
$YARN_VERSION = (Get-Content -Path ./package.json | ConvertFrom-Json).packageManager.split("@")[1]
if (git rev-parse --is-inside-work-tree) {
    $GIT_REPO = $true
}
if ($GIT_REPO) {
    $GIT_BRANCH = git branch --show-current
    # Set ref to latest commit hash if HEAD is detached otherwise use branch name
    if ($GIT_BRANCH.length -gt 0) {
        $REF = git rev-parse --short HEAD
    }
    else {
        $REF = (git show-ref --heads --abbrev $GIT_BRANCH).split(" ")[1]
    }
}
else {
    $REF = "dev"
}

# [⬆️] Setup Node.js
if ($_RUN_STEP_NODE) {
    $start_time = now
    print_start_message "[⬆️] Setup Node.js"

    #Since windows is so easy with paths, we just check whether the correct version is installed and abort if not
    Get-Command "node" | out-null
    if (!$?) {
        Write-Host "Can't find a valid node.js installation. Please check that node.exe is in the `$PATH variable and try again."
        exit 1
    }
    else {
        if (([version]$NODE_VERSION).Major -lt ((Get-Command "node").Version.Major)) {
            Write-Host "Your node version is does not match the required version. Please update node before proceeding"
            exit 1
        }
    }
    print_end_message "[⬆️] Setup Node.js" $start_time
}

# [⬆] setup yarn
if ($_RUN_STEP_YARN_SETUP) {
    $start_time = now
    print_start_message "[⬆] setup yarn"
    enable_debugging
    corepack enable
    yarn set version $YARN_VERSION
    disable_debugging
    print_end_message "[⬆] setup yarn" $start_time
}


# [🔗] symlink yarn executable
if ($_RUN_STEP_YARN_SYMLINK) {
    $start_time = now
    print_start_message "[🔗] symlink yarn executable"
    enable_debugging
    $yarnPath = Get-ChildItem -Path .\.yarn\releases\ -Filter 'yarn-*.cjs' | Select-Object -First 1

    if ($null -ne $yarnPath) {
        New-Item -ItemType SymbolicLink -Path .\yarn -Value $yarnPath.FullName -Force | Out-Null
    }
    disable_debugging
    print_end_message "[🔗] symlink yarn executable" $start_time
}

# [ℹ] print versions (node, yarn, git)
if ($_RUN_STEP_VERSIONS) {
    $start_time = now
    print_start_message "[ℹ] print versions (node, yarn, git)"
    enable_debugging
    Write-Host "node: $( node -v ) – yarn: $( yarn -v ) – git: $( git --version )"
    disable_debugging
    print_end_message "[ℹ] print versions (node, yarn, git)" $start_time
}

# [🍱] yarn install
if ($_RUN_STEP_YARN_INSTALL) {
    $start_time = now
    print_start_message "[🍱] yarn install"
    enable_debugging
    yarn install --immutable
    disable_debugging
    print_end_message "[🍱] yarn install" $start_time
}

# [⬆] update browserslist
if ($_RUN_STEP_BROWSERSLIST) {
    $start_time = now
    print_start_message "[⬆] update browserslist"
    enable_debugging
    npx -y browserslist@latest --update-db
    disable_debugging
    print_end_message "[⬆] update browserslist" $start_time
}

# [🌳] set env variables
if ($_RUN_STEP_ENV) {
    $start_time = now
    print_start_message "[🌳] set env variables"
    enable_debugging
    $ref = $REF
    $BRANCH = "dummy"


    if ($ref -eq "refs/heads/master") {
        $BRANCH = "stable"
    }
    elseif ($ref -eq "refs/heads/dev") {
        $BRANCH = "beta"
    }
    elseif ($ref -like "refs/heads/*") {
        $BRANCH = $ref -replace '^refs/heads/', ''
        $BRANCH = $ref -replace '/', '-'
    }
    elseif ($ref -like "refs/pull/*") {
        $BRANCH = $BRANCH -replace "refs/pull/", "pr"
        $BRANCH = $BRANCH -replace "/merge", ""
        $BRANCH = $ref -replace '/', '-'
    }
    $NODE_PATH = (Get-Item .).FullName+"\node_modules\.bin"
    $env:Path += ";$NODE_PATH"

    disable_debugging
    print_end_message "[🌳] set env variables" $start_time
}

# [⬆] update emojis
if ($_RUN_STEP_UPDATE_EMOJIS) {
    $start_time = now
    print_start_message "[⬆] update emojis"
    enable_debugging
    yarn ts-node scripts/utils/fetchEmojis.ts
    disable_debugging
    print_end_message "[⬆] update emojis" $start_time
}

# [🎨] format files not covered by ESLint
if ($_RUN_STEP_FORMAT) {
    $start_time = now
    print_start_message "[🎨] format files not covered by ESLint"
    enable_debugging
    yarn ts-node scripts/format.ts
    if (!$?) {
        exit 1
    }
    disable_debugging
    print_end_message "[🎨] format files not covered by ESLint" $start_time
}

# [🚨] run ESLint
if ($_RUN_STEP_ESLINT) {
    $start_time = now
    print_start_message "[🚨] run ESLint"
    enable_debugging
    yarn eslint ./docs/.vuepress/ ./static/ ./prebuild/ ./build/ ./src/ ./scripts/ ./typings/ --no-error-on-unmatched-pattern --exit-on-fatal-error --report-unused-disable-directives --cache --cache-strategy content --fix
    if (!$?) {
        exit 1
    }
    disable_debugging
    print_end_message "[🚨] run ESLint" $start_time
}

# [🚨] check TypeScript
if ($_RUN_STEP_TSC) {
    $start_time = now
    print_start_message "[🚨] check TypeScript"
    enable_debugging
    yarn tsc -b --pretty "./"
    if (!$?) {
        exit 1
    }
    yarn ts-node scripts/buildUserscript.ts
    if (!$?) {
        exit 1
    }
    disable_debugging
    print_end_message "[🚨] check TypeScript" $start_time
}

# [📜] build userscript
if ($_RUN_STEP_USERSCRIPT) {
    $start_time = now
    print_start_message "[📜] build userscript"
    enable_debugging
    yarn tsc --pretty --project "src/tsconfig.userscript.json"
    if (!$?) {
        exit 1
    }
    yarn ts-node scripts/buildUserscript.ts
    if (!$?) {
        exit 1
    }
    disable_debugging
    print_end_message "[📜] build userscript" $start_time
}

# [📜] build buildscript
if ($_RUN_STEP_BUILDSCRIPT) {
    $start_time = now
    print_start_message "[📜] build buildscript"
    enable_debugging
    yarn ts-node scripts/createBuildScript.ts
    if (!$?) {
        exit 1
    }
    disable_debugging
    print_end_message "[📜] build buildscript" $start_time
}

# [🚧] run prebuild
if ($_RUN_STEP_PREBUILD) {
    $start_time = now
    print_start_message "[🚧] run prebuild"
    enable_debugging
    yarn ts-node prebuild/index.ts "$MODE" "$BRANCH" "🦄 branch label"
    if (!$?) {
        exit 1
    }
    disable_debugging
    print_end_message "[🚧] run prebuild" $start_time
}

# [👷] webpack
if ($_RUN_STEP_WEBPACK) {
    $start_time = now
    print_start_message "[👷] webpack"
    enable_debugging
    yarn ts-node build/index.ts --esModuleInterop "$MODE" "$BRANCH" "🦄 branch label"
    if (!$?) {
        exit 1
    }
    disable_debugging
    print_end_message "[👷] webpack" $start_time
}

# [📝] build docs
if ($_RUN_STEP_DOCS) {
    $start_time = now
    print_start_message "[📝] build docs"
    enable_debugging

    <##Everthing else crashes on my machine
    $rootProjectPath = Get-Location
    Set-Location .\docs\.vuepress
    .\node_modules\.bin\vuepress build $rootProjectPath\docs
    if (!$?)
    {
        exit 1
    }
    Set-Location $rootProjectPath

    New-Item -Path "./dist/docs" -ItemType Directory -Force
    Remove-Item -Path "./dist/docs/*" -Recurse -Force
    Copy-Item -Path "./docs/.vuepress/dist/*" -Destination "./dist/docs" -Recurse#>
    Write-Host "Due to a incompatibilty with the package manager on windows, it is currently not possible to build the docs"
    Write-Host "We're working on it. Sorry :("
    disable_debugging
    print_end_message "[📝] build docs" $start_time
}

# [ℹ️] git diff
if ($_RUN_STEP_GIT_DIFF -and $GIT_REPO) {
    $start_time = now
    print_start_message "[ℹ️] git diff"
    enable_debugging
    git --no-pager diff --color-words
    disable_debugging
    print_end_message "[ℹ️] git diff" $start_time
}

# Start test server
if ($_RUN_STEP_SERVE) {
    $start_time = now
    print_start_message "Start test server"
    enable_debugging
    ws -d .\dist\ --https --port="$env:LSSM_PORT" --hostname localhost
    disable_debugging
    print_end_message "Start test server" $start_time
}

print_end_message "Total" "$total_start_time"

exit 0
