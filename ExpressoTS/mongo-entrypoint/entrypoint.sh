#!/bin/sh

echo "Creating mongo users..."
source ../docker-entrypoint-initdb.d/.env

mongosh $MONGO_DEFAULT_DB --host localhost -u $DB_INIT_USERNAME -p $DB_INIT_PWD --eval "use $DB_NAME" --eval "db.createUser({user: '$DB_USER', pwd: '$DB_PASSWORD', roles: [{role: '$DB_ROLE', db: '$DB_NAME'}]});"

echo "Mongo users created."
