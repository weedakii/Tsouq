import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import express from 'express'
import error from './middlewares/error.js';
import router from './routes/router.js';

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

app.use('/api/v1', router)
app.use(error)

export default app