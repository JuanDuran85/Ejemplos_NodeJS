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

  it("should return a TODO api/todos/:id", async () => {
    const id: number = 1;
    const { body } = await request(testServer.app)
      .get(`/api/todos/${id}`)
      .set("Content-Type", "application/json")
      .expect(400);

    expect(body).toEqual({ error: `Error: Todo with id ${id} not found` });
  });

  it("should return a New TODO api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      task: todo1.task,
      completedAt: null,
      completed: false,
    });
  });

  it("should return an Error if text is not valid api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({ task: "" })
      .expect(400);

    expect(body).toEqual({
      error: "Task is required and must be a non empty string",
    });
  });

  it("should return an Error if text is empty api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({})
      .expect(400);

    expect(body).toEqual({
      error: "Task is required and must be a non empty string",
    });
  });

  it("should return an updated TODO api/todos/:id", async () => {
    const { id } = await prisma.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${id}`)
      .send({ task: "New message from update", completedAt: "2025-05-22" })
      .set("Content-Type", "application/json")
      .expect(200);

    expect(body).toEqual({
      id,
      task: "New message from update",
      completedAt: "2025-05-22T00:00:00.000Z",
      completed: true,
    });
  });

  it("should return 404 if TODO id not found", async () => {
    const result = await request(testServer.app)
      .put(`/api/todos/1`)
      .send({ task: "New message from update", completedAt: "2025-05-22" })
      .set("Content-Type", "application/json")
      .expect(400);
    expect(result.body).toEqual({
      error: `Error: Todo with id 1 not found`,
    });
  });

  it("should return an updated TODO only the date api/todos/:id", async () => {
    const { id } = await prisma.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${id}`)
      .send({ completedAt: "2025-05-22" })
      .set("Content-Type", "application/json")
      .expect(200);

    expect(body).toEqual({
      id,
      task: todo1.task,
      completedAt: "2025-05-22T00:00:00.000Z",
      completed: true,
    });
  });
});
