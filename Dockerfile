FROM nginx:1.20.0-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY dist/dependencies-graph/ /usr/share/nginx/html/

COPY docker/replace-env.sh /docker-entrypoint.d/

COPY dist/dependencies-graph/configurations/config.js /usr/share/template/config.js

RUN chmod -R 775 /docker-entrypoint.d/replace-env.sh
