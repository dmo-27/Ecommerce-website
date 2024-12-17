const productServices = require("../services/product_services.js");

const createProduct = async (req, res) => {
  try {
    const createdProduct = await productServices.createProduct(req.body);
    return res
      .status(200)
      .send({
        createdProduct,
        message: "Product created successfully",
      });
  } catch (error) {
    console.log("Error at controller")
    return res.status(500).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productServices.deleteProduct(req.params.id);
    return res
      .status(200)
      .send({ message: "Product deleted successfully", product });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productServices.updateProduct(
      req.params.id,
      req.body
    );
    return res
      .status(200)
      .send({ message: "Product updated successfully", product });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findProductById = async (req, res) => {
  try {
    const product = await productServices.findProductById(req.params.id);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productServices.getAllProducts(req.query);
    console.log(products);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createMultipleProduct = async (req, res) => {
  try {
    await productServices.createMultipleProduct(req.body);
    return res
      .status(200)
      .send({ message: "Products are created successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProduct,
};
