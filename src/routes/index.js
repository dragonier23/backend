import { Router } from "express";
import {
    createTodo,
    getAllTodos,
    deleteTodoById
} from "./methods.js";
import { updateTodoById, getTodoById } from "./newMethods";

const forwardRouter = Router();
forwardRouter.post("/todos", createTodo);
forwardRouter.get("/todos", getAllTodos);
forwardRouter.put("/todos/:id", updateTodoById);
forwardRouter.delete("/todos/:id", deleteTodoById);
forwardRouter.get("/todo/:id", getTodoById);

export default forwardRouter;
