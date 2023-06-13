import { todoList } from './methods';  // Uncomment this to import todoList

export async function updateTodoById(req, res) {
  const { id } = req.params;
  const TodoInfo = req.body;
  if (id in todoList){
    todoList[id] = {...todoList[id], ...TodoInfo}
    return res.status(200).send();
  } else {
    return res.status(400).json({ message: "UUID does not exist" });
  }
}