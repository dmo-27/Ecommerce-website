const cartItemService = require("../services/cartitem_services");

const updateCartItem = async(req,res)=>{
    const user = req.user;
    try {
        const updateCartItem = await cartItemService.updateCartItems(user._id,req.params.id,req.body);
        return res.status(200).send(updateCartItem);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const removeCartItem = async (req, res) => {
  const user = req.user;
  console.log("The cart item id is ",req.params.id);
  try {
    const updateCartItem = await cartItemService.removeCartItem(
      user._id,
      req.params.id
    );
    return res.status(200).send({message:"Cart-item removed successfully"});
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {updateCartItem,removeCartItem};
