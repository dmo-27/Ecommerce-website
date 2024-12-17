const orderServices = require("../services/order_sevice");

const createOrder = async(req,res)=>{
    const user = await req.user;
    try {
        let createdOrder = await orderServices.createOrder(user,req.body);
        res.status(200).send(createdOrder);
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

const findOrderById = async (req, res) => {
  
  try {
    let createdOrder = await orderServices.findOrderById(req.params.id);
    res.status(200).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const orderHistory = async (req, res) => {
  const user =await  req.user;
  try {
    let createdOrder = await orderServices.userOrderHistory(user._id);
    res.status(200).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createOrder,
  findOrderById,
  orderHistory
}