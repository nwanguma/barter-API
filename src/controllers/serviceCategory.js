const ServiceCategory = require("../models/serviceCategory");

const getCategories = async (req, res, next) => {
  const categories = await ServiceCategory.find({});

  res.json({
    success: true,
    data: categories,
  });
};

const createCategory = async (req, res, next) => {
  const { name } = req.body;

  const formattedName = name.toLowerCase();

  const takenCategory = await ServiceCategory.findOne({
    name: formattedName,
  });

  if (takenCategory) throw new AppError("category already exists", 409);

  const newCategory = new ServiceCategory({ name: formattedName });

  const category = await newCategory.save();

  res.status(201).json({
    success: true,
    data: category,
  });
};

module.exports = {
  getCategories,
  createCategory,
};
