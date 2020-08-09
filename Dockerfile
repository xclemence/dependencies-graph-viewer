FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY src/assets/config.json /usr/share/template/config.json

RUN rm -rf /usr/share/nginx/html/*

COPY dist/dependencies-graph/ /usr/share/nginx/html/

EXPOSE 4200

COPY docker/docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
