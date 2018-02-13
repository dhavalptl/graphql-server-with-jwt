require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import { schema } from './src/schema';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import mongoose from 'mongoose';

const SECRET = process.env.SECRET;

mongoose.connect("mongodb://localhost:27017/customerDB");
const User = mongoose.model('User', {
    username: String,
    password: String
});

// Middleware to verify token
const loginMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    try{
        const user = jwt.verify(token, SECRET);
        console.log("User ", user);
        req.user = user;
    }catch(e){
        console.error("No token found");
    }
    next();
};

const PORT = 4200;
const app = express();
// Protest against xss or other security issue
app.use(helmet());
app.use(cors());
app.use(loginMiddleware);

app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({schema: schema, context: {
    User, SECRET, reqUser: req.user
}})));
app.get('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.listen(PORT, () => {
    console.log("Graphql server is running on port " + PORT, "Server started at",new Date());
});