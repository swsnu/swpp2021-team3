tar xvf secrets.tar
docker stop backend_container
docker rm backend_container
docker rmi backend
git pull
docker build -t backend .
docker-compose up
