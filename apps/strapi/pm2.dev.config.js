module.exports = {
  apps: [
    {
      name: "dev:@pixelrpg/strapi",
      script: "npm run develop",
      watch: [".cache", "package.json"],
      env: {
        // Yarn 2 automatically injects the .pnp file over NODE_OPTIONS
        NODE_OPTIONS: "",
      },
    },
  ],
};
