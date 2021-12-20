import { StrapiGraphQLService } from "./strapi-graphql.service";
import { GameBasicListQuery, GameDetailQuery, Scalars } from "@pixelrpg/graphql-sdk";

export class GamesService {
    private readonly graphql = new StrapiGraphQLService();
  
    constructor() {}
  
    public async list(locale: Scalars['I18NLocaleCode'] = 'en') {
  
      const baseLocale = (await this.graphql.sdk.gameBasicList({locale: 'en'})).gameBasicList;
  
      if (locale === 'en') {
        return baseLocale;
      }
  
      const otherLocale = (await this.graphql.sdk.gameBasicList({locale})).gameBasicList;
      return this.mergeLocales(baseLocale, otherLocale);
    }

    public async get(slug: string, locale: Scalars['I18NLocaleCode'] = 'en') {
      const baseLocale = (await this.graphql.sdk.gameDetail({slug, locale: 'en'})).gameDetail;

      if (locale === 'en') {
        return baseLocale?.data[0];
      }

      const otherLocale = (await this.graphql.sdk.gameDetail({slug, locale})).gameDetail;
      return this.mergeDetailLocales(baseLocale, otherLocale)?.data[0];
    }
  
    private getGameBySlug(games: GameBasicListQuery['gameBasicList'], slug?: string) {
      if (!slug || !games?.data) {
        return undefined;
      }
      return games.data.find((game) => game.attributes?.slug === slug);
    }

    private getGameDetailBySlug(games: GameDetailQuery['gameDetail'], slug?: string) {
      if (!slug || !games?.data) {
        return undefined;
      }
      return games.data.find((game) => game.attributes?.slug === slug);
    }
  
    private mergeLocales(baseLocale: GameBasicListQuery['gameBasicList'], otherLocale: GameBasicListQuery['gameBasicList']) {
      if (!baseLocale?.data) {
        console.warn("Can't iterate over games query!");
        return baseLocale;
      }
  
      for (const baseGame of baseLocale.data) {
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

    private mergeDetailLocales(baseLocale: GameDetailQuery['gameDetail'], otherLocale: GameDetailQuery['gameDetail']) {
      if (!baseLocale?.data) {
        console.warn("Can't iterate over games query!");
        return baseLocale;
      }
  
      for (const baseGame of baseLocale.data) {
        if (baseGame.attributes && baseGame.attributes.slug) {
          const translatedGame = this.getGameDetailBySlug(otherLocale, baseGame.attributes.slug);
          if (!translatedGame?.attributes) {
            continue;
          }
  
          baseGame.attributes.name = translatedGame?.attributes?.name || baseGame.attributes.name;
          baseGame.attributes.slug = translatedGame?.attributes?.slug || baseGame.attributes.slug;
          baseGame.attributes.description = translatedGame?.attributes?.description || baseGame.attributes.description;
          baseGame.attributes.gallery = translatedGame?.attributes?.gallery?.data.length ? translatedGame?.attributes?.gallery : baseGame.attributes.gallery;
        }
      }
  
      return baseLocale;
    }
  }