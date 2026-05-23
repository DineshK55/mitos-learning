// Cart Model
const {
  addToCart,
  getUserCart,
  removeCartItem,
} = require("../models/cartModel");




// Add To Cart Controller
const addCartItem = async (req, res) => {

  try {

    const { product_id, quantity } = req.body;





    // Logged In User ID
    const user_id = req.user.id;





    // Validation
    if (!product_id) {

      return res.status(400).json({
        message: "Product ID Required",
      });
    }





    // Add To Cart
    await addToCart(
      user_id,
      product_id,
      quantity || 1
    );





    res.status(201).json({
      message: "Added To Cart Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};








// Get User Cart Controller
const fetchUserCart = async (req, res) => {

  try {

    // Logged In User
    const user_id = req.user.id;





    const finalCartItems =
      await getUserCart(user_id);





    res.status(200).json(finalCartItems);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};








// Remove Cart Item Controller
const deleteCartItem = async (req, res) => {

  try {

    await removeCartItem(req.params.id);





    res.status(200).json({
      message: "Cart Item Removed",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};








// Export Controllers
module.exports = {
  addCartItem,
  fetchUserCart,
  deleteCartItem,
};