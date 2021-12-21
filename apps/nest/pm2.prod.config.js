module.exports = {
  apps: [
    {
      name: "prod:@pixelrpg/nest",
      script: "yarn run build && yarn run start:prod",
    },
  ],
};

