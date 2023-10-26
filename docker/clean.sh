docker stop $(docker ps -aq --filter "network=fluence_subnet")
docker container rm $(docker ps -aq --filter "network=fluence_subnet")
docker network remove fluence_subnet