module.exports = {
  apps: [
    {
      name: "prod:@pixelrpg/strapi",
      script: "npm run start",
      env: {
        // Yarn 2 automatically injects the .pnp file over NODE_OPTIONS
        NODE_OPTIONS: "",
      }
    },
  ],
};
