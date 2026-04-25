import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^.+@[a-z]+\.((com|it)|[a-z]{2,})$/,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        match: /^(?=.*\d)(?=.*[\W_])(?=.*[A-Z])(?!.* ).{8,}$/,
        minlength: 8
    },
    ruolo: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

export const User = model('Utenti', UserSchema);