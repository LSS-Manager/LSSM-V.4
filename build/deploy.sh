# Deploy data using rsync
rsync -r --delete-after "$WORK_DIR"/dist/ "$DEPLOY_DIR"
# Copy static configuration
/bin/cp -rf $DIR_STATIC $DEPLOY_DIR
