import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username is already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully!!!",
    });
  } catch (error) {
    next(errorHandler(error));
  }
};


export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User does not exist"));
    }

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(403, "Wrong credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('access_token', token, {httpOnly: true})
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: validUser._id,
          username: validUser.username,
          email: validUser.email,
        },
      });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token',
      {httpOnly : true}
    ).status(200)
    .json({
      success : true,
      message : "Signout successfully!!!"
    })
  } catch (error) {
    next(error);
  }
}