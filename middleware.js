function findItem(req, res, next) {
  try {
    const foundItem = items.find((i) => i.name === req.params.name);
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404);
    } else {
      return next();
    }
  } catch (e) {
    return next(e);
  }
}
module.exports = { findItem };
