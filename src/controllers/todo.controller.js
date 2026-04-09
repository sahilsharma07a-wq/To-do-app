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

export {todoData};