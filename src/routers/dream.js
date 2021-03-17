const express = require("express");
const router = new express.Router();

const { Dream = Dream, dreamTypes = dreamTypes } = require("../models/dream");
const logger = require("../logger");

// Get all dream types
router.get("/dreamTypes", (req, res) => {
  res.status(200).send(dreamTypes);
});

// Create dream
router.post("/dreams", async (req, res) => {
  const dream = new Dream(req.body);
  logger.info("Create dream");
  try {
    await dream.save();
    res.status(201).send(dream);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Read dreams
// GET /dreams?title="dream1"
router.get("/dreams", async (req, res) => {
  logger.info("Read Dreams");
  try {
    const { page = 1, limit = 3 } = req.query;

    const match = {};

    if (req.query.title) {
      match.title = req.query.title;
    }

    if (req.query.type) {
      match.dream = req.query.type;
    }

    const dream = await Dream.find(match)
      .populate("Dreams")
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // fix this
    if (!dream) {
      return res.status(404).send({ error: "Invalid query" });
    }
    res.send(dream);
  } catch (e) {
    res.status(500).send();
  }
});

// Update dream
router.patch("/dreams/:id", async (req, res) => {
  logger.info("Update Dreams");

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
  logger.info("Delete Dreams");

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
