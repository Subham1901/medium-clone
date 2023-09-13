import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import morgan from "morgan";

dotenv.config();
const Router = express.Router();
Router.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);
export const sqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  port: 3306,
});

sqlConnection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database");
});

Router.post("/signup", (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Please provide all the details");
    }
    checkEmail({ email }, "signup")
      .then((data) => {
        insertUserData(name, email, password)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => next(err));
      })
      .catch((error) => {
        console.log(error);
        next({ message: error });
      });
  } catch (error) {
    next(error);
  }
});

//login
Router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let result = await checkEmail({ email, password }, "login");
    res.send(result);
  } catch (error) {
    next(err);
  }
});

const checkEmail = ({ email, password }, source) => {
  return new Promise((resolve, reject) => {
    if (source === "login") {
      let query = "select * from md_user where email = ?";
      sqlConnection.query(query, [email], async (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        let userInfo = JSON.parse(JSON.stringify(data));
        if (userInfo.length === 0) {
          reject("Email not exist, please signup!");
        }

        let isValidPassword = await bcrypt.compare(
          password,
          userInfo[0].password
        );

        if (!isValidPassword) {
          reject("Invalid password");
        }
        let jwtObj = {
          name: userInfo[0].name,
          email: userInfo[0].email,
        };
        let token = await jwt.sign(jwtObj, "mediumv1");

        sqlConnection.query(
          "update md_user set token = ? where email = ?;",
          [token, email],
          (err, data, result) => {
            if (err) {
              reject(err);
            }

            sqlConnection.query(
              "select pk_user_id,name,email,token from md_user where email = ?",
              [email],
              (err, data) => {
                if (err) {
                  reject(err);
                }

                resolve(data);
              }
            );
          }
        );
      });
    } else if (source === "signup") {
      let value = [email];
      let query = "select * from md_user where email = ?";
      sqlConnection.query(query, value, (err, data) => {
        if (err) {
          reject(err);
        }
        let userInfo = JSON.parse(JSON.stringify(data));
        if (userInfo.length > 0) {
          reject("User already exist");
        }

        resolve(userInfo);
      });
    }
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
