# Main

Client side code for graph generator & visualizer

## Architecture

* Typescript, React, Redux, RxJS, Webpack, Docker, propublica-congress-node, gremlin-client

## Test

React: npm test

HTTP/2 : https://webapplog.com/http2-server-push-node-express/
         test -> curl -I --verbose --capath ./config https://127.0.0.1:3000

## Running Locally

* package.json build

 npm install -g typescript

 From project root directory:
   * npm install
   * npm run build-dev
   * npm start

* docker build

 From project root directory:
   * npm install
