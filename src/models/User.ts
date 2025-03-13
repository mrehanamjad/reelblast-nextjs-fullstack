import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface UserI {
    email: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<UserI>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function(next) {
    // we creating account/password first time then we have to hash the password
    // here this is  if we edit the password
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();
})



const User = models?.User || model<UserI>("User",UserSchema);
/*
  As nextJs works on edge so most of the time 
  it can't understand that
  is it connecting first time to mongodb or not
  so check if model already exists then give its reference 
  otherwise create model
*/
export default User;