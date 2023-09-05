import OperationController from "../controllers/operation.controller";
import {authenticateToken} from "../middleware/auth";

const express = require( 'express' ),
    router = express.Router();

const operationController = new OperationController();

router.post( '/create', authenticateToken, operationController.create );
router.get( '/get', authenticateToken, operationController.get );

export default router;