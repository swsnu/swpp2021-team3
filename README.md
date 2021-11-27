# swpp2021-team3

[![Build Status](https://travis-ci.com/swsnu/swpp2021-team3.svg?branch=master)](https://travis-ci.com/swsnu/swpp2021-team3)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2021-team3&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2021-team3)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2021-team3/badge.svg?branch=master&service=github)](https://coveralls.io/github/swsnu/swpp2021-team3?branch=master)

## Backend
### run
You should create mysql database and user mentioned in the `gaejosim/settings.py`.
```
cd backend/gaejosim
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### test
```
cd backend/gaejosim
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
coverage run --source='.' --omit=manage.py manage.py test 
coverage report
```

## Frontend
### run
```
cd frontend/gaejosim
yarn
yarn start
```

### test
```
cd fronted/gaejosim
yarn
yarn test
```
