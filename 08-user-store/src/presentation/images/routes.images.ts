import { Router } from "express";
import { ImagesController } from "./controller.images";

export class ImagesRoute {
  public static get routes(): Router {
    const router: Router = Router();
    const imageController: ImagesController = new ImagesController();
    router.get("/:type/:img", imageController.getImages);

    return router;
  }
}
