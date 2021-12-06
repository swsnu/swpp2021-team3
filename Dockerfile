# backend/Dockerfile
FROM python:3.8
VOLUME /app
WORKDIR /app
COPY ./backend/requirements.txt .
COPY . .
RUN pip install -r requirements.txt
RUN pip install uwsgi
RUN cd backend/gaejosim/gaejosim/

CMD uwsgi \
    --wsgi-file backend/gaejosim/gaejosim/wsgi.py \
    --http :8000