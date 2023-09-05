// const { AuthService } = require( './../services/AuthService' );
// const { Auth } = require( './../models/Auth' );
// const { User } = require( './../models/User' );
// const autoBind = require( 'auto-bind' );

import Operation, {IOperation, Type} from "../models/Operation";
import {getEnumKeyByEnumValue} from "../utils";
import mongoose, {Error} from "mongoose";
import Category, {ICategory} from "../models/Category";
import CategoryService from "../services/category.service";
import UserService from "../services/user.service";
import User, {IUser} from "../models/User";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

function generateAccessToken(id) {
    return jwt.sign({id}, process.env.TOKEN_SECRET, { expiresIn: 60*60 });
}

function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }

    return false;
}

export default class UserController {
    public userService = new UserService();

    public async register(req, res, next) {
        try {
            if(!isEmail(req.body.email)) {
                return res.status(400).json({success: false, message: "Invalid email"});
            }

            const user : IUser = await User.findOne({
                email: req.body.email
            })

            if(user) {
                return res.status(400).json({success: false, message: "User with that email exists!"});
            }

            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            })


            await res.status(200).json({success: true, message: "Registered!"});
        } catch (e) {
            next( e );
        }
    }

    public async login(req, res, next) {
        try {
            const user : IUser = await User.findOne({
                email: req.body.email
            })

            if(!user) {
                return res.status(401).json({success: false, message: 'Wrong username or password!'});
            }

            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

            if(!isPasswordValid) {
                return res.status(401).json({success: false, message: 'Wrong username or password!'});
            }

            const token = generateAccessToken(user._id.toString())

            await res.status(200).json({ success: true, data: token });
        } catch (e) {
            next(e)
            // res.status(500).json({e});
        }
    }

    public async user(req, res, next) {
        try {
            const user : IUser = await User.findOne({
                _id: req.user.id
            })

            if(!user) {
                await res.status(401).json({success: false, message: "User doesn't exist"});
                return;
            }


            await res.status( 200 ).json({ success: true, data: user });
        } catch (e) {
            next( e );
        }
    }
}