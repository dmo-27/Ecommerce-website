const userServices = require("../services/user_services");
const User = require("../models/user_model");
const CartItem = require("../models/cartitems_model");
const Product = require("../models/product_model");

async function updateCartItems(userId, cartItemId, cartItemData) {
  console.log("Function called with:", { userId, cartItemId, cartItemData });

  try {
    console.log("cart ItemID is", cartItemId);
  

    const item = await CartItem.findById(cartItemId).populate("product");
    console.log("Item found:", item);
    if (!item) {
      throw new Error(`Cart item not found with ID: ${cartItemId}`);
    }

    const user = await userServices.findUserById(item.userId);
    console.log("User found:", user);

    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountPrice = item.quantity * item.product.discountPrice;

      const updatedCartItem = await item.save();
      console.log("Updated cart item:", updatedCartItem);

      return updatedCartItem;
    } else {
      throw new Error("You can't update this cart item");
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    throw new Error(error.message);
  }
}


async function removeCartItem(userId, cartItemId) {
  console.log("The cart item ID is", cartItemId);
  const cartItem = await findCartItemById(cartItemId);
  console.log(cartItem);
  const user = await userServices.findUserById(userId);

  if (user._id.toString() === cartItem.userId.toString()) {
    await CartItem.findByIdAndDelete(cartItemId);
    return { message: "Cart item removed successfully" };
  }

  throw new Error("You can't remove another user's item");
}

async function findCartItemById(cartItemId) {
  const item = await CartItem.findById(cartItemId);
  if (!item) {
    throw new Error(`Cart item not found with ID: ${cartItemId}`);
  }
  return item;
}

module.exports = {
  updateCartItems,
  removeCartItem,
  findCartItemById,
};
