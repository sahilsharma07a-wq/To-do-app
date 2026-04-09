
import jwt from "jsonwebtoken";
import { Apierror } from "../utils/Apierror.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
     if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Apierror(401, "No token provided");
    }
    
    const token = authHeader.split(" ")[1];
    if(!token){
        throw new Apierror(401,"No token found");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        throw new Apierror(401, "Token is not valid");
    }
};

export default authMiddleware;
