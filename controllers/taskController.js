var taskModel = require('../models/tasksModel')

var task = {
    createTask: function (req, res) {
        console.log("*****************json after parsing****", JSON.parse(req.body.authorities));
        console.log("***************", req.files)
        var newTaskData = new taskModel();
        newTaskData.userId=req.param.userId,
        newTaskData.taskName= req.body.taskName,
        newTaskData.taskDesciption= req.body.taskDescription,
        newTaskData.approvalNeeded= req.body.approvalNeeded,
        newTaskData.authorities= JSON.parse(req.body.authorities),
        newTaskData.helperDocs= req.files,
        newTaskData.userInput= JSON.parse(req.body.userInput),
        newTaskData.status= req.body.status
        taskModel.create(newTaskData, function(error, taskData){
            console.log("in modelllll")
            if(error){
                res.status(500).json({
                     status: 'error', 
                     message: 'Something went wrong' + error, 
                     docs: ' ' 
                    });
            }else if(taskData){
                res.status(200).json({
                    status: 'success',
                    message: 'task is created successfully',
                    docs: newTaskData
                });
            }
        })
 

//**************end of API*******    
    },
//**************end of API*******     
}

module.exports = task;