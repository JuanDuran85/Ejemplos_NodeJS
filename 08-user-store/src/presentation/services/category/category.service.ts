import { CategoryModel } from "../../../data";
import {
  CreateCategoryDto,
  CustomErrors,
  PaginationDto,
  UserEntity,
} from "../../../domain";

export class CategoryService {
  public async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: UserEntity
  ): Promise<{
    id: string;
    name: string;
    available: boolean;
  }> {
    const { name, available } = createCategoryDto;

    const categoryExist = await CategoryModel.findOne({ name });
    if (categoryExist) throw CustomErrors.badRequest("Category already exist");

    try {
      const category = new CategoryModel({
        name,
        available,
        user: user.id,
      });
      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      console.error(String(error));
      throw CustomErrors.internalServerErrorRequest("Error creating category");
    }
  }

  public async getAllCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, categoriesFound] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
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
        categories: categoriesFound.map((category) => {
          return {
            id: category.id,
            name: category.name,
            available: category.available,
          };
        }),
      };
    } catch (error) {
      console.error(String(error));
      throw CustomErrors.internalServerErrorRequest("Error getting categories");
    }
  }
}
