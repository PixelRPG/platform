import { StrapiGraphQLService } from "./strapi-graphql.service";
import { GameBasicEntityFragment, GameDetailEntityFragment, Scalars } from "../sdk";

export class GamesService {

  private readonly graphql: StrapiGraphQLService

  constructor() {
    this.graphql = StrapiGraphQLService.getSingleton();
  }

  public async list(locale: Scalars['I18NLocaleCode'] = 'en') {

    const english = (await this.graphql.sdk.gamesBasic({locale: 'en'})).games;

    if(!english?.data) {
      return english
    }

    if (locale === 'en') {
      return english;
    }

    const otherLocale = (await this.graphql.sdk.gamesBasic({locale})).games;

    if(!otherLocale?.data) {
      return otherLocale
    }

    english.data = this.mergeLocales(english?.data, otherLocale?.data);
    return english; 
  }

  public async get(slug: string, locale: Scalars['I18NLocaleCode'] = 'en') {
    const english = (await this.graphql.sdk.gamesDetail({slug, locale: 'en'})).games;

    if(!english?.data) {
      return english
    }

    if (locale === 'en') {
      return english;
    }

    const otherLocale = (await this.graphql.sdk.gamesDetail({slug, locale})).games;

    if(!otherLocale?.data) {
      return otherLocale
    }

    english.data = this.mergeLocales(english?.data, otherLocale?.data);
    return english;
  }

  private getGameBySlug(games: GameBasicEntityFragment[] | GameDetailEntityFragment[], slug?: string) {
    if (!slug || !games) {
      return undefined;
    }
    return games.find((game) => game.attributes?.slug === slug);
  }

  private mergeLocales(baseLocale: GameBasicEntityFragment[] | GameDetailEntityFragment[], otherLocale: GameBasicEntityFragment[] | GameDetailEntityFragment[]) {
    if (!baseLocale) {
      console.warn("Can't iterate over games query!");
      return baseLocale;
    }

    for (const baseGame of baseLocale) {
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