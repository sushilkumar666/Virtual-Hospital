// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import patientRouter from "./src/routes/patient.routes.js";
// import doctorRouter from "./src/routes/doctor.routes.js";
// import connectDB from "./src/db/index.js";
// import { verifyJWT } from "./src/middlewares/patient.middleware.js";
// // import { ApiError } from "./utils/ApiError.js";

// dotenv.config({ path: './.env' });

// const app = express();

// app.use(cors({
//     origin: 'http://localhost:5173', // Update with your frontend URL
//     credentials: true,
// }));
// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());

// app.get("/test", (req, res) => {
//     res.cookie("name", "sushil", { httpOnly: true, secure: true}).json({ success: true, message: "Trial successful" });
// });

// app.get("/logout", (req, res) =>  {
//     res.clearCookie("accessToken", "", { httpOnly: true, secure: true}).json({ success: true, message: "user logout successfully" });
// } )



// app.use("/api/v1/patient", patientRouter);
// app.use("/api/v1/doctor", doctorRouter);

// connectDB()
//     .then(() => {
//         app.listen(process.env.PORT || 8000, () => {
//             console.log(`⚙️ Server is running at port: ${process.env.PORT || 8000}`);
//         });
//     })
//     .catch((error) => {
//         console.error("Error connecting to the database:", error);
//         process.exit(1); // Exit the process with an error code
//     });

// export { app };

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import patientRouter from "./src/routes/patient.routes.js";
import doctorRouter from "./src/routes/doctor.routes.js";
import connectDB from "./src/db/index.js";
import { verifyJWT } from "./src/middlewares/patient.middleware.js";

dotenv.config({ path: './.env' });

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend URL
    credentials: true,
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/test", (req, res) => {
    res.cookie("name", "sushil", { httpOnly: true, secure: true}).json({ success: true, message: "Trial successful" });
});

app.get("/logout", (req, res) =>  {
    res.clearCookie("accessToken", "", { httpOnly: true, secure: true}).json({ success: true, message: "user logout successfully" });
} )

app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/doctor", doctorRouter);

const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port: ${process.env.PORT || 8000}`);
});

connectDB()
    .then(() => {
        // Server is already running, no need to start it here
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
        server.close(); // Close the server if there's an error connecting to the database
        process.exit(1); // Exit the process with an error code
    });

export default server;

