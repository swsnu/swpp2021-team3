git pull
tar xvf secrets.tar
docker stop backend_container
docker rm backend_container
docker rmi backend
docker build -t backend .
docker run -d -p 8000:8000 --rm --name backend_container backend:latest
