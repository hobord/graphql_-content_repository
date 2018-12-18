FROM node:9

RUN apt-get update; apt-get install git

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG APP_NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

COPY . /usr/src/app/

# Build app
RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3333

# start command
CMD [ "npm", "run", "start" ]
