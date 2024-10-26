import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import patientRouter from './src/routes/patient.routes.js';
import doctorRouter from './src/routes/doctor.routes.js';
import connectDB from './src/db/index.js';

dotenv.config({ path: './.env' });

const app = express();



// CORS Configuration
const corsOptions = {
    origin: ['https://virtual-hospital-frontend.vercel.app', 'http://localhost:5173'], // Array of allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cookieParser());
// app.use(cors(corsOptions)); 
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

// Additional CORS headers for all routes
 

// Routes
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/doctor', doctorRouter);

// Test Route
app.get('/test', (req, res) => {
    res.cookie('name', 'sushi', { httpOnly: true, secure: true }).json({ success: true, message: 'Trial successful' });
    console.log(req.cookies.name + " this data got from cookie")
});

// Logout Route
app.get('/logout', (req, res) => {
    res.clearCookie('accessToken', { httpOnly: true, secure: true }).json({ success: true, message: 'User logout successfully' });
});

// Database Connection and Server Start
let server;

connectDB()
    .then(() => {
        server = app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port: ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        if (server) {
            server.close(); // Close the server if there's an error connecting to the database
        }
        process.exit(1); // Exit the process with an error code
    });



export default app;
