const wrapAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).next((e) => next(e));
  };
};

module.exports = wrapAsync;
