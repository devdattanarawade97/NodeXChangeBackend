import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import processRoute from  './routes/processRoute.js';
import morgan from 'morgan';
import cors from 'cors';
dotenv.config();


// app intialization
const app = express();
app.use(express.json());


// Middleware
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173',], // Allow requests from these origins
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

//cors 
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use('/api/process', processRoute);

export default app;