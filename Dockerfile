### STAGE 1: Build ###

FROM node:14-alpine as builder

WORKDIR /usr/angular-workdir


COPY . /usr/angular-workdir
RUN yarn --frozen-lockfile && \
    node node_modules/@angular/cli/bin/ng build --prod

### STAGE 2: Setup ###

FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY src/assets/config.json /usr/share/template/config.json

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/angular-workdir/dist/DependenciesGraph /usr/share/nginx/html

EXPOSE 80

COPY docker/docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
