import mongoose, { Schema, Document } from "mongoose";
import {ICategory} from "./Category";
import {IUser} from "./User";

export enum Type {
    income = 'income',
    expense = 'expense'
}
export interface IOperation extends Document {
    user: String | mongoose.Types.ObjectId | IUser,
    date: Date,
    name: String,
    category: String | mongoose.Types.ObjectId | ICategory,
    type: Type,
    sum: Number
}

const OperationSchema: Schema = new Schema( {
    'user': {
        'type': Schema.Types.ObjectId,
        'required': true,
        'ref': 'User'
    },
    'date': {
        'type': Date
    },
    'name': {
        'type': String,
        'required': true,
    },
    'category': {
        'type': Schema.Types.ObjectId,
        'required': true,
        'ref': 'Category'
    },
    'type': {
        'type': String,
        'enum': Object.values(Type)
    },
    'sum': {
        'type': Number,
        'required': true
    }
}, { 'timestamps': true } );

export default mongoose.model<IOperation>('Operation', OperationSchema)