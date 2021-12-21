import { GraphQLClient } from 'graphql-request';
import { getSdk, ImageOrVideoFragment } from "../sdk";

export class StrapiGraphQLService {
  protected _sdk: ReturnType<typeof getSdk>;
  protected static instance?: StrapiGraphQLService;

  protected constructor(graphqlUrl: string, private readonly strapiUrl: string, token?: string) {
    const client = new GraphQLClient(graphqlUrl, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    this._sdk = getSdk(client);
  }
  public get sdk() {
    return this._sdk;
  }

  public static getSingleton() {
    if (this.instance) {
      return this.instance;
    }

    throw new Error(
      `Singleton of StrapiGraphQLService not defined, please call setSingleton first!`
    );
  }

  public static setSingleton(graphqlUrl: string, strapiUrl: string, token?: string) {
    if (this.instance) {
      throw new Error(`Singleton of StrapiGraphQLService already defined!`);
    }
    this.instance = new this(graphqlUrl, strapiUrl, token);
    return this.instance;
  }

  public getRemoteStrapiImageUrl(image: ImageOrVideoFragment) {
    const url = new URL(this.strapiUrl);
    url.pathname = url.pathname + image.url;
    return url.toString();
  }
}
