#!/bin/sh

BRANCH=$([ "$TRAVIS_PULL_REQUEST" = "false" ] && echo "$TRAVIS_BRANCH" || echo "$TRAVIS_PULL_REQUEST_BRANCH")

setup_git() {
  git config --global user.email "travis@lss-manager.de"
  git config --global user.name "LSS-Manager Travis"
}

commit_website_files() {
#  git checkout -b "$BRANCH"
  git branch
  git add -A
  git commit --message "👷 [BUILD] $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add origin https://"${GH_TOKEN}"@github.com/LSS-Manager/LSSM-V.4.git > /dev/null 2>&1
  git push origin "$BRANCH"
}

setup_git
commit_website_files
upload_files
