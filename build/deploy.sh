# Deploy data using rsync
rsync -r --delete-after --exclude "$WORK_DIR"/dist/static/* "$WORK_DIR"/dist/ "$DEPLOY_DIR"
# Copy static configuration
cp -rf "$DIR_STATIC"/* "$DEPLOY_DIR"
rsync -r "$WORK_DIR"/dist/static/ "$DEPLOY_DIR"/static

exit 0
