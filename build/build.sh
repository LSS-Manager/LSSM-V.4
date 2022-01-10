#!/bin/bash
# Install rsync and zip for deployment
sudo apt-get update -y
sudo apt-get install -y rsync zip
# this loads nvm and enables the node version installed by nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install 16 # install node 16
nvm use 16

npm install -g yarn

# version output helps when there are debugging needs
echo "node: $(node -v) – npm: $(npm -v) – yarn: $(yarn -v) – nvm: $(nvm -v)"

npx -y browserslist@latest --update-db

yarn --frozen-lockfile
yarn run "$RUN_BRANCH"
