FROM python:3.8
VOLUME /app/backend
WORKDIR /app/backend
COPY requirements.txt .
COPY . .
RUN pip install -r requirements.txt