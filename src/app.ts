// import { getOsEnv, toNumber } from "./lib/env";
import "reflect-metadata";
import { logger } from "./lib/logger";
import { httpServer } from './http';
import {addGrapQL} from './http/graphql/graphql'
require("module-alias/register");
require('./services/index');

addGrapQL(httpServer).then(() => {
  httpServer.listen(8090);
})

logger.info(
  "Http server started, listen on port: 8090" //+ getOsEnv("APP_PORT")
);
