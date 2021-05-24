const error = (err, req, res, next) => {
  const { message = "An Error Occured", status = 400 } = err;

  res.status(status).json({
    error: true,
    message,
    status,
  });
};

module.exports = { error };
