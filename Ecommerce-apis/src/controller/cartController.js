const cartServices = require("../services/cart_services")

const findUserCart = async(req,res)=>{
    const user = req.user;
    console.log("Here is user"+user);
    try {
       const cart = await cartServices.findUserCart(user._id);
       return res.send(cart); 
    } catch (error) {
       return res.status(500).send({error:error.message});
    }
}

const addItemToCart = async (req, res) => {
  const user = req.user;
  console.log("Here is user" + user);
  const id = user._id;
  console.log(id);
  try {
    const cart = await cartServices.addCartItems(id,req);
    return res.send(cart);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports={
    findUserCart, 
    addItemToCart
}