const Cart = require('../models/AddToCartModel');

const addToCart = async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

 const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    res.json({ message: 'Item removed from cart', cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });
  
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
  
      res.status(200).json({ message: 'Quantity updated', cart });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  

module.exports={
    addToCart,
    getCart,
    removeFromCart,
    updateQuantity
}