echo Killing the old container
docker kill gudmundurste12_tictactoe
echo Unassociating the name of the old container
docker rm gudmundurste12_tictactoe
echo Pulling
docker pull gudmundurste12/tictactoe
echo Starting the container
docker run -p 80:8080 -d -e "NODE_ENV=production" --name gudmundurste12_tictactoe gudmundurste12/tictactoe