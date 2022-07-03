// const Student = require("./model");
// const bcrypt = require("bcryptjs");

// module.exports = {
//   actionEdit: async (req, res) => {
//     console.log("tes");
//     try {
//       const { studentBalance } = req.body;
//       const { studentId } = req.params;

//       await Student.findOneAndUpdate(
//         {
//           studentId,
//         },
//         {
//           studentBalance,
//         }
//       );

//       const student = await Student.findOne({ studentId });
//       req.flash("alertMessage", "Berhasil Ubah student");
//       req.flash("alertStatus", "success");
//       res.status(200).json({ student });
//     } catch (error) {
//       req.flash("alertMessage", `${error.message}`);
//       req.flash("alertStatus", `danger`);
//       next(error);
//     }
//   },
// };
