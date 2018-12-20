// import { getOsEnv, toNumber } from "./lib/env";
import "reflect-metadata";
require("module-alias/register");
import { logger } from "./lib/logger";
import { createConnection } from "typeorm";
import { httpServer } from './http';
import { addGrapQL } from './http/graphql/graphql'
require('./services/boot');

addGrapQL(httpServer).then(() => {
  httpServer.listen(8090);
})

logger.info(
  "Http server started, listen on port: 8090" //+ getOsEnv("APP_PORT")
);


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
}).then(connection => {
  // here you can start to work with your entities
}).catch(error => console.log(error));
