import { CategoryModel } from "../../../data";
import { CreateCategoryDto, CustomErrors, UserEntity } from "../../../domain";

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

  public async getAllCategories(): Promise<
    {
      id: string;
      name: string;
      available: boolean;
    }[]
  > {
    try {
      const categoriesFound = await CategoryModel.find();

      return categoriesFound.map((category) => {
        return {
          id: category.id,
          name: category.name,
          available: category.available,
        };
      });
    } catch (error) {
      console.error(String(error));
      throw CustomErrors.internalServerErrorRequest("Error getting categories");
    }
  }
}
