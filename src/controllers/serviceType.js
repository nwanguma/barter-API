const ServiceType = require("../models/serviceType");
const AppError = require("../utils/AppError");
const { isValidObjectId } = require("../utils/helper");

const createServiceType = async (req, res, next) => {
  const { name, category } = req.body;

  if (!isValidObjectId(category))
    throw new AppError("category is not valid", 400);

  const newServiceType = new ServiceType({ name, category });

  const serviceType = await newServiceType.save();

  res.status(201).json({
    success: true,
    data: serviceType,
  });
};

const getServiceTypes = async (req, res, next) => {
  const serviceTypes = await ServiceType.find({});

  res.json({
    success: true,
    data: serviceTypes,
  });
};

const getServiceTypesByCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  if (!isValidObjectId(categoryId)) throw new AppError("id is not valid", 400);

  const serviceTypes = await ServiceType.find({ category: categoryId });

  res.json({
    success: true,
    data: serviceTypes,
  });
};

module.exports = {
  getServiceTypes,
  getServiceTypesByCategory,
  createServiceType,
};
