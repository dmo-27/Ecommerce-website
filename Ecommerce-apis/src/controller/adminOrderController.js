const orderServices = require("../services/order_sevice")

const getAllOrders = async(req,res)=>{
    try {
        const orders = await orderServices.findAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
       return res.status(500).send({error:error.message}); 
    }
}

const confirmationOrders = async (req, res) => {
    const orderId = req.params.orderId;  
    try {
    const orders = await orderServices.confirmedOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const shippOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderServices.shipOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deliverOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderServices.deliverOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cancellOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderServices.cancelOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderServices.deleteOrder(orderId);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports={
    getAllOrders,
    confirmationOrders,
    shippOrders,
    deliverOrders,
    cancellOrders,
    deleteOrders
}