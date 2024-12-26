import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
       next(errorHandler(400, 'All fields are required'));
    }

    const hashpassword = bcryptjs.hashSync(password, 10);

    try {
        const newuser = await User.create({
            username,
            email,
            password: hashpassword,
        });
        await newuser.save();
        res.status(201).json({ newuser });
    } catch (error) {
        next(error);
    }
    
};