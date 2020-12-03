CHANGED_FILES_AMOUNT=$(git status -s | wc -l)
# if more than one file modified => not only package.json changed
if [ "$CHANGED_FILES_AMOUNT" -gt 1 ]
then
  # what is the current branch?
  BRANCH=$(git branch --show-current)
  echo "$BRANCH"

  # yeah, let's just commit these changes :)
  # TODO: improve commit msg a bit (Build version?)
  git commit -a -m "👷"
fi
