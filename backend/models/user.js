import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

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
}, { collection: 'Utenti' });

UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

export const User = model('User', UserSchema);