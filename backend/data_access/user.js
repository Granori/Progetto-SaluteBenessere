import { User } from '../models/user.js';

export const getUserByEmail = async (email) => {
    return await User.findOne({ email: email }).select('+password');
}

export const getUserById = async (id) => {
    return await User.findById({ id: id });
}