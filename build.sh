echo Cleaning...
rm -rf ./dist

echo Resolving npm and bower dependencies
npm install
bower install

echo Updating path
export PATH=$PATH:/usr/local/bin

echo Building app
grunt