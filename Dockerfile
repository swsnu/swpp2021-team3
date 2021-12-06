# backend/Dockerfile
FROM python:3.8
VOLUME /app
WORKDIR /app
COPY ./backend/requirements.txt .
COPY . .
RUN pip install -r requirements.txt
RUN pip install uwsgi

CMD uwsgi \
    --wsgi-file gaejosim/wsgi.py \
    --http :8000