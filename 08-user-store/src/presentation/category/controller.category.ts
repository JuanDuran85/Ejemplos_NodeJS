import { Request, Response } from "express";
import { CreateCategoryDto, HandleError } from "../../domain";
import { CategoryService } from "../services";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  public createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto]: [string?, CreateCategoryDto?] =
      CreateCategoryDto.createCategory(req.body);
    if (error) return res.status(400).json({ error });

    this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then((category) => res.status(201).json(category))
      .catch((error) => HandleError.handleError(error, res));
  };

  public getCategory = async (req: Request, res: Response) => {
    res.json("getting Category");
  };
}
