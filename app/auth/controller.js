const Student = require("../student/model");
const config = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res, next) => {
    try {
      console.log(req.body);
      const payload = req.body;
      console.log("payload : ", payload);
      let student = new Student(payload);
      await student.save();
      delete student._doc.password;
      res.status(201).json({
        data: payload,
      });
    } catch (err) {
      if (err && err.name == "ValidationError") {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
      next(err);
    }
  },
  signin: async (req, res, next) => {
    const { studentId, password } = req.body;
    Student.findOne({ studentId: studentId })
      .then((student) => {
        if (student) {
          const checkPassword = bcrypt.compareSync(password, student.password);
          if (checkPassword) {
            const token = jwt.sign(
              {
                student: {
                  studentId: student.studentId,
                },
              },
              config.jwtKey
            );
            res.status(200).json({
              data: { token },
            });
          } else {
            res.status(403).json({
              message: "password yang anda masukkan salah",
            });
          }
        } else {
          res.status(403).json({
            message: "id yang anda masukkan belum terdaftar",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message || `internal server error`,
        });
        next();
      });
  },
};
