import { Request, Response } from "express";

export class CategoryController {
  constructor() {}

  public createCategory = async (req: Request, res: Response) => {
    res.json("create Category");
  };
  public getCategory = async (req: Request, res: Response) => {
    res.json("getting Category");
  };
}
