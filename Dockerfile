FROM python:3.8
VOLUME /app
WORKDIR /app
COPY ./backend/requirements.txt .
COPY . .
RUN pip install -r requirements.txt