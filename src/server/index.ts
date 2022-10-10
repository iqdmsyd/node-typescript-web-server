import { Next, Request, RequestHandler, Response, Server } from "restify";
import { HttpServer } from "./httpServer";
import * as restify from "restify";
import { CONTROLLERS } from "../controllers";

export class ApiServer implements HttpServer {
  private restify: Server;

  get(url: string, requestHandler: RequestHandler): void {
    this.addRoute("get", url, requestHandler);
  }
  post(url: string, requestHandler: RequestHandler): void {
    this.addRoute("post", url, requestHandler);
  }
  put(url: string, requestHandler: RequestHandler): void {
    this.addRoute("put", url, requestHandler);
  }
  del(url: string, requestHandler: RequestHandler): void {
    this.addRoute("del", url, requestHandler);
  }

  private addRoute(
    method: "get" | "post" | "put" | "del",
    url: string,
    requestHandler: RequestHandler
  ): void {
    this.restify[method](
      url,
      async (req: Request, res: Response, next: Next) => {
        try {
          return await requestHandler(req, res, next);
        } catch (e) {
          console.log(e);
          res.send(500, e);
        }
      }
    );

    console.log(`Route added ${method.toUpperCase()} ${url}`);
  }

  private addController(): void {
    CONTROLLERS.forEach((controller) => controller.initialize(this));
  }

  public start(port: number): void {
    this.restify = restify.createServer();
    this.restify.use(restify.plugins.bodyParser());
    this.restify.use(restify.plugins.queryParser());

    this.addController();

    this.restify.listen(port, () => {
      console.log(`Server is up and running on ${port}`);
    });
  }
}
