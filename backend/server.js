import app from "./app.js";
import connectdb from "./config/database.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('shutting down server due to uncaught Exception');
    process.exit(1);
})
// settent confing and connect database
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({path: 'backend/config/config.env'})
}
connectdb()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
    console.log(`server started at host: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})
// handle unhandled promis error
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('shutting down server due to unhandled rejection');
    server.close(() => {
        process.exit(1);
    });
})