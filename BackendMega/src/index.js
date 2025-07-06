import express from "express";
import dotenv from "dotenv"
import connectDB from "../src/db/dbConnect.js"
import healthCheckerRouter from "../src/routes/healthcheck.route.js"
import userRoutes from "../src/routes/auth.route.js"
import projectRoutes from "../src/routes/project.route.js"
import cookieParser from "cookie-parser";
import cors from 'cors'

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 8080


connectDB()
.then(()=> {
    app.listen(PORT, () => {
    console.log(`App is running at port: ${PORT}`)

    })
})
.catch((error) => {
    console.log("mongoDB connection error", error)
    process.exit(1)
})


const app = express()
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get("/", ()=> {
    "I am get"
})

// router
app.use("/api/v1/healthCheck", healthCheckerRouter)
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/project",projectRoutes )
