const Cart = require('../models/cart');
const Item = require('../models/items');
const Order = require('../models/order');

const getCart = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.item');

    if (!cart) {
      throw new Error('cart_not_found');
    }

    const items = cart.items.map((cartItem) => ({
      itemId: cartItem.item._id,
      itemDescription: cartItem.item.description,
      itemName: cartItem.item.title,
      itemImages: cartItem.item.images,
      itemPrice: cartItem.item.price,
      quantity: cartItem.quantity,
    }));

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

const addItemToCart = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const { itemId, quantity } = req.body;

    const item = await Item.findById(itemId);

    if (!item) {
      throw new Error('item_not_found');
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      const newCart = new Cart({
        user: userId,
        items: [{ item: itemId, quantity }],
      });
      await newCart.save();
    } else {
      const existingCartItem = cart.items.find((cartItem) => cartItem.item.toString() === itemId);

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        cart.items.push({ item: itemId, quantity });
      }

      cart.updatedAt = new Date();

      await cart.save();
    }

    res.status(200).json({ code: 'item_added_to_cart_successfully', message: 'Item added to cart successfully' });
  } catch (error) {
    next(error);
  }
};

const increaseQuantity = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const itemId = req.params.itemId;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error('cart_not_found');
    }

    const existingCartItem = cart.items.find((cartItem) => cartItem.item.toString() === itemId);

    if (!existingCartItem) {
      throw new Error('item_not_found');
    }

    existingCartItem.quantity += 1;
    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({ code: 'quantity_increased_successfully', message: 'Quantity increased successfully' });
  } catch (error) {
    next(error);
  }
};

const decreaseQuantity = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const itemId = req.params.itemId;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error('cart_not_found');
    }

    const existingCartItem = cart.items.find((cartItem) => cartItem.item.toString() === itemId);

    if (!existingCartItem) {
      throw new Error('item_not_found');
    }

    if (existingCartItem.quantity === 1) {
      cart.items = cart.items.filter((item) => item.item.toString() !== itemId);
    } else {
      existingCartItem.quantity -= 1;
    }

    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({ code: 'quantity_decreased_successfully', message: 'Quantity decreased successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteItemFromCart = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const itemId = req.params.itemId;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error('cart_not_found');
    }

    const existingCartItem = cart.items.find((cartItem) => cartItem.item.toString() === itemId);

    if (!existingCartItem) {
      throw new Error('item_not_found');
    }

    cart.items = cart.items.filter((item) => item.item.toString() !== itemId);
    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({ code: 'item_deleted_from_cart_successfully', message: 'Item deleted from cart successfully' });
  } catch (error) {
    next(error);
  }
};

const emptyCart = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error('cart_not_found');
    }

    cart.items = [];
    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({ code: 'cart_emptied_successfully', message: 'Cart emptied successfully' });
  } catch (error) {
    next(error);
  }
};

const checkoutAllItems = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.item');

    if (!cart || cart.items.length === 0) {
      throw new Error('empty_cart');
    }

    const items = cart.items.map((cartItem) => ({
      itemId: cartItem.item._id,
      itemDescription: cartItem.item.description,
      itemName: cartItem.item.title,
      itemImages: cartItem.item.images,
      itemPrice: cartItem.item.price,
      quantity: cartItem.quantity,
    }));

    const order = new Order({
      user: userId,
      items,
    });

    await order.save();

    const populatedOrder = await Order.findById(order._id).populate('items.itemId');

    const totalAmount = populatedOrder.totalAmount;

    cart.items = [];
    cart.updatedAt = new Date();
    await cart.save();

    res.status(200).json({
      code: 'checkout_successful', message: 'Checkout successful', orderId: order._id, totalAmount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addItemToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItemFromCart,
  emptyCart,
  checkoutAllItems,
};
