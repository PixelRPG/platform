module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '19205df4c84172f284e9c9eb07af66b7'),
  },
});
