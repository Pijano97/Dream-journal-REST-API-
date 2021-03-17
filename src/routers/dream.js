const express = require("express");
const router = new express.Router();
const Dream = require("../models/dream");
const dreamTypes = require("../models/dream");

// Get all dream types
router.get("/dreamTypes", (req, res) => {
  res.status(200).send(dreamTypes);
});

// Create dream
router.post("/dreams", async (req, res) => {
  const dream = new Dream(req.body);

  console.log(req.body);
  try {
    await dream.save();
    res.status(201).send(dream);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read dreams
router.get("/dreams", async (req, res) => {
  try {
    const dream = await Dream.find({});
    res.send(dream);
  } catch (e) {
    res.status(500).send();
  }
});

// Update dream
router.patch("/dreams/:id", async (req, res) => {
  const _id = req.params.id;
  //validation
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "dream"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  // invalid update
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // send dream back after update
    const dream = await Dream.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    // dream not found
    if (!dream) {
      return res.status(404).send();
    }

    res.send(dream);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete dream

router.delete("/dreams/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const dream = await Dream.findByIdAndDelete(_id);

    if (!dream) {
      return res.status(404).send();
    }

    res.status(200).send(dream);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
