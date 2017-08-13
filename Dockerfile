FROM node:alpine

LABEL name "poli-gremlin-client"

MAINTAINER Mike Hathaway

RUN mkdir -p /usr/Public-Commons/poli-gremlin-client
WORKDIR /usr/Public-Commons/poli-gremlin-client

COPY . /usr/Public-Commons/poli-gremlin-client

RUN npm install
RUN npm install -g typescript
RUN npm run transpile

EXPOSE 3000

CMD [ "npm", "start" ]
