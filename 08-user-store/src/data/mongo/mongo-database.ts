import mongoose from "mongoose";

interface OptionsConnexion {
  mongoUrl: string;
  dbName: string;
}

export class MongoDataBase {
  public static async connect(options: OptionsConnexion) {
    const { dbName, mongoUrl } = options;
    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      return true;
    } catch (error) {
      console.debug("Mongo connection error");
      console.error(String(error));
      throw new Error("Mongo connection error");
    }
  }

  public static async disconnect() {
    await mongoose.disconnect();
  }
}
