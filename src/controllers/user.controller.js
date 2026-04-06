import { user } from "../models/user.model.js";
import { Apierror } from "../utils/Apierror.js";


const registeruser = async (req, res) => {
    // get details from the user
    // validate the fields
    // check if user exists or not
    // create the database. 
    const { name, username, email, password } = req.body;


//    for validation
    if ([name, username, email, password].some((field) => {
        field?.trim() === ""
    })) {
        throw new Apierror(400, "All fields are requied");
    }
    const existeduser = await user.findOne({
        $or: [{ username }, { email }]
    })

    if (existeduser) {
        throw new Apierror(100, "user already exists");
    }

    const createdUser = await user.create({
        name: name,
        username: username.toLowerCase(),
        email: email,
        password: password
    })
    if (!createdUser) {
        throw new Apierror(400, "user not created");
    }
    else {
        console.log("User created successfully");
    }
}

const loginuser = async (req, res) => {
    // user details 
    // match the details
    const { username, password } = req.body;

    const User = await user.findOne({ username,password });
    if (!User) {
        throw new Apierror(400, "Username is not valid");
    }
    // console.log(User.password);
    if (password === User.password) {
        res.status(200).json({
            "message": "login successful"
        })
    }

}
export {
    registeruser,
    loginuser
};