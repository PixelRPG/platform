import { Controller } from "alosaur/mod.ts";
import { GamesService } from "../../../services/games.service.ts";

@Controller("/backend/api")
export class ApiController {
  constructor(
    private readonly games: GamesService,
  ) {}

}
