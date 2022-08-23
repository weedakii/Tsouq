import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import express from 'express'
import cors from 'cors'
import error from './middlewares/error.js';
import router from './routes/router.js';
import path from 'path'
const app = express();
app.use(express.json());
app.use('/uploads',express.static('backend/uploads'))
app.use('/uploads/products',express.static('backend/uploads/products'))
app.use('/uploads/avatar',express.static('backend/uploads/avatar'))
app.use('/uploads/category',express.static('backend/uploads/category'))
app.use('/uploads/carusel',express.static('backend/uploads/carusel'))
app.set('trust proxy', 1)
app.use(cors({
    origin: true,
    credentials: true
}))

if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({path: 'backend/config/config.env'})
}

app.use(cookieParser())
app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
// app.use(fileUpload())

app.use('/api/v1', router)

app.use(express.static(path.join('__dirname', '../frontend/build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve('__dirname', '../frontend/build/index.html'))
})

app.use(error)

export default app