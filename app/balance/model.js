let mongoose = require("mongoose");
let balanceSchema = mongoose.Schema(
  {
    balance: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Balance", balanceSchema);
