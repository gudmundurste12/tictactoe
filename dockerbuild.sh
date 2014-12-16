echo Cleaning...
rm -rf ./dist

echo Resolving npm and bower dependencies
npm install
unzip -o -q node_modules_patch/mongoose-migrate.zip -d node_modules
bower install

echo Updating path
export PATH=$PATH:/usr/local/bin

echo Starting mongodb
service mongodb start

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

rc=$?
if [ $rc -ne 0 ]
then
	echo Docker build failed. Exiting
	exit $rc
fi

echo "Done"
fi