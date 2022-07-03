const jwt = require("jsonwebtoken");
const config = require("../../config");
const Student = require("../student/model");
module.exports = {
  isLoginStudent: async (req, res, next) => {
    try {
      const token = req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : null;
      const data = jwt.verify(token, config.jwtKey);
      const student = await Student.findOne({ studentId: data.student.studentId });
      if (!student) {
        throw new Error();
      }
      req.student = student;
      req.token = token;
      next();
    } catch (err) {
      res.status(401).json({
        message: "not authorized",
      });
    }
  },
};
