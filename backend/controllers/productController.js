const Product = require('../models/product');

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

// GET one product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found." });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product." });
  }
};

// POST new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const newProduct = await Product.create({ name, description, price, image });
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed to create product." });
  }
};
