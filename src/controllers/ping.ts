import { Request, Response } from "restify";
import { HttpServer } from "../server/httpServer";
import { Controller } from "./controller";

export class PingController implements Controller {
  public initialize(httpServer: HttpServer): void {
    httpServer.get("/ping", this.ping.bind(this));
  }

  private async ping(req: Request, res: Response): Promise<void> {
    res.send(200, "Pong");
  }
}
