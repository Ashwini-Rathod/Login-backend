const fs = require("fs");
const path = require("path");
const taskFile = path.join(__dirname, "..", "data", "tasks.json");
const tasks = JSON.parse(fs.readFileSync(taskFile, "UTF-8"));

const getAllTasks = (req, res) =>{
    res.status(200).json({
        status: "Successful",
        data: tasks,
    })
}

const updateStatus = (req, res) => {
    let task = tasks.findIndex((singleTask) => {
      return singleTask.taskId == req.params.id;
    });
    if (task >= 0) {
      if(tasks[task].status === "Pending"){
        tasks[task].status = "Complete";
      }
      else{
        tasks[task].status = "Pending"
      }      
      fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2));
      res.status(200).json(
        {
          status: "Successful",
          data: tasks,
        }
      )
    } else {
      res.status(400).json(
        {
          status: "Unsuccessful",
          message: "Task not found",
        }
      )
    }
  };

module.exports.getAllTasks = getAllTasks;
module.exports.updateStatus = updateStatus;