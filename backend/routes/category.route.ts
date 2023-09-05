import CategoryController from "../controllers/category.controller";
import {authenticateToken} from "../middleware/auth";
import {body, validationResult} from "express-validator";

const express = require( 'express' ),
    router = express.Router();

const categoryController = new CategoryController();


router.post( '/add', authenticateToken, categoryController.create);
router.get( '/get', authenticateToken, categoryController.get);
export default router;