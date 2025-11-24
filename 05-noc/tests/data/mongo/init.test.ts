import { afterAll, describe, expect, it } from "@jest/globals";
import { MongoDataBase } from "../../../src/data/mongo/init";
import mongoose from "mongoose";

describe("MONGO INIT TEST", () => {
  afterAll(() => {
    mongoose.connection.close();
  });
  it("Should connect to MongoDb", async () => {
    const connect: boolean = await MongoDataBase.connect({
      //@ts-ignore
      dbName: process.env.MONGO_DB_NAME,
      //@ts-ignore
      mongoUrl: process.env.MONGO_URL,
    });
    expect(connect).toBe(true);
  });

  it("should throw an error", async () => {
    try {
      await MongoDataBase.connect({
        //@ts-ignore
        dbName: process.env.MONGO_DB_NAME,
        mongoUrl: "mongodb://test_123_456:1590@localhost:27017/",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
