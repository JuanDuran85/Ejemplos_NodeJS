import mongoose from "mongoose";

export class Validator {
  public static isMongoId(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }
}
