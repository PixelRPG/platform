import * as dotenv from 'dotenv';
dotenv.config();
import { resolve } from 'path';
import findRoot = require('find-root');
import { registerAs } from '@nestjs/config';
import { NestThemeConfig } from '@ribajs/nest-theme';

const THEME_ACTIVE = process.env.THEME_ACTIVE || 'nest-riba-ssr-theme';
const ROOT = findRoot(process.cwd());
const PACKAGES = resolve(ROOT, '..');
const THEME_DIR = resolve(process.env.THEME_DIR, THEME_ACTIVE) || resolve(PACKAGES, THEME_ACTIVE);

/** Used for client side requests to strapi */
const STRAPI_REMOTE_URL = process.env.STRAPI_REMOTE_URL ||
  `http://localhost:3002`;

/** Used for server side requests to strapi */
const STRAPI_LOCAL_URL = process.env.STRAPI_LOCAL_URL ||
  `http://localhost:3002`;

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

const STRAPI_GRAPHQL_PATH = process.env.STRAPI_GRAPHQL_PATH || "/graphql";

export const app = {
  root: ROOT,
  port: Number(process.env.SERVER_PORT) || Number(process.env.PORT) || 3000,
  environment:
    process.env.NODE_ENV === 'development' ? 'development' : 'production',
};

export const theme: NestThemeConfig = {
  active: THEME_ACTIVE,
  themeDir: THEME_DIR,
};

export const strapiConfig = {
  url: {
    remote: STRAPI_REMOTE_URL,
    local: STRAPI_LOCAL_URL,
  },
  auth: {
    token: STRAPI_API_TOKEN,
  },
  graphql: {
    path: STRAPI_GRAPHQL_PATH,
    url: {
      remote: STRAPI_REMOTE_URL + STRAPI_GRAPHQL_PATH,
      local: STRAPI_LOCAL_URL + STRAPI_GRAPHQL_PATH,
    },
  },
};

/**
 * Options for express-session
 * @see https://github.com/expressjs/session
 */
export const session = {
  secret: process.env.SESSION_SECRET || 'Set your own string here!',
  resave: false,
  saveUninitialized: true,
  proxy: true,
  /**
   * Required for chrome >= 80
   * @see https://shopify.dev/tutorials/migrate-your-app-to-support-samesite-cookies
   * @see https://github.com/expressjs/session#cookiesamesite
   */
  cookie: {
    maxAge: 60 * 60 * 24 * 1000,
    secure: true,
    sameSite: 'none' as boolean | 'none' | 'lax' | 'strict',
  },
};

export const appConfig = registerAs('app', () => ({
  ...app,
}));
