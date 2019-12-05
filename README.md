# Todo Application - Backend

This is the back end API of a Todo Application, built throughout the [Tech Returners](https://techreturners.com) Your Journey Into Tech course. It is consumed by a front end React application, available [here](https://github.com/caiofp27/webtodo_application_backend) and connects to an RDS Database.

The hosted version of the application is available here: [https://caiofp27.github.io/react_webtodo_application](https://caiofp27.github.io/react_webtodo_application).

### Technology Used

This project uses the following technology:

- Serverless Framework
- JavaScript (ES2015+)
- Express
- SQL
- Mysql library
- AWS Lambda and API Gateway
- AWS RDS
- ESLint

### Endpoints

The API exposes the following endpoints:

---

##### GET /tasks

[https://7il2iqr3w7.execute-api.eu-west-2.amazonaws.com/dev/tasks](https://7il2iqr3w7.execute-api.eu-west-2.amazonaws.com/dev/tasks)

Responds with JSON containing all tasks in the Database.

---

##### POST /tasks

[https://7il2iqr3w7.execute-api.eu-west-2.amazonaws.com/dev/tasks](https://7il2iqr3w7.execute-api.eu-west-2.amazonaws.com/dev/tasks)

Will create a new task when sent a JSON payload in the format:

```json
{
  "text": "walk dog",
  "completed": false
}
```

---

##### DELETE /tasks/:taskId

[https://7il2iqr3w7.execute-api.eu-west-2.amazonaws.com/dev/tasks](https://7il2iqr3w7.execute-api.eu-west-2.amazonaws.com/dev/tasks)
Deletes the task of the given ID.

---

##### PUT /tasks/:taskId

[https://7il2iqr3w7.execute-api.eu-west-2.amazonaws.com/dev/tasks](https://7il2iqr3w7.execute-api.eu-west-2.amazonaws.com/dev/tasks)

Will update a task when sent a JSON payload in the format:

```json
{
  "text": "walk dog",
  "completed": true,
}
```
