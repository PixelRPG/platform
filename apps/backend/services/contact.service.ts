import { Injectable } from "alosaur/mod.ts";
import { StrapiService } from "./strapi.service.ts";
import { StrapiRestAPIContact } from "../types/strapi-rest-api-contact.ts";
import { StrapiImage } from "../types/strapi-image.ts";

@Injectable()
export class ContactService {
  private readonly strapi = new StrapiService("contact");

  constructor() {}

  public async get() {
    try {
      // const contact = await this.strapi.get<StrapiRestAPIContact>();
      return {};
    } catch (error) {
      throw error;
    }
  }
}
