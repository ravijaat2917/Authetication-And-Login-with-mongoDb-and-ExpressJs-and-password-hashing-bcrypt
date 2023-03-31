import {mongoose} from '../app.js';

const connectDB = async(DATABASE_URL) => {
    try {
        const options = {
            dbName : 'AutheticationProject'
        }
         await mongoose.connect(DATABASE_URL , options).then(console.log(`DataBase Connect Successfully...`));
    } catch (error) {
        console.log(error);
    }
}

export default connectDB ;