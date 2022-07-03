const Balance = require("./model");

module.exports = {
  actionEdit: async (req, res) => {
    try {
      console.log(req.body);
      const { balance } = req.body;
      const { id } = req.params;

      await Balance.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          balance,
        }
      );

      req.flash("alertMessage", "Berhasil Ubah student");
      req.flash("alertStatus", "success");
      res.status(200).json({ balance });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      next(error);
    }
  },
};
