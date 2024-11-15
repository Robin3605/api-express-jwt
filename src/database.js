import mongoose from "mongoose";


mongoose.connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error))