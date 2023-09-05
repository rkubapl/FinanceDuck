import Category, {ICategory} from "../models/Category";

const { OperationController: OperationService } = require( '../controllers/operation.controller' );
// const autoBind = require( 'auto-bind' );
// const { HttpResponse } = require( '../../system/helpers/HttpResponse' );
// const mongoose = require( 'mongoose' );

import Operation, {IOperation, Type} from "../models/Operation"
import mongoose, {Error, Types} from "mongoose";

export default class CategoryService {
    constructor() {
    }

    public async create(userId: string, name: String, color: String) {
        const createCategory: ICategory = await Category.create({
            user: new mongoose.Types.ObjectId(userId),
            name,
            color
        });

        return createCategory;
    }
}