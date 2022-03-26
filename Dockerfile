FROM node:15.5.0-alpine

RUN apk update && apk add --no-cache \
      curl \
      bash

WORKDIR /app
COPY package*.json ./
COPY yarn* ./

RUN yarn

COPY . .

EXPOSE 8000

CMD yarn dev
