import { Schema, model, models } from "mongoose";
import bcrypt from 'bcrypt';
import { type } from "os";

const UserSchema = new Schema({
    name: {
        type: String
    },

    email: {
        type: String, 
        required: true, 
        unique: true 
    },

    password: {
        type: String, 
        required: true, 
        validate: pass=> {
            if(!pass?.length || pass.length < 5 ){
                new Error('Password must be at lest 5 characters');
            }
        }
    },
    
    image: {
        type: String
    },
    phone:{
        type: String
    },
    streetAddress: {
        type: String
    },
    city: {
        type: String
    },
    postalCode: {
        type: String
    },
    country: {
        type: String
    },

}, {timestamps: true});

UserSchema.post('validate', (user) => {
    const pass = user.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(pass, salt);
    user.password = hashedPassword;
})

export const User = models?.User  || model("User", UserSchema);