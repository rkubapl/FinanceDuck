import operationRoute from "./routes/operation.route";

require('dotenv').config();

import Database from "./database";
import operationController from "./controllers/operation.controller";
import categoryRoute from "./routes/category.route";
import userRoute from "./routes/user.route";

// console.log(process.env.MONGODB)
new Database(process.env.MONGODB);

// const jwt = require("jsonwebtoken");


const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/operation', operationRoute);
app.use('/api/category', categoryRoute);
app.use('/api/user', userRoute);


app.listen(port);

console.log('✔ FinanceDuck backend started on port ' + port);