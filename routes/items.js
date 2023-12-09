const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    items: items
  })
});

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      error: "Name and price are required"
    });
  }

  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  return res.status(201).json({
    added: newItem
  });
});

router.get("/:name", (req, res) => {
  const foundItem = items.find(item => item.name === req.params.name);
  if (foundItem === undefined) {
    return res.status(404).json({
      error: "Item not found"
    });
  }
  return res.json({
    item: foundItem
  });
});

router.patch("/:name", (req, res) => {
  const foundItem = items.find(item => item.name === req.params.name);
  if (foundItem === undefined) {
    return res.status(404).json({
      error: "Item not found"
    });
  }

  foundItem.price = req.body.price;
  items[items.indexOf(foundItem)] = foundItem;

  return res.json({
    updated: foundItem
  });
});

router.delete("/:name", (req, res) => {
  let found = false;
  for (let [idx, item] of items.entries()) {
    if (item.name === req.params.name) {
      items.splice(idx, 1);
      found = true;
    }
  }

  if (!found) {
    return res.status(404).json({
      error: "Item not found"
    });
  }

  return res.status(200).json({
    item: req.params.name,
    status: "deleted"
  })
});

module.exports = router;