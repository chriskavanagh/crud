const express = require("express");
require("express-async-errors");
const config = require("config");
const winston = require("winston");
const { logger } = require("./middleware/logging");
const mongoose = require("mongoose");
const path = require("path");
const expressHandlebars = require("express-handlebars");

const courseRoutes = require("./routes/courses");
const userRoutes = require("./routes/user");
const morgan = require("morgan");
const error = require("./middleware/error");
const cors = require("cors");
const app = express();

mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(res => console.log(`Connected To DB ${config.get("db")}`))
  .catch(error => console.error(error));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  expressHandlebars({
    extname: ".hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts"
  })
);

app.set("view engine", "hbs");
/* new way without importing body-parser
app.use(express.urlencoded({extended: true})); */

app.use(express.static("views/assets"));

app.get("/", (req, res) => {
  res.render("index", { heading: "Handlebars", message: "Welcome" });
});

app.get("/about", (req, res) => {
  res.render("about", { message: "Perfection Alerations!" });
});

app.use("/courses", courseRoutes);
app.use("/users", userRoutes);
app.use(error);

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

const port = process.env.PORT || config.get("port");

app.listen(port, () => {
  console.log(`App running on Port ${port}`);
});
