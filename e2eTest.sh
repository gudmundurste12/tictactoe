#Update the chrome driver
node node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update

echo Killing the old container
docker kill gudmundurste12_tictactoe_dev
echo Unassociating the name of the old container
docker rm gudmundurste12_tictactoe_dev
echo Pulling
docker pull gudmundurste12/tictactoe
echo Starting the container
docker run -p 80:8080 -d -e "NODE_ENV=production" --name gudmundurste12_tictactoe_dev gudmundurste12/tictactoe


#Run the tests
grunt test:e2e