#!/bin/bash
# this loads nvm and enables the node version installed by nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install node # install latest node version

# version output helps when there are debugging needs
echo "node: $(node -v) – npm: $(npm -v) – yarn: $(yarn -v) – nvm: $(nvm -v)"

yarn --frozen-lockfile
yarn run $RUN_BRANCH
