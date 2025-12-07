import { Request, Response } from "express";
import { CreateCategoryDto } from "../../domain";

export class CategoryController {
  constructor() {}

  public createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto]: [string?, CreateCategoryDto?] =
      CreateCategoryDto.createCategory(req.body);
    if (error) return res.status(400).json({ error });
    res.json(createCategoryDto);
  };
  public getCategory = async (req: Request, res: Response) => {
    res.json("getting Category");
  };
}
