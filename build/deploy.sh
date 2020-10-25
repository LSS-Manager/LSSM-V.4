rsync -e "ssh -p $PROD_PORT" -r --delete-after $TRAVIS_BUILD_DIR/dist/ $PROD_USER@$PROD_SERVER:$DIR
ssh -p $PROD_PORT $PROD_USER@$PROD_SERVER 'cp /var/www/static/.configs.json $DIR/static/.configs.json'
ssh -p $PROD_PORT $PROD_USER@$PROD_SERVER 'cp /var/www/static/db_access.php $DIR/static/db_access.php'