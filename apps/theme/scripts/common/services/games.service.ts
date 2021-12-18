import { StrapiGraphQLService } from "./strapi-graphql.service";
import { GamesQuery } from "@pixelrpg/graphql-sdk";

export class GamesService {
    private readonly graphql = new StrapiGraphQLService();
  
    constructor() {}
  
    public async list(locale: 'en' | 'de' = 'en') {
  
      const baseLocale = await this.graphql.sdk.games({locale: 'en'});
  
      if (locale === 'en') {
        return baseLocale;
      }
  
      const otherLocale = await this.graphql.sdk.games({locale});
      return this.mergeLocales(baseLocale, otherLocale);
    }
  
    getGameBySlug(games: GamesQuery, slug?: string) {
      if (!slug) {
        return undefined;
      }
      return games.games?.data.find((game) => game.attributes?.slug === slug);
    }
  
    private mergeLocales(baseLocale: GamesQuery, otherLocale: GamesQuery) {
      if (!baseLocale.games?.data) {
        console.warn("Can't iterate over games query!");
        return baseLocale;
      }
  
      for (const baseGame of baseLocale.games.data) {
        if (baseGame.attributes && baseGame.attributes.slug) {
          const translatedGame = this.getGameBySlug(otherLocale, baseGame.attributes.slug);
          if (!translatedGame?.attributes) {
            continue;
          }
  
          baseGame.attributes.name = translatedGame?.attributes?.name || baseGame.attributes.name;
          baseGame.attributes.slug = translatedGame?.attributes?.slug || baseGame.attributes.slug;
          baseGame.attributes.summary = translatedGame?.attributes?.summary || baseGame.attributes.summary;
          baseGame.attributes.gallery = translatedGame?.attributes?.gallery?.data.length ? translatedGame?.attributes?.gallery : baseGame.attributes.gallery;
        }
      }
  
      return baseLocale;
    }
  }