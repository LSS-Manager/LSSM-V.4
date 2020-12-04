CHANGED_FILES_AMOUNT=$(git status -s | wc -l)
# if more than one file modified => not only package.json changed
if [ "$CHANGED_FILES_AMOUNT" -gt 1 ]
then
  # what is the current branch?
  BRANCH=$(git branch --show-current)
  # Get current Build Version
  PACKAGE_VERSION=$(cat $WORK_DIR/package.json | grep 'version' | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
  ssh -o StrictHostKeyChecking=no -T $GIT_URL
  git remote set-url origin $GIT_URL:$GIT_PROJECT
  git config user.email "$GIT_MAIL"
  git config user.name "$GIT_USERNAME"
  git commit -am ":package: Version $PACKAGE_VERSION [tc-push]"
  git push
fi
