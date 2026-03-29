const Order = require('../models/Order');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const createOrder = async (req, res) => {
  req.body.user = req.user.userId;

  const order = await Order.create(req.body);

  res.status(StatusCodes.CREATED).json({ order });
}

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});

  res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const getSingleOrder = async (req, res) => {
  const { id: orderId} = req.params;
  
  const order = await Order.findOne({_id: orderId });

  if (!order) {
    throw new CustomError.NotFoundError(`No orders with id: ${orderId}`)
  }

  res.status(StatusCodes.OK).json({ order })
}

const getCurrentUserOrders = async (req, res) => {
  res.send('show all my orders')
}

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params

  const order = await Order.findOneAndUpdate({ _id: orderId }, req.body, {
    new: true,
    runValidators: true
  })

  res.status(StatusCodes.OK).json({ order })
}


module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  getCurrentUserOrders
}