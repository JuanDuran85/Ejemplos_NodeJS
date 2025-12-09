import { Request, Response } from "express";
import { ProductsService } from "../services";
import { CreateProductDto, HandleError, PaginationDto } from "../../domain";

export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  public createProduct = async (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.createProduct({
      ...req.body,
      user: req.body.user.id,
    });
    if (error) return res.status(400).json({ error });

    this.productService
      .createProduct(createProductDto!)
      .then((product) => res.status(201).json(product))
      .catch((error) => HandleError.handleError(error, res));
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

    this.productService
      .getAllProducts(paginationDto!)
      .then((products) => res.status(200).json(products))
      .catch((error) => HandleError.handleError(error, res));
  };
}
