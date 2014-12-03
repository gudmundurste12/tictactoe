echo Cleaning...
rm -rf ./dist

echo Resolving npm and bower dependencies
npm install
bower install

echo Updating path
export PATH=$PATH:/usr/local/bin

echo Building app
grunt

rc=$?
if [ $rc -ne 0 ]
then
	echo Build failed. Exiting
	exit $rc
else

cp ./Dockerfile ./dist/
cd dist
npm install --production

echo Building docker image
docker build -t gudmundurste12/tictactoe .

echo "Done"
fi