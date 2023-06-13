import { Router } from "express";
import {
    createTodo,
    getAllTodos,
    deleteTodoById,
    updateTodoById,
    getTodoById,
    getRandomTodo
} from "./methods.js";

const forwardRouter = Router();
forwardRouter.post("/todos", createTodo);
forwardRouter.get("/todos", getAllTodos);
forwardRouter.put("/todos/:id", updateTodoById);
forwardRouter.delete("/todos/:id", deleteTodoById);
forwardRouter.get("/todos/:id", getTodoById);
forwardRouter.post("/todos/random", getRandomTodo);

export default forwardRouter;
