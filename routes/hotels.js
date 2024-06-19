const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.post("/", async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:identifier", async (req, res) => {
  try {
    const hotel = await Hotel.findOne({
      where: {
        [Op.or]: [
          { id: req.params.identifier },
          { slug: req.params.identifier },
        ],
      },
    });
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ message: "Hotel not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  const { name, city, price, date, sort_field, sort_order } = req.query;

  let where = {};
  if (name) where.name = { [Op.iLike]: `%${name}%` };
  if (city) where.city = city;
  if (price) {
    const [minPrice, maxPrice] = price.split(":").map(Number);
    where.price = { [Op.between]: [minPrice, maxPrice] };
  }
  if (date) {
    const [startDate, endDate] = date.split(":").map((d) => new Date(d));
    where.date = { [Op.between]: [startDate, endDate] };
  }

  let order = [];
  if (sort_field && sort_order) {
    order.push([sort_field, sort_order.toUpperCase()]);
  }

  try {
    const hotels = await Hotel.findAll({ where, order });
    res.json({ hotels });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) {
      await hotel.update(req.body);
      res.json(hotel);
    } else {
      res.status(404).json({ message: "Hotel not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.id);
    if (hotel) {
      await hotel.destroy();
      res.json({ message: "Hotel deleted" });
    } else {
      res.status(404).json({ message: "Hotel not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
