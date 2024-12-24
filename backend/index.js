import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();




mongoose.connect(process.env.DB_URL).then(() => {   console.log('DB connected');   }).catch((err) => {   console.log(err);   });




const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }   
);