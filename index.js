import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import session from "express-session";

import 'dotenv/config';
import {MongoStore} from "connect-mongo";
import configurePassport from "./config/passport.js";
import {connectDB, getDb} from "./config/db.js";

import {createServer} from "node:http"
import { initSocket } from "./socket.js";

const port = 3000;
const app = express();
const server = createServer(app)

initSocket(server)

import routes from "./routes/index.js";

const dbName = "socialmedia";
const db = await connectDB();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
    secret: process.env.secret_key,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: dbName,
        collectionName: 'session',
        ttl: 14 * 24 * 60 * 60
    }),
  
    name: "social-hub.io"
}));

configurePassport(passport,db);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use('', routes);
server.listen(port, ()=> console.log(`Server up and running on port ${port}`));
