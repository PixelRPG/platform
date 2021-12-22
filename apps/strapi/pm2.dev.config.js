module.exports = {
  apps: [
    {
      name: "dev:@pixelrpg/strapi",
      script: "yarn run develop",
      watch: [".cache", "package.json"]
    },
  ],
};
