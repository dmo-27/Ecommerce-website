const Cart = require("../models/cart_model");
const CartItem = require("../models/cartitems_model");
const Product = require("../models/product_model");

async function createCart(user) {
  try {
    const cart = new Cart({ user });
    const createCart = await cart.save();
    return createCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserCart(user) {
  try {
     
    let cart = await Cart.findOne({ user: user });


    if (!cart) {
      throw new Error("Cart not found for this user");
    }

    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
    cart.cartItems = cartItems;


    // if (!cartItems || cartItems.length === 0) {
    //   throw new Error("No items found in the cart");
    // }

    let totalPrice = 0;
    let totalDsicountedPrice = 0;
    let totalItem = 0;
    let totalDiscount = 0;

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDsicountedPrice += cartItem.discountPrice;
      totalItem += cartItem.quantity;
    
    }

    cart.totalItem=totalItem;
    cart.totalPrice=totalPrice;
    cart.discountedPrice=totalDsicountedPrice;
    


    return cart;

  } catch (error) {
    throw new Error(error.message);
  }
}


  async function addCartItems(userId, req) {
    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        console.log("No cart found for user:", userId);
        throw new Error("Cart not found for this user");
      }

      const { productId, size } = req.body;
      if (!productId || !size) {
        throw new Error("Product ID and size are required");
      }

      const product = await Product.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      console.log("Found product:", product);

      let cartItem = await CartItem.findOne({
        cart: cart._id,
        product: product._id,
        userId,
      });

      if (cartItem) {
        // If item is already present, update the quantity
        cartItem.quantity += 1; // Increment quantity (adjust as per your logic)
        cartItem = await cartItem.save();
        console.log("Updated cart item:", cartItem);
      } else {
        // If item is not present, create a new CartItem
        cartItem = new CartItem({
          product: product._id,
          cart: cart._id,
          quantity: 1, // You might want to adjust the quantity logic as per your application's requirements
          userId,
          price: product.price,
          size: size,
         
          discountPrice: product.discountPrice,
          
        });

        cartItem = await cartItem.save();
        console.log("Created cart item:", cartItem);

        // Update the cart with the newly created cartItem
        cart.cartItems.push(cartItem);
        await cart.save();
      }

      return "Item added to cart";
    } catch (error) {
      console.error("Error adding items to cart:", error);
      throw new Error(error.message);
    }
  }


  module.exports = { createCart ,addCartItems,findUserCart};
