const Balance = require("./model");

module.exports = {
  getBalance: async (req, res, next) => {
    try {
      let balance = await Balance.findById("62c21f5f7767e8ad4b04aad0");
      res.status(200).json({
        balance,
      });
    } catch (error) {
      next(error);
    }
  },

  actionEdit: async (req, res, next) => {
    try {
      console.log(req.body);
      let { balance } = req.body;
      await Balance.findByIdAndUpdate("62c21f5f7767e8ad4b04aad0", {
        balance,
      });

      req.flash("alertMessage", "Berhasil Ubah student");
      req.flash("alertStatus", "success");
      balance = await Balance.findById("62c21f5f7767e8ad4b04aad0");
      res.status(200).json({ balance });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      next(error);
    }
  },
};
