const HotelService = require("../services/hotelService");

class HotelController {
  static async createHotel(req, res) {
    try {
      const hotel = await HotelService.createHotel(req.body);
      res.status(201).json(hotel);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateHotel(req, res) {
    try {
      const hotel = await HotelService.updateHotel(req.params.id, req.body);
      res.json(hotel);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteHotel(req, res) {
    try {
      const message = await HotelService.deleteHotel(req.params.id);
      res.json(message);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async findHotelByIdOrSlug(req, res) {
    try {
      const hotel = await HotelService.findHotelByIdOrSlug(
        req.params.identifier
      );
      res.json(hotel);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async findAllHotels(req, res) {
    try {
      const hotels = await HotelService.findAllHotels(req.query);
      res.json({ hotels });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = HotelController;
