# SSH-Key entschlüsseln
openssl aes-256-cbc -K $encrypted_db2095f63ba3_key -iv $encrypted_db2095f63ba3_iv -in deploy_rsa.enc -out /tmp/deploy_rsa -d
# LSS-Manager-Server als Vertrauenswürdig einstufen
eval "$(ssh-agent -s)"
chmod 600 /tmp/deploy_rsa
ssh-add /tmp/deploy_rsa
ssh-keyscan -p $PROD_PORT $PROD_SERVER 2>&1 >> $HOME/.ssh/known_hosts
# Daten des Builds auf den Server kopieren
rsync -e "ssh -p $PROD_PORT" -r --delete-after $TRAVIS_BUILD_DIR/dist/ $PROD_USER@$PROD_SERVER:$DIR
# Statische Daten und Konfigurationen überschreiben
ssh -t -p $PROD_PORT $PROD_USER@$PROD_SERVER << EOF
	cp -r /var/www/static $DIR
	mkdir $DIR/static/missions
EOF