### STAGE 1: Build ###

FROM node:14-alpine as builder

WORKDIR /usr/angular-workdir

COPY . /usr/angular-workdir
RUN yarn --frozen-lockfile && \
    node node_modules/@angular/cli/bin/ng build --prod && \
    chmod -R 755 docker/docker-entrypoint.sh

### STAGE 2: Setup ###

FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY src/assets/config.json /usr/share/template/config.json

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/angular-workdir/dist/dependencies-graph/ /usr/share/nginx/html/

EXPOSE 4200

COPY --from=builder /usr/angular-workdir/docker/docker-entrypoint.sh / 
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
