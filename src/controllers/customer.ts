import { Request, Response } from "restify";
import { HttpServer } from "../server/httpServer";
import { customerService } from "../service/customer";
import { Controller } from "./controller";

export class CustomerController implements Controller {
  initialize(httpServer: HttpServer): void {
    httpServer.get("/customers", this.getAll.bind(this));
    httpServer.get("/customer/:id", this.getById.bind(this));
    httpServer.post("/customer", this.create.bind(this));
    httpServer.put("/customer/:id", this.update.bind(this));
    httpServer.del("/customer/:id", this.delete.bind(this));
  }

  private async getAll(req: Request, res: Response): Promise<void> {
    res.send(await customerService.getAll());
  }
  private async getById(req: Request, res: Response): Promise<void> {
    const customer = await customerService.getById(req.params.id);
    res.send(customer ? 200 : 404, customer);
  }
  private async create(req: Request, res: Response): Promise<void> {
    res.send(await customerService.create(req.body));
  }
  private async update(req: Request, res: Response): Promise<void> {
    res.send(await customerService.update(req.params.id, req.body));
  }
  private async delete(req: Request, res: Response): Promise<void> {
    res.send(await customerService.delete(req.params.id));
  }
}
