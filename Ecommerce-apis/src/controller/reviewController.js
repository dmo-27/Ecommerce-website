const reviewServices = require("../services/review_services");

const createReview = async(req,res)=>{
    try {
        const review = await reviewServices.createReview(req.body,user);
        return res.status(200).send(review);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getAllReview = async (req, res) => {
  try {
    const review = await reviewServices.getAllReview(req.params.productId);
    return res.status(200).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports={
    createReview,
    getAllReview
}