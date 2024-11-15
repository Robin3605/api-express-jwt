import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    image: String
}, {
    timestamps: true,
    versionKey: false
});

export default model("Product", productSchema);
