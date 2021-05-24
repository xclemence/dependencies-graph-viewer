#!/usr/bin/env sh
set -eu

envsubst < /usr/share/template/config.js > /usr/share/nginx/html/configurations/config.js
