/**
 * If the user is not authenticated, send a 401 status code, otherwise, call the next function
 * @param req - The request object.
 * @param res - the response object
 * @param next - a function that will be called when the middleware is complete.
 */
const protect = (req, res, next) => {
  const { authenticated } = req.session;

  if (!authenticated) {
    res.sendStatus(401);
  } else {
    next();
  }
};

/**
 * Always allow the next middleware to run.
 * @param _1 - The current user
 * @param _2 - The current user
 * @param next - A function that you must call to proceed to the next hook.
 */
const alwaysAllow = (_1, _2, next) => {
  next();
};

module.exports = { protect, alwaysAllow };
