# Deploy data using rsync
rsync -r --delete-after "$WORK_DIR"/dist/ "$DEPLOY_DIR"
# Copy static configuration
cp -rf $DIR_STATIC $DEPLOY_DIR
