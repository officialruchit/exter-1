const mongoose = require("mongoose");
const data = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  qty: {
    type: Number,
  },
});
const dd=mongoose.model("data",data,"data")
module.exports=dd