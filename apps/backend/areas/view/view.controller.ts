import { Controller, Get, HttpError, View } from "alosaur/mod.ts";
import { GamesService } from "../../services/games.service.ts";
import { ViewContext } from "../../types/view-context.ts";

@Controller()
export class ViewController {
  constructor(
    private readonly games: GamesService,
  ) {}

  @Get("/")
  public async renderHomePage() {
    const ctx: ViewContext = {};
    try {
      const games = await this.games.list({
        locale: "en",
      });
      const html = await View("templates/home", {
        ctx,
        games: games.games?.data
      });
      return html;
    } catch (error) {
      console.error(error);
      return this.renderErrorPage(error, ctx);
    }
  }

  public async renderErrorPage(error: HttpError, ctx: ViewContext) {
    const html = await View("templates/error", {
      error,
      ctx,
    });
    return html;
  }

  public async renderMaintenancePage(model: any) {
    const html = await View("templates/maintenance", model);
    return html;
  }
}
