import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import {userRouter} from './routes/user';
import {productRouter} from './routes/product';
mongoose.connect(process.env.database_URL);
const app = express ()



app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/product", productRouter);



app.listen(3001, () => console.log("SERVER STARTED"));