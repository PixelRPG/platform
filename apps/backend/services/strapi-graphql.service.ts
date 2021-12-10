import { strapiConfig } from "../settings.ts";
import { StrapiImage } from "../types/strapi-image.ts";
import { getSdk } from "graphql-sdk/mod.ts";
import { GraphQLClient } from 'graphql-request';

export class StrapiGraphQLService {
  public readonly config = strapiConfig;
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
    const url = new URL(this.config.url.remote);
    url.pathname = url.pathname + image.url;
    return url.toString();
  }
}
