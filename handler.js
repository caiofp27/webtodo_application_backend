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

//Allows Express to parse JSON data that is sent on the body of any request
app.use(bodyParser.json());

app.get("/tasks", function(request, response){
  connection.query("SELECT * FROM tasks", function (err, data){
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
  connection.query("DELETE from tasks WHERE taskId = ?", [taskId], function (err){
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
  const q = "INSERT tasks SET userId = ?, taskText = ?, completed = ?";
  connection.query(q, [task.userId, task.taskText, task.completed], function (err, data){
    if(err){
      response.status(500).json({error: err});
    }else{
      response.status(201).send("Created a new task with text: "+task.taskText);
    }
  })
});

app.put("/tasks/:taskId",function (request, response){
  // Update task
  const task = request.body;
  const taskId = request.params.taskId;
  //expected {text, completed}
  const q = "UPDATE tasks SET taskText = ?, completed = ? WHERE taskId = ?";
  connection.query(q, [task.taskText, task.completed, taskId], function (err, data){
    if(err){
      response.status(500).json({error: err});
    }else{
      response.sendStatus(205);
    }
  })
});

module.exports.tasks = serverless(app);