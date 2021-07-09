FROM node:14

RUN mkdir -p /src

COPY ./ /src/app

RUN cd /src/app/ && npm i

CMD ["serverless", "deploy"]
