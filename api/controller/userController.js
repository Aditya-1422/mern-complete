import bcrypt from 'bcryptjs';
import User from '../model/User.js';
import { errorHandler } from "../utils/error.js";

export const userUpdate = async (req, res, next) => {
    try {
        // Ensure the user is authorized to update their own data
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, "You can only update your own data!"));
        }

        // Prepare update data
        const updateData = { ...req.body };

        if (req.body.password) {
            updateData.password = bcrypt.hashSync(req.body.password, 10);
        }

        // Update user in database
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateData },
            { new: true, runValidators: true } // `runValidators` ensures validation rules are applied
        );

        //Checking user is available or not
        if (!updatedUser) {
            return next(errorHandler(404, "User not found"));
        }

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: rest
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, "You can only delete your own data!"));
        }
         await User.findByIdAndDelete(req.params.id)
         res.status(200).json("User has been successfully deleted!!!")
    } catch (error) {
        next(error)
    }
}