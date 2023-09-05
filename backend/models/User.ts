import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string
}

const UserSchema: Schema = new Schema( {
    'name': {
        'type': String,
        'required': true,
    },
    'email': {
        'type': String,
        'required': true,
    },
    'password': {
        'type': String,
        'required': true,
    },
}, { 'timestamps': true } );

export default mongoose.model<IUser>('User', UserSchema)