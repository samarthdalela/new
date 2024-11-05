const express = require("express");
const mysql = require("mysql");
const cors = require("cors"); // Corrected this line
const bodyParser = require("body-parser"); // Import body-parser to parse JSON request bodies

const app = express();
app.use(cors());
app.use(express.json);
app.use(bodyParser.json()); // Use body-parser to parse JSON

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "login",
  port: 3306,
});

// Endpoint for signup
app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login(`name`, `email`, `password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json({ message: "Error", error: err });
    }
    return res.json({ message: "User registered", data });
  });
});

// Start the server
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
