import expressAsyncHandler from "express-async-handler";
import OrderModel from "../models/orderModel.js";

export const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.lenth === 0) {
    res.status(400);
    throw new Error("no items found");
    return;
  } else {
    const order = new OrderModel({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export const getOrderbyIdcontroller = expressAsyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );
  // popuylate returns only the selected iterms
  if (order) {
    res.json(order);
  } else {
    res.status(400);
    throw new Error("order not found");
  }
});

export const updateOrderAsPaidController = expressAsyncHandler(
  async (req, res) => {
    const order = await OrderModel.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("order not found");
    }
  }
);
export const updateOrderAsPaidbyAdminController = expressAsyncHandler(
  async (req, res) => {
    const order = await OrderModel.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("order not found");
    }
  }
);
export const updateOrderAsDeliveredController = expressAsyncHandler(
  async (req, res) => {
    const order = await OrderModel.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("order not found");
    }
  }
);

export const getMyOrdersController = expressAsyncHandler(async (req, res) => {
  const orders = await OrderModel.find({ user: req.user._id });
  res.json(orders);
});

export const getOrdersController = expressAsyncHandler(async (req, res) => {
  const orders = await OrderModel.find({}).populate("user", "id name");
  // populate uses the params as the ref
  res.json(orders);
});
