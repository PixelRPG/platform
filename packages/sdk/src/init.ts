import { StrapiGraphQLService } from './services/strapi-graphql.service';
export const init = (graphqlUrl: string, strapiUrl: string, token?: string) => {
    StrapiGraphQLService.setSingleton(graphqlUrl, strapiUrl, token);
}