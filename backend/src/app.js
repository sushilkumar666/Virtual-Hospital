import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import patientRouter from "./routes/patient.routes.js"
import doctorRouter from "./routes/doctor.routes.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


//routes import


//routes declaration
app.get("/", (req, res) => {
    res.json({ success: true, message: "trial successfull" })
})

app.use("/api/v1/patient", patientRouter)
app.use("/api/v1/doctor", doctorRouter)

// http://localhost:8000/api/v1/users/register

export { app }