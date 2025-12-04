import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data";

const todo1 = { task: "Test Task 1", completedAt: null };
const todo2 = { task: "Test Task 2", completedAt: null };

jest.setTimeout(1_000_000);

describe("Router Test", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  afterAll(async () => {
    testServer.close();
    await prisma.$disconnect();
  });

  it("Should return TODOs api/todos", async () => {
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

  it("should return a TODO api/todos/:id", async () => {
    const { id, completedAt, task, completed } = await prisma.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .get(`/api/todos/${id}`)
      .set("Content-Type", "application/json")
      .expect(200);
    expect(body).toEqual({
      id,
      task,
      completedAt,
      completed,
    });
  });
});
