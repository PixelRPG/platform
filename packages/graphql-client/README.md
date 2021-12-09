# PixelRPG Platform GraphQL Client

## Export Schema

Currently you need to export the schema by hand:

* Open https://strapi.pixelrpg.org/graphql
* Click on SCHEMA -> DOWNLOAD -> SDL
* Save the file to graphql-client/src/graphql/schema/schema.graphql

## Build types

```bash
yarn run typegen
```
