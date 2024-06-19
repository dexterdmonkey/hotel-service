const Hotel = require("../models/hotel");
const { Op } = require("sequelize");

class HotelService {
  static async createHotel(data) {
    return Hotel.create(data);
  }

  static async updateHotel(id, data) {
    const hotel = await Hotel.findByPk(id);
    if (hotel) {
      return hotel.update(data);
    }
    throw new Error("Hotel not found");
  }

  static async deleteHotel(id) {
    const hotel = await Hotel.findByPk(id);
    if (hotel) {
      await hotel.destroy();
      return { message: "Hotel deleted" };
    }
    throw new Error("Hotel not found");
  }

  static async findHotelByIdOrSlug(identifier) {
    const hotel = await Hotel.findOne({
      where: {
        [Op.or]: [{ id: identifier }, { slug: identifier }],
      },
    });
    if (hotel) {
      return hotel;
    }
    throw new Error("Hotel not found");
  }

  static async findAllHotels(query) {
    const { name, city, price, date, sort_field, sort_order } = query;
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

    return Hotel.findAll({ where, order });
  }
}

module.exports = HotelService;
