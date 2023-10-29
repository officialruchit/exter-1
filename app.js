const express = require("express");
const app = express();
const model = require("./model");
app.use(express.json());

app.use(express.static(__dirname));

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));

// const url =
//   "mongodb+srv://testing:test@atlascluster.ij20tlj.mongodb.net/da?retryWrites=true&w=majority";
const url = "mongodb://127.0.0.1:27017/demo";
const mongoose = require("mongoose");
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connect");
  })
  .catch(() => console.log("err"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/dd", async (req, res) => {
  res.json(await model.find());
});
app.post("/data", async (req, res) => {
  const { name, price, qty } = req.body;
  const data = new model({
    name,
    price,
    qty,
  });
  await data.save();
  res.json(await model.find());
});
app.delete("/data/:id", async (req, res) => {
  const dd = await model.findByIdAndRemove(req.params.id);

  res.json(await model.find());
});

app.put("/dd/:id", async (req, res) => {
  const { name, price, qty } = req.body;
  const dd = {
    name,
    price,
    qty,
  };
  const up = await model.findByIdAndUpdate(req.params.id, dd, { new: true });
  res.json(up);
});

app.listen(4444, () => {
  console.log("done");
});
