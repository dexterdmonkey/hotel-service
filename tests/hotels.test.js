const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("../database/index");
const Hotel = require("../models/hotel");
const hotelRoutes = require("../routes/hotels");

const app = express();
app.use(bodyParser.json());
app.use("/v1/hotel", hotelRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Hotel API", () => {
  it("should create a new hotel", async () => {
    const response = await request(app).post("/v1/hotel").send({
      name: "Test Hotel",
      city: "Test City",
      price: 100,
      date: "2023-06-20",
      slug: "test-hotel",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("Test Hotel");
  });

  it("should get a hotel by id", async () => {
    const hotel = await Hotel.create({
      name: "Test Hotel 2",
      city: "Test City 2",
      price: 150,
      date: "2023-06-21",
      slug: "test-hotel-2",
    });

    const response = await request(app).get(`/v1/hotel/${hotel.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("Test Hotel 2");
  });

  it("should update a hotel", async () => {
    const hotel = await Hotel.create({
      name: "Test Hotel 3",
      city: "Test City 3",
      price: 200,
      date: "2023-06-22",
      slug: "test-hotel-3",
    });

    const response = await request(app)
      .put(`/v1/hotel/${hotel.id}`)
      .send({ price: 250 });

    expect(response.statusCode).toBe(200);
    expect(response.body.price).toBe(250);
  });

  it("should delete a hotel", async () => {
    const hotel = await Hotel.create({
      name: "Test Hotel 4",
      city: "Test City 4",
      price: 300,
      date: "2023-06-23",
      slug: "test-hotel-4",
    });

    const response = await request(app).delete(`/v1/hotel/${hotel.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Hotel deleted");
  });

  it("should find all hotels with filters", async () => {
    await Hotel.bulkCreate([
      {
        name: "Test Hotel 5",
        city: "Test City 5",
        price: 400,
        date: "2023-06-24",
        slug: "test-hotel-5",
      },
      {
        name: "Test Hotel 6",
        city: "Test City 6",
        price: 500,
        date: "2023-06-25",
        slug: "test-hotel-6",
      },
    ]);

    const response = await request(app).get("/v1/hotel?city=Test City 5");
    expect(response.statusCode).toBe(200);
    expect(response.body.hotels.length).toBe(1);
    expect(response.body.hotels[0].city).toBe("Test City 5");
  });
});
