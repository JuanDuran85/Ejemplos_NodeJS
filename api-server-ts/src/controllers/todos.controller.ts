import { Request, Response, NextFunction } from "express";

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
