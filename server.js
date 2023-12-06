import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const salt = 10;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Arasu1995@",
  database: "register",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connection success");
  }
});

// Register
app.post("/createUser", (req, res) => {
  const sql = "INSERT INTO registers SET?";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hassing password" });
    const values = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      date: req.body.date,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      userName: req.body.userName,

      password: hash,
    };

    db.query(sql, [values], (err, result) => {
      if (err) throw err;
      return res.json(result);
    });
  });
});

// login

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM registers WHERE userName = ?';
  
    db.query(sql, [req.body.userName], async (err, data) => {
      if (err) {
        console.error('Login error in server:', err);
        return res.status(500).json({ Error: 'Internal Server Error' });
      }
  
      if (data.length > 0) {
        try {
          const isPasswordValid = await bcrypt.compare(
            req.body.password.toString(),
            data[0].password
          );
  
          if (isPasswordValid) {
         
            return res.json({ Status: 'Success' });
          } else {
            return res.status(401).json({ Error: 'Invalid password' });
          }
        } catch (error) {
          console.error('Password compare error:', error);
          return res.status(500).json({ Error: 'Internal Server Error' });
        }
      } else {
        return res.status(404).json({ Error: 'User not found' });
      }
    });
  });








app.listen(3300, () => {
  console.log("Listening");
});
