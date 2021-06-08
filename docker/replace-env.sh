#!/usr/bin/env sh
set -eu

envsubst < /usr/share/nginx/html/configurations/config.js > /usr/share/nginx/html/configurations/config.js.tmp

mv /usr/share/nginx/html/configurations/config.js.tmp /usr/share/nginx/html/configurations/config.js
