const Item = require("./model");
const path = require("path");
const config = require("../../config");
const fs = require("fs");

module.exports = {
  getItem: async (req, res) => {
    try {
      const item = await Item.find();
      res.status(200).json({ data: { item } });
    } catch (err) {
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  },
  actionCreate: async (req, res, next) => {
    try {
      console.log("file:", req.file);
      const { itemName, desc, price } = req.body;
      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let fileName = req.file.filename + "." + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${fileName}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);

        src.on("end", async () => {
          try {
            const item = new Item({
              itemName,
              desc,
              price,
              itemImage: fileName,
            });
            await item.save();
            res.status(200).json({
              data: { item },
            });
          } catch (error) {
            next(error);
          }
        });
      } else {
        const item = new Item({
          itemName,
          desc,
          price,
        });
        await item.save();
        res.status(200).json({
          data: { item },
        });
      }
    } catch (error) {
      next(error);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { itemName, desc, price } = req.body;
      const { id } = req.params;
      if (req.file) {
        console.log(req.file);
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let fileName = req.file.filename + "." + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${fileName}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const item = await Item.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/${item.thumbnail}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }

            await Item.findByIdAndUpdate(
              {
                _id: id,
              },
              {
                itemName,
                desc,
                price,
                itemImage,
              }
            );
            item = await Item.findOne({ _id: id });

            res.status(200).json({ data: { item } });
          } catch (error) {
            next(error);
          }
        });
      } else {
        await Item.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            itemName,
            desc,
            price,
          }
        );
        const item = await Item.findOne({ _id: id });
        res.status(200).json({ data: { item } });
      }
    } catch (error) {
      next(error);
    }
  },
  actionDelete: async (req, res) => {
    const { id } = req.params;
    try {
      await Item.findByIdAndDelete({
        _id: id,
      });
      const item = await Item.find();
      res.status(200).json({
        item,
      });
    } catch (error) {
      next(error);
    }
  },
};
