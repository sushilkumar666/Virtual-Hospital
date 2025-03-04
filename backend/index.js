import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import patientRouter from './src/routes/patient.routes.js';
import doctorRouter from './src/routes/doctor.routes.js';
import recordRouter from './src/routes/record.routes.js';
import pdfRouter from './src/routes/pdf.routes.js';
import connectDB from './src/db/index.js';

dotenv.config({ path: './.env' });

const app = express();



// CORS Configuration

const corsOptions = {
    origin: ['https://virtual-hospital-frontend.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Access-Control-Allow-Origin'],
    credentials: true,
    optionsSuccessStatus: 204,
    maxAge: 86400 // 24 hours
};

// ✅ Place this **BEFORE all routes/middleware**
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

app.use((req, res, next) => {
    const allowedOrigins = ['https://virtual-hospital-frontend.vercel.app', 'http://localhost:5173'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin); // Set the origin dynamically
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // Send 204 for preflight OPTIONS request
    }
    next();
});



// Additional CORS headers for all routes

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.get('/test-cors', (req, res) => {
    res.json({ message: 'CORS test successful' });
});

// Routes
app.use('/api/v1/patient', patientRouter);
app.use('/api/v1/doctor', doctorRouter);
app.use('/api/v1/record', recordRouter);
app.use('/api/v1/pdf', pdfRouter);

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
