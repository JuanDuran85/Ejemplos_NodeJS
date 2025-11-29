import { Request, Response, Router } from "express";

export class AppRoutes {
  public static get routes(): Router {
    const router: Router = Router();
    router.get("/api/todos", (req: Request, res: Response) => {
      res.json([
        { id: 1, task: "Learn TypeScript", completed: false },
        { id: 2, task: "Build a REST API", completed: true },
        { id: 3, task: "Write Unit Tests", completed: false },
      ]);
    });
    return router;
  }
}
