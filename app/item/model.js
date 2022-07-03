let mongoose = require("mongoose");
let itemSchema = mongoose.Schema(
  {
    itemName: {
      type: String,
      require: [true, "item name is required"],
    },
    itemImage: {
      type: String,
      require: [true, "item image is required"],
    },
    desc: {
      type: String,
      require: [true, "desc is required"],
    },
    price: {
      type: Number,
      require: [true, "price is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
