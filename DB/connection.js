import mongoose from "mongoose";


const connection = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/Job-Search')
        .then(() => {
            {
                console.log('DB connection successfully')
            }
        }).catch((err) => {
            console.log("connection faild")
        })
}

export default connection