import product from "../models/products.js";

export const createProduct = async (req, res) => {
  const { name, price, category, description, image } = req.body;

  const newProduct = new product({
    name,
    price,
    category,
    description,
    image,
  });

  const productSaved = await newProduct.save();
  res.status(201).json(productSaved);
};

export const getProducts = async (req, res) => {
  const products = await product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const productId = await product.findById(req.params.id);
  res.status(200).json(productId);
};

export const updateProduct = async (req, res) => {
  const updatedProduct = await product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
   await product.findByIdAndDelete(req.params.id);
  res.status(204).json();
};
