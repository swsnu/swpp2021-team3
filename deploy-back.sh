tar xvf secrets.tar
docker stop backend_container
docker rm backend_container
docker rmi backend
git pull
cd backend
docker build -t backend .
docker run -it -p 0.0.0.0:8000:8000 --name backend_container backend:latest 
