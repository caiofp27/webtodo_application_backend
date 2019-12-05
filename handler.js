const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'todo_app'
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/tasks", function(request, response){
  connection.query("SELECT * FROM tasks", function(err, data){
    if(err){
      response.status(500).json({error: err});
    }else{
      response.status(200).json(data);
    }
  })
});
app.delete("/tasks/:taskId", function(request, response){
  //Delete the task
  const taskId = request.params.taskId;
  connection.query("DELETE from tasks WHERE taskId = ?", [taskId], function(err){
  if(err){
    response.status(500).json({error: err});
  }else{
    response.sendStatus(200);
  }
  });
});
app.post("/tasks", function(request, response){
  //Create a new task
  const task = request.body;
  const q = "INSERT tasks SET taskText = ?, completed = ?";
  connection.query(q, [task.taskText, task.completed], function(err, data){
    if(err){
      response.status(500).json({error: err});
    }else{
      response.status(201).json(data);
    }
  })
});
app.put("/tasks/:taskId",function (request, response){
  // Update task
  const taskId = request.params.taskId;
  const task = request.body;
  //expected {status completed}
  const q = "UPDATE tasks SET completed = ? WHERE taskId = ?";
  connection.query(q, [task.completed, taskId], function (err, data){
    if(err){
      response.status(500).json({error: err});
    }else{
      response.sendStatus(205);
    }
  })
});

module.exports.tasks = serverless(app);