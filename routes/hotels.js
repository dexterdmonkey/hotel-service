const express = require("express");
const router = express.Router();
const HotelController = require("../controllers/hotelController");

router.post("/", HotelController.createHotel);
router.put("/:id", HotelController.updateHotel);
router.delete("/:id", HotelController.deleteHotel);
router.get("/:identifier", HotelController.findHotelByIdOrSlug);
router.get("/", HotelController.findAllHotels);

module.exports = router;
