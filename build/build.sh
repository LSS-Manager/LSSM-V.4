#!/bin/bash
# Install rsync and zip for deployment
sudo apt-get update -y
sudo apt-get install -y rsync zip
# this loads nvm and enables the node version installed by nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install 18 # install node 18
nvm use 18

npm install -g yarn

# version output helps when there are debugging needs
echo "node: $(node -v) – npm: $(npm -v) – yarn: $(yarn -v) – nvm: $(nvm -v)"

echo "=== main: update browserslist ==="
npx -y browserslist@latest --update-db
echo "=/= END: main: update browserslist =/="
echo "=== main: yarn install ==="
yarn install --frozen-lockfile
echo "=/= END: main: yarn install =/="

cd ./docs/.vuepress/
echo "=== docs: update browserslist ==="
npx -y browserslist@latest --update-db
echo "=/= END: docs: update browserslist =/="
echo "=== docs: yarn install ==="
yarn install --frozen-lockfile
echo "=/= END: docs: yarn install =/="
cd ../../

yarn run "$RUN_BRANCH"
