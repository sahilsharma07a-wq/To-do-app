import { todo } from "../models/todo.model.js";
import { Apierror } from "../utils/Apierror.js";

const todoData = async (req, res) => {
    // get details from the user.
    // create the database.
    const { content, description } = req.body;

    const createdTodo = await todo.create({
        content: content,
        description: description,
        completed: false,
        createdBy: req.user.id,
    });

    if (!createdTodo) {
        throw new Apierror(400, "something went wrong with task");
    } else {
        res.status(200).json({
            message: "task is created"
        });
    }
};

const updateData = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userid = req.user.id;
        if (!req.body.content || !req.body.description) {
            throw new Apierror(400, "Nothing to update");
        }
        const updateTask = await todo.findOneAndUpdate(
            /* filter the data
               give the new data to update.
               (new) returns new document default old data.
               (runValidators) validates the schema condition after updation.*/
            {
                _id: taskId,
                createdBy: userid,
            },
            {
                content: req.body.content,
                description: req.body.description
            },
            { new: true, runValidators: true }
        )
        if (!updateTask) {
            throw new Apierror(400, "Task is not updated");
        }
        else {
            res.status(200).json({ "msg": "Task Updated" });
        }
    } catch (error) {
        res.status(500).json({ "msg": error.message });
    }
}

const deleteData = async (req, res) => {
    try {
        const taskId = req.params.id;  //id of the tasks from the database
        const userid = req.user.id;   //id of the user from the database
        const deleteTask = await todo.findOneAndDelete({
            _id: taskId,
            createdBy: userid,
        })
        if (!deleteTask) {
            throw new Apierror("400", "Task not deleted");
        }
        else {
            res.status(200).json({ "msg": "Task deleted" });
        }
    } catch (error) {
        res.status(400).json({ "msg": error.message });
    }
}

const completionTask = async (req, res) => {
    const taskId=req.params.id;
    const userid=req.user.id;
    const completedTask=await todo.findOneAndUpdate(
        {
            _id:taskId,
            createdBy:userid,
        },
        {
            completed:true,
        },
        {new:true,runvalidators:true}
    )
    if(!completedTask){
        throw new Apierror(400,"Task not completed");
    }
    else{
        res.status(200).json({"msg":"Task completed"});
    }
}
export {
    todoData,
    updateData,
    deleteData,
    completionTask
};