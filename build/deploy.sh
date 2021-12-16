# Deploy data using rsync
rsync -rv --delete-after "$WORK_DIR"/dist/ "$DEPLOY_DIR"
# Copy static configuration
cp --verbose -rf $DIR_STATIC $DEPLOY_DIR

exit 0
