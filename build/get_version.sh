PACKAGE_VERSION=$(cat $WORK_DIR/package.json | grep 'version' | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
