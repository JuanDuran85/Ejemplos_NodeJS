import { Validator } from "../../../utilities";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}

  public static createProduct(object: {
    [key: string]: any;
  }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } =
      object || {};

    console.debug({
      name,
      available,
      price,
      description,
      user,
      category,
    });

    if (!name) return ["Missing name"];
    if (!user) return ["Missing user"];
    if (!Validator.isMongoId(user)) return ["Invalid user ID"];
    if (!category) return ["Missing category"];
    if (!Validator.isMongoId(category)) return ["Invalid category ID"];

    return [
      undefined,
      new CreateProductDto(
        name,
        !!available,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
