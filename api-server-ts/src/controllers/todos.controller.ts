import { Request, Response, NextFunction, RequestHandler } from "express";

import { Todo } from "../models/todos.model";

const todosElements: Array<Todo> = [];

export const createTodo = (req: Request, res: Response, next: NextFunction) => {
  const text: string = (req.body as { text: string })?.text;
  const id: string = Math.floor(Math.random() * text.length).toString();
  const newTodo = new Todo(id, text);
  todosElements.push(newTodo);
  res.status(201).json({
    message: "Created the Todo",
    createdTodo: newTodo,
  });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(201).json({
    todos: todosElements,
  });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId: string = req.params?.id;
  const todoIndex = todosElements.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) throw new Error("Could not find todo");
  todosElements.splice(todoIndex, 1);
  res.status(201).json({
    messaje: "delete success",
    updateTodo: todosElements,
  });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId: string = req.params?.id;
  const updateText: string = (req.body as { text: string })?.text;
  const todoIndex = todosElements.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) throw new Error("Could not find todo");
  todosElements[todoIndex] = new Todo(todosElements[todoIndex].id, updateText);
  res.status(201).json({
    messaje: "update success",
    updateTodo: todosElements[todoIndex],
  });
};
