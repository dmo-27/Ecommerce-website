const Ratings = require("../models/ratings_model");
const productServices = require("./product_services");

async function createRatings(reqData, user) {
  const product = await productServices.findProductById(reqData.productId);
  const rating = new Review({
    user: user._id,
    product: product._id,
    rating: reqData.rating,
    createdAt: new Date(),
  });

  //   await product.save();
  await rating.save();
}

async function getProductRating(productId) {
  //   const product = await productServices.findProductById(productId);
  return await Ratings.find({ product: productId });
}

module.exports = {
  createRatings,
  getProductRating,
};
