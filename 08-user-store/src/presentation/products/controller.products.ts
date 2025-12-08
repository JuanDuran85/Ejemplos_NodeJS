import { Request, Response } from "express";
import { ProductsService } from "../services";
import { PaginationDto } from "../../domain";

export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  public createProduct = async (req: Request, res: Response) => {
    return res.json("create products");
  };

  public getAllProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.createPagination(
      Number(page),
      Number(limit)
    );

    if (error) {
      return res.status(400).json({ error });
    }

    return res.json("get products");
  };
}
