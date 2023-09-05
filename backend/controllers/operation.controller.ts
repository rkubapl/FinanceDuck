// const { AuthService } = require( './../services/AuthService' );
// const { Auth } = require( './../models/Auth' );
// const { User } = require( './../models/User' );
// const autoBind = require( 'auto-bind' );

import Operation, {IOperation, Type} from "../models/Operation";
import {getEnumKeyByEnumValue} from "../utils";
import mongoose, {Error} from "mongoose";

export default class OperationController {
    public async create(req, res, next) {
        try {
            const operation = new Operation({
                user: new mongoose.Types.ObjectId(req.user.id),
                date: new Date(req.body.date),
                name: req.body.name,
                category: new mongoose.Types.ObjectId(req.body.categoryId),
                type: getEnumKeyByEnumValue(Type, req.body.type),
                sum: req.body.sum
            })

            await operation.save();

            await res.status( 200 ).json({success: true} );
        } catch (e) {
            next( e );
        }
    }

    public async get(req, res, next) {
        try {
            const page : number = Number(req.query.page)-1;
            const perPage : number = Number(req.query.perPage);

            const operations = await Operation.find({user: req.user.id}).sort({ date : 1}).skip(page*perPage).limit(perPage).exec();
            const count = await Operation.count({ user: req.user.id});


            await res.status( 200 ).json({success: true, operations, pageLimit: Math.ceil(count/req.query.perPage)});
        } catch (e) {
            next( e );
        }
    }
}