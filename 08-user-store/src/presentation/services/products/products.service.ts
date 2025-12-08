import { ProductModel } from "../../../data";
import { CreateProductDto, CustomErrors, PaginationDto } from "../../../domain";

export class ProductsService {
  public async createProduct(createProductDto: CreateProductDto) {
    const productExist = await ProductModel.findOne({
      name: createProductDto.name,
    });

    if (productExist) throw CustomErrors.badRequest("Product already exists");

    try {
      const product = new ProductModel(createProductDto);
      await product.save();

      return product;
    } catch (error) {
      console.error(String(error));
      throw CustomErrors.internalServerErrorRequest("Error creating products");
    }
  }

  public async getAllProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, productsFound] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      const next: string = `/api/categories?page=${page + 1}&limit=${limit}`;
      const prev: string | null =
        page - 1 > 0 ? `/api/categories?page=${page - 1}&limit=${limit}` : null;

      return {
        page,
        limit,
        total,
        next,
        prev,
        products: productsFound,
      };
    } catch (error) {
      console.error(String(error));
      throw CustomErrors.internalServerErrorRequest("Error getting categories");
    }
  }
}
