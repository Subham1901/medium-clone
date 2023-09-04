import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
dotenv.config();
const Router = express.Router();

export const sqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

sqlConnection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database");
});

Router.get("/signup", (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    checkEmail(email)
      .then((data) => {
        insertUserData(name, email, password)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => next(err));
      })
      .catch((error) => {
        next({ message: error });
      });
  } catch (error) {
    next(err);
  }
});

const checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "select * from md_user where email = ?";

    sqlConnection.query(query, [email], (err, data) => {
      if (err) {
        reject(err);
      }
      let userInfo = JSON.parse(JSON.stringify(data));
      if (userInfo.length > 0) {
        reject("User already exist");
      }

      resolve(userInfo);
    });
  });
};

let insertUserData = (name, email, password) => {
  return new Promise(async (resolve, reject) => {
    if (name && email && password) {
      let token = await jwt.sign({ name, email }, "mediumv1");
      let hasedPasword = await bcrypt.hash(password, 12);
      let query =
        "insert into md_user (pk_user_id,name,email,password,token) values ?";
      let values = [[v4(), name, email, hasedPasword, token]];
      console.log(values);
      sqlConnection.query(query, [values], (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    } else resolve("No user");
  });
};

export default Router;
