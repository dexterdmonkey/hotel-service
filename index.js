require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/index");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

sequelize
  .sync()
  .then(() => console.log("Database synced..."))
  .catch((err) => console.log("Error: " + err));

const hotelRoutes = require("./routes/hotels");
app.use("/v1/hotel", hotelRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
