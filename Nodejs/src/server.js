import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./router/web";
import connectDB from "./config/connectDB";
require("dotenv").config();

let app = express();
// app.use(cors({credentials: true, origin: process.env.REACT_URL}));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

let port = process.env.PORT || 8080;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//set up view engine
configViewEngine(app);
// init web router
initWebRouter(app);

connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
