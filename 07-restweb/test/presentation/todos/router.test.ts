import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data";

const todo1 = { task: "Test Task 1" };
const todo2 = { task: "Test Task 2" };

describe("Router Test", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(async () => {
    testServer.close();
    await prisma.$disconnect();
  });

  it("Should return TODOs api/todos", async () => {
    await prisma.todo.deleteMany();
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });

    const { body } = await request(testServer.app)
      .get("/api/todos")
      .set("Content-Type", "application/json")
      .expect(200);
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].task).toBe(todo1.task);
    expect(body[1].task).toBe(todo2.task);
  });
});
