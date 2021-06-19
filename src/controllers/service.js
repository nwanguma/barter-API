const { ObjectID } = require("mongodb");

const Service = require("../models/service.js");
const AppError = require("../utils/AppError.js");

const { isValidObjectId } = require("../utils/helper.js");

const createService = async (req, res) => {
  const user = req.user;
  const serviceId = new ObjectID();

  const { name, charge, category, type, location, details, media, options } =
    req.body;

  if (!isValidObjectId(type))
    throw new AppError("Service type is not valid", 400);

  if (!isValidObjectId(category))
    throw new AppError("Category is not valid", 400);

  const newService = new Service({
    _id: serviceId,
    name,
    charge,
    category,
    type,
    location,
    details,
    media,
    options,
    user: user._id,
  });

  const service = await newService.save();

  user.services.push(serviceId);

  await user.save();

  res.status(201).json({
    success: true,
    data: service,
  });
};

const getUserServices = async (req, res, next) => {
  const user = req.user;
  const queries = req.query;
  const { page, sortBy, limit, price, category, type, quantity } = queries;
  const match = {};
  const sort = {};

  if (price) match.price = price;
  if (category) match.category = category;
  if (type) match.type = type;
  if (quantity) match.quantity = quantity;

  if (sortBy) {
    const parts = sortBy.split(":");
    const key = parts[0];
    const value = parts[1] === "desc" ? -1 : 1;

    sort[key] = value;
  }

  await user
    .populate({
      path: "services",
      match,
      options: {
        skip: parseInt(page),
        limit: parseInt(limit),
        sort,
      },
    })
    .execPopulate();

  res.json({
    success: true,
    data: req.user.services,
  });
};

const getUserService = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  if (!isValidObjectId(id)) throw new AppError("service id is not valid", 400);

  const service = await Service.findOne({
    user: user._id,
    _id: id,
  }).populate("service");

  if (!service) throw new AppError("service not found", 404);

  res.json({
    success: true,
    data: service,
  });
};

const getService = async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) throw new AppError("service id is not valid", 400);

  const service = await Service.findOne({
    _id: id,
  }).populate("Service");

  if (!service) throw new AppError("service not found", 404);

  res.json({
    success: true,
    data: service,
  });
};

const editService = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  if (!isValidObjectId(id)) throw new AppError("service id is not valid", 400);

  const { name, charge, type, category, location, details, media, options } =
    req.body;

  if (!isValidObjectId(type))
    throw new AppError("service type is not valid", 400);

  if (!isValidObjectId(category))
    throw new AppError("category is not valid", 400);

  const updatedService = await Service.findOneAndUpdate(
    { user: user._id, _id: id },
    {
      $set: {
        name,
        charge,
        category,
        type,
        location,
        details,
        media,
        options,
        user: user._id,
      },
    }
  );

  if (!updatedService) throw new AppError("service not found", 404);

  res.status(201).json({
    success: true,
    data: updatedService,
  });
};

const deleteService = async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) throw new AppError("service id is not valid", 400);

  const service = await Service.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!service) throw new AppError("service not found", 404);

  res.send({
    success: true,
    message: "Deleted successfully",
  });
};

const getAllServices = async (req, res) => {
  const user = req.user;
  const queries = req.query;
  const { page, sortBy, limit, price, category, type, quantity } = queries;
  const match = {};
  const sort = {};

  if (price) match.price = price;
  if (category) match.category = category;
  if (type) match.type = type;
  if (quantity) match.quantity = quantity;

  if (sortBy) {
    const parts = sortBy.split(":");
    const key = parts[0];
    const value = parts[1] === "desc" ? -1 : 1;

    sort[key] = value;
  }

  const services = await Service.find(match)
    .skip(parseInt(page))
    .limit(parseInt(limit))
    .sort(sort);

  res.json({
    success: true,
    data: services,
  });
};

module.exports = {
  createService,
  getUserServices,
  editService,
  deleteService,
  getAllServices,
  getUserService,
  getService,
};
