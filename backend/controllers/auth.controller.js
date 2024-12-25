import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
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
        res.status(500).json({ error: "Server error" });
    }
    
};