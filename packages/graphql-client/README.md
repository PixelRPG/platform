# PixelRPG Platform GraphQL Client

## Export GraphQL Schema

Currently you need to export the schema by hand:

- Open https://strapi.pixelrpg.org/graphql
- Click on SCHEMA -> DOWNLOAD -> SDL
- Save the file to graphql-client/src/graphql/schema/schema.graphql

## Build types

```bash
yarn run typegen
```

## Deno

Run this with deno:

```bash
deno run --importmap=imports.json --allow-read --allow-net test/deno.ts
```

## Node

Run this with node:

```bash
yarn run test:node
```
