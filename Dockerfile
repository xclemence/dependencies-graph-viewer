### STAGE 1: Build ###

FROM node:14-alpine as builder


### STAGE 2: Setup ###

FROM nginx:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
