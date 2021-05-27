const error = (err, req, res, next) => {
  /*
    There are probably better solutions for this but 
    I can't think of any at the moment
  */
  if (err.name === "MongoError" && err.code === 11000) {
    const duplicateEmail = err.message.indexOf("email") !== -1;
    const duplicateUsername = err.message.indexOf("username") !== -1;

    let message;

    if (duplicateEmail) message = "Email is taken";
    if (duplicateUsername) message = "Username is taken";

    return res.status(409).json({
      error: true,
      message,
    });
  }

  const { message = "An Error Occured", status = 400 } = err;

  res.status(status).json({
    error: true,
    message,
    status,
  });
};

module.exports = { error };
