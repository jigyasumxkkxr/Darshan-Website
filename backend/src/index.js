import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
import destinationRoutes from './routes/destination.route.js';
import enquiryRoutes from './routes/enquiry.route.js';
import destinationTourPackageRoutes from './routes/destinationTourPackages.route.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

//Middlewares
app.use(cors({
    origin: 'https://darshan-website.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());


//routing
app.use('/api/user', userRoutes);
app.use('/api/destination', destinationRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/destination-tour-packages', destinationTourPackageRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});


