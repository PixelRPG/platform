'use strict';

const exportGraphQlSchemaFile = (strapi) => {
  const { printSchema } = require('graphql/utilities/printSchema');
  const fs = require('fs');
  const targetFile = "../../packages/graphql-sdk/src/graphql/schema/schema.graphql";

  const schema = strapi
  .plugin('graphql')
  .service('content-api')
  .buildSchema();

  const { isEmpty } = require('lodash/fp');

  if (!isEmpty(schema)) {
    try {
      fs.writeFileSync(targetFile, printSchema(schema));
    } catch (err) {
      strapi.log.error(err)
    }
    return;
  } else {
    strapi.log.warn('The GraphQL schema has not been generated because it is empty');
  }
}

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    exportGraphQlSchemaFile(strapi);
  },
};
