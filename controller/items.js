const mongoose = require('mongoose');
const Item = require('../models/items');
const Category = require('../models/category');
const helper = require('../utils/helper');
const fs = require('fs');

const validateCategoryId = async (categoryId) => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return 'invalid_category_id';
  }
  return null;
};

const verifyCategoryExists = async (categoryId) => {
  const categoryExists = await Category.exists({ _id: categoryId });
  if (!categoryExists) {
    return 'category_not_found';
  }
  return null;
};

const addItem = async (req, res, next) => {
  try {
    const existingItem = await Item.findOne({ title: req.body.title, userId: req.session.user.id });
    if (existingItem) {
      throw new Error('item_already_exist');
    }

    const itemImages = req.files.map((file) => file.path);

    const categoryTitle = req.body.category;

    let categoryId;

    const category = await Category.findOne({ title: categoryTitle });
    if (category) {
      categoryId = category._id;
    } else {
      const newCategory = new Category({ title: categoryTitle });
      await newCategory.save();
      categoryId = newCategory._id;
    }
    
    const newItem = new Item({
      title: req.body.title,
      categoryId: categoryId,
      images: itemImages,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      userId: req.session.user.id,
    });

    await newItem.save();

    res.status(201).json({ code: 'item_added', message: 'Item added successfully' });
  } catch (error) {
    next(error);
  }
};

const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req, res, next) => {
  try {
    const item = await Item.findOne({ _id: req.params.itemId });
    if (item) {
      res.status(200).json(item);
    } else {
      throw new Error('item_not_found');
    }
  } catch (error) {
    next(error);
  }
};

const getItemsByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    const validationError = await validateCategoryId(categoryId);
    if (validationError) {
      throw new Error(validationError);
    }

    const verificationError = await verifyCategoryExists(categoryId);
    if (verificationError) {
      throw new Error(verificationError);
    }
    
    let items = await Item.find({ categoryId: categoryId });
    
    items = helper.convert_IdToId(items);
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

const getUserItems = async (req, res, next) => {
  try {
    const items = await Item.find({ userId: req.session.user.id });
    if (items.length > 0) {
      res.status(200).json(items);
    } else {
      throw new Error('item_not_found');
    }
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { title, category, price, description, quantity } = req.body;
    const itemImages = req.files.map((file) => file.path);

    const item = await Item.findOne({ _id: itemId });

    if (!item) {
      throw new Error('item_not_found');
    }

    if (item.userId.toString() !== req.session.user.id.toString()) {
      throw new Error('item_not_authorized');
    }

    const updatedItem = await Item.findOneAndUpdate(
      { _id: itemId },
      {
        title,
        category,
        price,
        description,
        quantity,
        images: itemImages.length > 0 ? itemImages : item.images,
      },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findOne({ _id: itemId });

    if (!item) {
      throw new Error('item_not_found');
    }

    if (item.userId.toString() !== req.session.user.id.toString()) {
      throw new Error('item_not_authorized');
    }

    await Item.findOneAndDelete({ _id: itemId });

    item.images.forEach((imagePath) => {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log('Error deleting image:', err);
        }
      });
    });

    res.status(200).json({ code: 'item_deleted', message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const searchItem = async (req, res, next) => {
  try {
    const searchString = req.query.searchString;

    const items = await Item.find({ title: { $regex: searchString, $options: 'i' } });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

const applyFilters = async (req, res, next) => {
  try {
    let query = {};

    if (req.query.category) {
      const category = await Category.findOne({ title: req.query.category });
      query.categoryId = category._id;
    }

    if (req.query.minPrice && req.query.maxPrice) {
      query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
    } else if (req.query.minPrice) {
      query.price = { $gte: req.query.minPrice };
    } else if (req.query.maxPrice) {
      query.price = { $lte: req.query.maxPrice };
    }

    const items = await Item.find(query);
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addItem,
  getAllItems,
  getItemById,
  getItemsByCategory,
  getUserItems,
  updateItem,
  deleteItem,
  searchItem,
  applyFilters,
};
