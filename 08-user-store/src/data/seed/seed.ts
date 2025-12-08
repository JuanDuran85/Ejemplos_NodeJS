import { envs } from "../../config";
import {
  CategoryModel,
  MongoDataBase,
  ProductModel,
  UserModel,
} from "../mongo";
import { seedData } from "./data";

(async () => {
  await MongoDataBase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  await MongoDataBase.disconnect();
})();

const randomBetween0AndX: (x: number) => number = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {
  console.debug("Beginning  Main-Seed... \n\n");

  console.debug("--------------------------");
  console.debug("Init Delete all Data");
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);
  console.debug("All data deleted");
  console.debug("--------------------------\n");

  console.debug("--------------------------");
  console.debug("Init User Created");
  const users = await UserModel.insertMany(seedData.users);
  console.debug(users);
  console.debug("End User Created");
  console.debug("--------------------------\n");

  console.debug("--------------------------");
  console.debug("Init Category Created");
  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => {
      return {
        ...category,
        user: users[randomBetween0AndX(users.length - 1)]._id,
      };
    })
  );
  console.debug(categories);
  console.debug("End Category Created");
  console.debug("--------------------------\n");

  console.debug("--------------------------");
  console.debug("Init products Created");
  const products = await ProductModel.insertMany(
    seedData.products.map((product) => {
      return {
        ...product,
        user: users[randomBetween0AndX(users.length - 1)]._id,
        category: categories[randomBetween0AndX(categories.length - 1)]._id,
      };
    })
  );
  console.debug(products);
  console.debug("End Products Created");
  console.debug("--------------------------\n");

  console.debug("\n\n Ending Main - Seed");
}
