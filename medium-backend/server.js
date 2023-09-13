import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import Router from "./Routers/expressRouter.js";

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/medium", Router);

//Error handling

Router.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "Error",
    message: err.message,
  });
});

app.listen(process.env.PORT | 8080, () => {
  console.log("Port connected");
});
