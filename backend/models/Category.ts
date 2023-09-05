import mongoose, {Document, Schema} from "mongoose";
import {IOperation, Type} from "./Operation";
import {IUser} from "./User";

export interface ICategory extends Document {
    user: String | mongoose.Types.ObjectId | IUser,
    name: String,
    // category: ICategory,
    color: String
}

const CategorySchema = new Schema( {
    'user': {
        'type': Schema.Types.ObjectId,
        'required': true,
        'ref': 'User'
    },
    'name': {
        'type': String,
        'required': true,
    },
    'color': {
        'type': String,
        'required': true,
    }
}, { 'timestamps': true } );

export default mongoose.model<ICategory>('Category', CategorySchema)