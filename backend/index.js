import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();




mongoose.connect(process.env.DB_URL).then(() => {   console.log('DB connected');   }).catch((err) => {   console.log(err);   });

const app = express();

app.use(express.json());



app.use('/api/user',userRouter);
app.use('/api/auth',authRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }   
);