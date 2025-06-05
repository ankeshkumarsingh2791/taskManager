import express from "express";
import dotenv from "dotenv"
import connectDB from "./db/dbConnect"

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
app.use(express.json())

app.get("/", ()=> {
    "I am get"
})
