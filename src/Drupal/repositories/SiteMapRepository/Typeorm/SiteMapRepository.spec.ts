import "reflect-metadata";
require("module-alias/register");
import { createConnection, getConnection } from "typeorm";
import { expect } from "chai";
import { SiteMapRepository } from './SiteMapRepository';

describe("DrupalSitemapRepository tests", () => {
  let repository: SiteMapRepository;
  beforeEach(async () => {
    await createConnection({
      type: "mysql",
      host: "10.20.35.111",
      port: 32091,
      username: "root",
      password: "password",
      database: "test_drupal",
      entities: [],
      synchronize: false,
    }).catch(error => console.error(error));;

    repository = new SiteMapRepository();
  })

  afterEach(async () => {
    await getConnection().close();
  })

  it("connect to db", async () => {
    const sitemap = await repository.getSiteMap('en');
    // const sitemap = await repository.getSpecificUriData('/test_casino_article','en');
    console.log(sitemap);
    expect(true).equal(true);
  });
});

