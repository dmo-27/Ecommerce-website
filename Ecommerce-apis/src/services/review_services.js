const Review = require("../models/reviews_model");
const productServices = require("./product_services");

async function createReview(reqData,user){
const product=await productServices.findProductById(reqData.productId);
const review = new Review({
    user:user._id,
    product:product._id,
    review:reqData.review,
    createdAt:new Date()
})

await product.save();
await review.save();
}

async function getAllReview(productId){
    const product = await productServices.findProductById(productId);
    return await Review.find({product:productId}).populate("user");
}

module.exports={
createReview,
getAllReview
}