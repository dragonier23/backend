import { v4 } from "uuid";
import fetch from "node-fetch";

// This is not exported, which means only methods exposed in this file will access it.
export const todoList = {};
const errorMessage = { message: "UUID does not exist" };

//alternative function to return eroror meesage
function badRequest(res, message) {
  return res.status(400).json({ message });
}

export async function createTodo(req, res) {
  const body = req.body;
  if (!("description" in body)) {
    return res.status(400).json({ message: "Input task required" });
  }
  const newTaskDescription = body.description;
  const newTodo = {
    id: v4(),
    description: newTaskDescription,
    done: false,
  };
  todoList[newTodo.id] = newTodo;
  return res.status(200).json(newTodo);
}

// Can mention unused request param
export async function getAllTodos(_req, res) {
  return res.status(200).json(todoList);
}

export async function deleteTodoById(req, res) {
  const { id } = req.params;
  const entryToDelete = todoList[id];
  const blocked = ["Improve backend"];
  if (id in todoList){
    for (id in blocked){
      if (blocked[id] === entryToDelete.description){
        return res.status(405).json({ message : "This todo cannot be deleted"});
      }
    }
    delete todoList[id];
    return res.status(200).json();
  }
  return res.status(400).json(errorMessage);
}

export async function updateTodoById(req, res) {
  const { id } = req.params;
  const TodoInfo = req.body;
  if (id !== TodoInfo.id){
    return res.status(409).json({message : "UUID in path and body do not match"});
  } else if (id in todoList){
    todoList[id] = {...todoList[id], ...TodoInfo}
    return res.status(200).send();
  } else {
    return res.status(400).json(errorMessage);
  }
}

export async function getTodoById(req, res) {
  const { id } = req.params;
  if (id in todoList){
    return res.status(200).json(todoList[id]);
  } else {
    return badRequest(res, "UUID does not exist");
  }
}

export async function getRandomTodo(_req, res){
  try { 
    const responseJson = await fetch("https://www.boredapi.com/api/activity").then(apiResponse => apiResponse.json());
    const randomActivity = responseJson.activity;
    const newTodo = {
      id: v4(),
      description: randomActivity,
      done: false,
    };
    todoList[newTodo.id] = newTodo;
    return res.status(200).json(newTodo); 
  } catch (e) {
    return badRequest(res, "Generator not replying");
  }
}    
