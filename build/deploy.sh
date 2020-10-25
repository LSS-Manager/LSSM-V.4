rsync -e "ssh -p $PROD_PORT" -r --delete-after $TRAVIS_BUILD_DIR/dist/ $PROD_USER@$PROD_SERVER:$DIR
ssh -p $PROD_PORT $PROD_USER@$PROD_SERVER cp -r /var/www/static $DIR
ssh -p $PROD_PORT $PROD_USER@$PROD_SERVER mkdir $DIR/static/missions
