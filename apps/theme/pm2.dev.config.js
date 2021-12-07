module.exports = {
  apps: [
    {
      name: "dev:@pixelrpg/theme",
      script: "yarn workspace @pixelrpg/theme run watch",
      watch: ["package.json", "../../../.pnp.cjs"],
      instances: 1,
      env: {
        NODE_ENV: "development",
        DEBUG: "",
      },
    },
  ],
};
