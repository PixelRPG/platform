import { GraphQLClient } from "graphql-request";
import { config as env } from "dotenv";

import { getSdk } from '../src/sdk.ts';

const __dirname = new URL('.', import.meta.url).pathname;
const { API_TOKEN } = env({path: __dirname + '.env'});

const client = new GraphQLClient('https://strapi.pixelrpg.org/graphql', {
    headers: {
        authorization: 'Bearer ' + API_TOKEN,
    },
});

const sdk = getSdk(client);

const start = async () => {
    try {
        const games = await sdk.games({locale: 'de'});
        console.debug("games", games);
    } catch (error) {
        console.error(error);
    }    
}

start();