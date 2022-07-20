import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import express from 'express'
import error from './middlewares/error.js';
import router from './routes/router.js';
import path from 'path'
const app = express();

if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({path: 'backend/config/config.env'})
}

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

app.use('/api/v1', router)

app.use(express.static(path.join('__dirname', '../frontend/build')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve('__dirname', '../frontend/build/index.html'))
})

app.use(error)

export default app