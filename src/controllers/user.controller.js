import { user } from "../models/user.model.js";
import { Apierror } from "../utils/Apierror.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";
const registeruser = async (req, res) => {
    /* get details from the user
       validate the fields
       check if user exists or not
       create the database.*/
    const { name, username, email, password } = req.body;


    //    for validation
    if ([name, username, email, password].some((field) => {
        field?.trim() === ""
    })) {
        throw new Apierror(400, "All fields are required");
    }
    const existeduser = await user.findOne({
        $or: [{ username }, { email }]
    })

    if (existeduser) {
        throw new Apierror(100, "user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await user.create({
        name: name,
        username: username.toLowerCase(),
        email: email,
        password: hashedPassword,
    })
    if (!createdUser) {
        throw new Apierror(400, "user not created");
    }
    else {
        res.status(200).json({ "message": "User created successfully" })
    }
}

const loginuser = async (req, res) => {
    // user details 
    // match the details
    const { username, password } = req.body;

    const User = await user.findOne({ username });
    if (!User) {
        throw new Apierror(400, "Username is not valid");
    }

    const decodedPassword = await bcrypt.compare(password, User.password);
    // return a boolean value 
    if (decodedPassword) {
        // Generate JWT token
        const token = jwt.sign(
            { id: User._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_SECRET_EXPIRY }
        );

        res.status(200).json({
            message: "login successful",
            token,
            user:{
                username:User.username,
                email:User.email,
                name:User.name,
            }
        });
    } else {
        throw new Apierror(400, "password is not matching");
    }
}
const logoutuser = async (req, res) => {
    const userid=req.user.id;
    const logout=await user.findOne({
        _id:userid,
    })
    if(!logout){
        throw new Apierror(400,"logout failed");
    }
    else{
        res.status(200).json({"msg":"User loggedout successfully"});
    }
}
export {
    registeruser,
    loginuser,
    logoutuser
};