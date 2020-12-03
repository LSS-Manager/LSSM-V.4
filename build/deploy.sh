# Deploy data using rsync
rsync -e "ssh -o LogLevel=error -o StrictHostKeyChecking=no -p $SERVER_PORT" -r --delete-after $TEAMCITY_GIT_PATH/dist/ $SERVER_USER@$SERVER:$DEPLOY_DIR
# Copy static configuration
ssh -o LogLevel=error -o StrictHostKeyChecking=no -p $SERVER_PORT $SERVER_USER@$SERVER "cp -r $DIR_STATIC% $DIR_STATIC%"
