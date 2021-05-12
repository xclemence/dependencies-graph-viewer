#!/usr/bin/env sh
set -eu

envsubst < /usr/share/template/config.json > /usr/share/nginx/html/assets/config.json

exec "$@"
