import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Anbu1995@",
  database: "register",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connection success");
  }
});

app.post("/createUser", (req, res) => {
  const sql = "INSERT INTO registers SET?";

  const values = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    date: req.body.date,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  };

  db.query(sql, [values], (err, result) => {
    if (err) throw err;
    return res.json(result);
  });
});

app.listen(3300, () => {
  console.log("Listening");
});
