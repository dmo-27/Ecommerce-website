const ratingsServices = require("../services/rating_services");

const createRatings = async (req, res) => {
  try {
    const review = await ratingsServices.createRatings(req.body, user);
    return res.status(200).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllRatings = async (req, res) => {
  try {
    const review = await ratingsServices.getProductRating(req.params.productId);
    return res.status(200).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createRatings,
  getAllRatings
};
