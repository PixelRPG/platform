import { Injectable } from "alosaur/mod.ts";
import { SEOOptions } from "../types/seo-options.ts";
import { SEO } from "../types/seo.ts";

@Injectable()
export class SeoService {
  constructor() {}

  public get(options: SEOOptions) {
    const seo: SEO = {
      canonical: "https://www.pixelrpg.org",
      title: "PixelPRG",
      type: "website",
      locale: "de_DE",
      // deno-lint-ignore camelcase
      site_name: "PixelPRG",
      keywords: "PixelPRG",
    };

    // if (options.template === "page" && options.page) {
    //   seo.canonical = seo.canonical + "/" + options.page.slug;
    //   seo.title += " - " + options.page.name;
    //   seo.description = this.cutStr(this.stripHtml(options.page.content));
    // }

    return seo;
  }

  public stripHtml(str: string) {
    return str.replace(/(<([^>]+)>)/ig, "");
  }

  public cutStr(str: string, length = 170) {
    if (str.length > length) {
      str = str.substring(0, length - 3) + "...";
    }
    return str;
  }
}
