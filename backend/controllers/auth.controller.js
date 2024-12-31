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
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
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

export const google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashpassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('')+ Math.random().toString(9).slice(-4),
                email,
                password: hashpassword,
                profilePicture: googlePhotoUrl
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id , isAdmin: newUser.isAdmin}, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        }

    } catch (error) {
        next(error);
    }
}