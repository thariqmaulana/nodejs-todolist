import { todo } from "node:test";

export class TodolistService {

  //data todolist akan disimpan disini
  todolist = ["Java", "PHP", "NodeJS"];

  getJsonTodolist(){
    return JSON.stringify({
      code: 200,
      status: "OK",
      data: this.todolist.map((value, index) => {
        return {
          id: index,
          todo: value
        }
      })
    })
  }

  //membuat function di proto
  //akan dipanggil ketika apinya dipanggil
  getTodolist(request, response) {
    response.write(this.getJsonTodolist());
    response.end();
  }

  createTodolist(request, response){
    request.addListener("data", (data) => {
      // buffer data 
      const body = JSON.parse(data.toString());

      this.todolist.push(body.todo);

      //setiap ngepost, response nya seperti GET. melihat semua todo
      // console.info(data.toString());
      response.write(this.getJsonTodolist());
      response.end();
    })
  }

  updateTodolist(request, response){
    request.addListener("data", (data) => {
      // data berisi id dan todo value
      const body = JSON.parse(data.toString());
      // check dulu apakah datanya ada
      if (this.todolist[body.id]) {
        this.todolist[body.id] = body.todo;
      }
      response.write(this.getJsonTodolist());
      response.end();
  })
}

  deleteTodo(request, response) {
    request.addListener("data", (data) => {
      
      const body = JSON.parse(data.toString());
      // check dulu apakah datanya ada
      if (this.todolist[body.id]) {
        this.todolist.splice(body.id, 1);
      }
      response.write(this.getJsonTodolist());
      response.end();
  })
  }

  
}
