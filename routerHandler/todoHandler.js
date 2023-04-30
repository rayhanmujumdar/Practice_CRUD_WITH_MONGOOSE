const router = require("express").Router();
const mongoose = require("mongoose");
const todoSchema = require("../schema/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET all the TODOS
router.get("/", async (req, res) => {
  try {
    const result = await Todo.find({ status: "active" })
      .select({
        _id: 0,
        date: 0,
      })
      .limit(2);
    res.status(200).json({
      message: "success",
      result,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      error: "There was a server  side error",
    });
  }
});

// GET a TODOS By ID
router.get("/:id", async (req, res) => {
  try {
    const result = await Todo.findOne({ _id: req.params.id });
    res.status(200).json({
      message: "Success",
      result,
    });
  } catch (err) {
    res.status(200).json({
      error: "There was an server side error",
    });
  }
});

// POST TODOS
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json({
      message: "Todo was inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// POST MULTIPLE TODOS
router.post("/all", async (req, res) => {
  try {
    if (req.body.length) {
      await Todo.insertMany(req.body);
      res.status(200).json({
        message: "Todos were inserted successfully",
      });
    } else {
      res.status(500).json({
        error: "Data not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "There was a server  side error",
    });
  }
});

// PUT TODOS
router.put("/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "success",
      result,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      error: "There was an server side error",
    });
  }
});

// DELETE TODOS
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "Success",
    });
  } catch (err) {
    res.status(200).json({
      error: "There was an server side error",
    });
  }
});

//DELETE ALL Todos
router.delete("/", async (req, res) => {
  try {
    await Todo.deleteMany({
      status: {
        $gte: "inactive",
      },
    });
    res.status(200).json({
      message: "delete success",
    });
  } catch (err) {
    res.status(200).json({
      error: "There was an server side error",
    });
  }
});

module.exports = router;
