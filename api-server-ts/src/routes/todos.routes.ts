import { Router } from "express";
import { createTodo } from "../controllers/todos.controller";

const router = Router();

router.post("/", createTodo);
router.get("/");
router.patch("/");
router.delete("/");

export default router;
