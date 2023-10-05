const express = require("express");
const router = new express.Router();
const items = require("./fakeDb");
const ExpressError = require("./expressError");

router.get("/", (req, res) => {
  res.json({ items });
});

router.post("/", (req, res) => {
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  res.status(201).json(newItem);
});

router.get("/:name", (req, res, next) => {
  try {
    const foundItem = items.find((i) => i.name === req.params.name);
    if (foundItem === undefined) {
      throw new ExpressError("Item not in the list", 404);
    }
    return res.json(foundItem);
  } catch (e) {
    return next(e);
  }
});

router.patch("/:name", (req, res, next) => {
  try {
    const foundItem = items.find((i) => i.name === req.params.name);
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404);
    }
    foundItem.name = req.body.name;
    foundItem.price = req.body.price;
    return res.json(foundItem);
  } catch (e) {
    return next(e);
  }
});

router.delete("/:name", (req, res, next) => {
  try {
    const foundItem = items.find((i) => i.name === req.params.name);
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404);
    }
    let index = items.indexOf(foundItem);
    items.splice(index, 1);
    return res.json({ message: "Deleted" });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
