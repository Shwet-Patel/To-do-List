import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Tasks from "./models/taskModel.js";
import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.PORT;
const mongoURL = process.env.MONGOURL;

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const list = await Tasks.find({});
    console.log(list);
    res.send(list);
  } catch (error) {
    res.send(error);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Tasks.findById(id);
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.post("/", async (req, res) => {
  try {
    const newtask = {
      title: req.body.title,
      description: req.body.description,
      isCompleted: req.body.isCompleted,
    };

    // console.log(req.body);

    if (!newtask.title || !newtask.description) {
      res.send("<h1>please fill all the fields</h1>");
    }

    const response = await Tasks.create(newtask);
    return res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newtask = req.body;
  if (!newtask.title || !newtask.description) {
    res.send("<h1>please fill all the fields</h1>");
  }

  try {
    const response = await Tasks.findByIdAndUpdate(id, newtask);
    if (!response) {
      res.send("task not found");
    } else {
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Tasks.findByIdAndDelete(id);
    if (!response) {
      res.send("task not found");
    } else {
      console.log(response);
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

mongoose
  .connect(mongoURL)
  .then(() => {
    app.listen(port, () => {
      console.log("listening on port no " + port);
    });
    console.log("connected to the Database");
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
