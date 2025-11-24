import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { LogModel } from "../../../../src/data/mongo/models/log.model";
import { MongoDataBase } from "../../../../src/data/mongo/init";
import mongoose from "mongoose";

describe("Log Model Test", () => {
  beforeAll(async () => {
    await MongoDataBase.connect({
      //@ts-ignore
      dbName: process.env.MONGO_DB_NAME,
      //@ts-ignore
      mongoUrl: process.env.MONGO_URL,
    });
  });
  afterAll(() => {
    mongoose.connection.close();
  });
  it("Should be true", async () => {
    const logData = {
      level: "low",
      message: "test message",
      origin: "log.model.test.ts",
    };
    const log = await LogModel.create(logData);
    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String),
      })
    );
    expect(true).toBe(true);
  });

  it("should return the schema object", async () => {
    const schema = LogModel.schema.obj;
    expect(schema).toEqual(
      expect.objectContaining({
        level: {
          type: expect.any(Function),
          enum: ["low", "medium", "high", "error"],
          required: true,
          default: "LOW",
        },
        message: {
          type: expect.any(Function),
          required: true,
          default: "Unknown message",
        },
        origin: { type: expect.any(Function), default: "Unknown origin" },
        createdAt: expect.objectContaining({
          type: expect.any(Function),
          default: expect.any(Date),
        }),
      })
    );
  });
});
