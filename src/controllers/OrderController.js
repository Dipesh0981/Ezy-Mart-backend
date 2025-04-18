const OrderModel = require("../models/OrderModel")
const ProductModel = require("../models/ProductModel") // Needed for populating

// Place a new order
const checkout = async (req, res) => {
  try {
    const { userId, items } = req.body;

    console.log("Received order:", req.body); 

    const newOrder = new OrderModel({ userId, items });
    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id
    });
  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get invoice for a given order ID
const getInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await OrderModel.findById(orderId).populate("items.productId");

    if (!order) return res.status(404).json({ message: "Order not found" });

    const invoice = {
      orderId: order._id,
      userId: order.userId,
      orderDate: order.createdAt,
      items: order.items.map(item => ({
        product: {
          name: item.productId.name,
          price: item.productId.price,
          image: item.productId.image
        },
        quantity: item.quantity
      }))
    };

    res.status(200).json(invoice);
  } catch (err) {
    console.error("Invoice Error:", err);
    res.status(500).json({ message: "Failed to get invoice" });
  }
};

module.exports={
    checkout,
    getInvoice

}