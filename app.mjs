import http from "http";
import { TodolistService } from "./todolist-service.mjs";

const service = new TodolistService();

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json");

  if (request.method === "GET") {
    // tadi kita buat ada 2 parameter
    //parameternya kita isi dengan request, response disini
    service.getTodolist(request, response);
  } else if (request.method === "POST") {
    service.createTodolist(request, response);
  } else if (request.method === "PUT") {
    service.updateTodolist(request, response);
  } else if (request.method === "DELETE") {
    service.deleteTodo(request, response);
  }
})

server.listen(3300);