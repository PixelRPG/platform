import { AlosaurResponse, Controller, Get, Res } from "alosaur/mod.ts";
import { ContactService } from "../../../services/contact.service.ts";

@Controller("/backend/api")
export class ApiController {
  constructor(
    private readonly contact: ContactService,
  ) {}

}
