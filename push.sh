#!/bin/sh

setup_git() {
  git config --global user.email "travis@lss-manager.de"
  git config --global user.name "LSS-Manager Travis"
}

commit_website_files() {
  git checkout -b gh-pages
  git add -A
  git commit --message "👷 [BUILD] $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add origin https://${GH_TOKEN}@github.com/LSS-Manager/LSSM-V.4.git > /dev/null 2>&1
  if [ $TRAVIS_PULL_REQUEST != "false" ]
  then
      git push --quiet --set-upstream origin $TRAVIS_BRANCH
  else
      git push --quiet --set-upstream origin $TRAVIS_PULL_REQUEST_BRANCH
  fi
}

setup_git
commit_website_files
upload_files
