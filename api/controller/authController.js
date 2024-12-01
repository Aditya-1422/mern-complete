import User from "../model/User.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    const hashedPassword = bcrypt.hashSync(password,10);
    const user = new User({username, email, password : hashedPassword});
    
    try {
        await user.save();
        res.status(201).json({success:true, message : "User registered successfully!!!"});
    } catch (error) {
        return res.status(500).json(error);
    }
}