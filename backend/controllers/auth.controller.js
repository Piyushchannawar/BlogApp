import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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


export const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
       next(errorHandler(400, 'All fields are required'));
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
          return next(errorHandler(404, 'User not found'));
        }

        const isMatch = bcryptjs.compareSync(password, user.password);

        if (!isMatch) {
            return next(errorHandler(400, 'Invalid credentials'));
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        const { password: pass, ...rest } = user._doc;
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);
        
    } catch (error) {
        next(error);
    }
};