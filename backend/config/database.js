import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: 'backend/config/config.env'})
const connectDB = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(e => {
        console.log(`mongoodb starded at port: ${e.connection.host}`);
    })
}
export default connectDB