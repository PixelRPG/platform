import { StrapiImage } from "@ribajs/strapi";
import { GraphQLClient } from 'graphql-request';
import { getSdk } from "@pixelrpg/graphql-sdk";
import { strapiConfig } from "../settings";

export class StrapiGraphQLService {
  public sdk: ReturnType<typeof getSdk>;

  constructor() {
    this.sdk = this.initSdk();
  }

  private initSdk() {
    
    const client = new GraphQLClient(strapiConfig.graphql.url.local, {
      headers: {
          authorization: 'Bearer ' + strapiConfig.auth.token,
      },
    });
    const sdk = getSdk(client);
    return sdk;
  }

  public getRemoteStrapiImageUrl(image: StrapiImage) {
    const url = new URL(strapiConfig.url.remote);
    url.pathname = url.pathname + image.url;
    return url.toString();
  }
}
