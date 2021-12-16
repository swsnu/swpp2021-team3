# backend/Dockerfile
FROM python:3.8
VOLUME /app
COPY . /app
RUN pip install -r /app/backend/requirements.txt
RUN pip install uwsgi
WORKDIR /app/backend/gaejosim

CMD uwsgi \
    --wsgi-file gaejosim/wsgi.py \
    --http :8000