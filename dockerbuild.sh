cp ./Dockerfile ./dist/
cd dist
npm install --production

echo Building docker image
docker build -t gudmundurste12/tictactoe .

echo "Done"
