import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import path from 'path'

import "./passport/github.auth.js"

import userRoutes from './routes/user.route.js'
import exploreRoutes from './routes/explore.route.js'
import authRoutes from './routes/auth.route.js'
import connectMongoDb from './db/connectMongoDb.js'

dotenv.config();
const app = express()
const PORT=process.env.PORT || 5000;
const __dirname=path.resolve();

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // if you need to handle cookies
    optionsSuccessStatus: 204
}));

app.use("/api/users",userRoutes);
app.use('/api/explore',exploreRoutes);
app.use('/api/auth',authRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*",(req,res)=> {
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})

app.listen(PORT,()=>{
    console.log("Server started on port",PORT)
    connectMongoDb();
})