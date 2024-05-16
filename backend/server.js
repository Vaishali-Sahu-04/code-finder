import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import exploreRoutes from './routes/explore.route.js'
import cors from 'cors'


dotenv.config();
const app = express()
app.use(cors({origin: "http://localhost:3000",
                methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                credentials: true, // if you need to handle cookies
                optionsSuccessStatus: 204}));

app.use("/api/users",userRoutes);
app.use('/api/explore',exploreRoutes);

app.listen(5000,()=>{
    console.log("Server started on port 5000")
})