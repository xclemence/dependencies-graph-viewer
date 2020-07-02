### STAGE 1: Build ###

FROM node:14-alpine as builder

WORKDIR /usr/angular-workdir


COPY . /usr/angular-workdir
RUN yarn --frozen-lockfile && \
    node node_modules/@angular/cli/bin/ng build --prod

### STAGE 2: Setup ###

FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/angular-workdir/dist/DependenciesGraph /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
