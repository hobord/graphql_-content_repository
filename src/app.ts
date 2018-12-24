// import { getOsEnv, toNumber } from "./lib/env";
import "reflect-metadata";
require("module-alias/register");
import { Container } from 'typedi';
import { logger } from "./lib/logger";
import { createConnection } from "typeorm";
require('./services/boot');
import { httpServer } from './http';
import { addGrapQL } from './graphql'
import { useExpressServer, useContainer } from "routing-controllers";
import { SitemapController } from './http/controllers/SitemapController';

// DB CONNECTION
createConnection({
  type: "mysql",
  host: "10.20.35.111",
  port: 32091,
  username: "root",
  password: "password",
  database: "test_drupal",
  entities: [
      // __dirname + "/entity/*.js"
  ],
  synchronize: false,
}).catch(error => logger.error(error));

// HTTP CONTROLLERS
useContainer(Container);
useExpressServer(httpServer, { // register created express server in routing-controllers
  cors: true,
  classTransformer: true,
  controllers: [SitemapController] // and configure it the way you need (controllers, validation, etc.)
});

// GRAPHQL
addGrapQL(httpServer).then(() => {
  httpServer.listen(8090);
})


logger.info(
  "Http server started, listen on port: 8090" //+ getOsEnv("APP_PORT")
);


