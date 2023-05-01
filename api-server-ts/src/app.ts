import express, { Request, Response, NextFunction } from "express";

import todoRouter from "./routes/todos.routes";

const app = express();
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  express.json({
    limit: "50mb",
  })
);

app.use("/todos", todoRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("working on 3000");
});
