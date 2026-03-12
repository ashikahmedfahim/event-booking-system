module.exports = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};
