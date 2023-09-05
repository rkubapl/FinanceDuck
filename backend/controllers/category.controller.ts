// const { AuthService } = require( './../services/AuthService' );
// const { Auth } = require( './../models/Auth' );
// const { User } = require( './../models/User' );
// const autoBind = require( 'auto-bind' );

import Operation, {IOperation, Type} from "../models/Operation";
import {getEnumKeyByEnumValue} from "../utils";
import mongoose, {Error} from "mongoose";
import Category, {ICategory} from "../models/Category";
import CategoryService from "../services/category.service";


export default class CategoryController {
    constructor() {
    }

    public categoryService = new CategoryService();
    public async create(req, res, next) {
        try {
            const createCategory: ICategory = await Category.create({
                user: new mongoose.Types.ObjectId(req.user.id),
                name: req.body.name,
                color: req.body.color
            });

            await res.status( 200 ).json({data: createCategory});
        } catch (e) {
            next( e );
        }
    }

    public async get(req, res, next) {
        try {
            const categories: Array<ICategory> = await Category.find({user: req.user.id});

            await res.status( 200 ).json({data: categories});
        } catch (e) {
            next( e );
        }
    }
}