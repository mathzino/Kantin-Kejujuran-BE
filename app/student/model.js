const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const HASH_ROUND = 10;
let studentSchema = mongoose.Schema(
  {
    studentId: {
      type: String,
      require: [true, "studentId is required"],
      min: [5, "min"],
      max: [5, "max"],
    },
    password: {
      type: String,
      require: [true, "Kata sandi harus diisi"],
    },
  },
  { timestamps: true }
);
studentSchema.path("studentId").validate(
  async function (value) {
    try {
      //
      let sumNum1 = 0;
      let sumNum2;

      for (let i = 0; i < 3; i++) {
        sumNum1 += parseInt(value[i]);
      }
      sumNum2 = parseInt(value.substring(3, 5));
      check = sumNum1 == sumNum2 ? true : false;
      console.log(check, sumNum1, sumNum2);
      //
      const count = await this.model("Student").countDocuments({ studentId: value });
      return !count && check;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} `
);
studentSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});
module.exports = mongoose.model("Student", studentSchema);
