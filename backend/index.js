// npm install express mysql cors dotenv
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 8080;

const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10,
  // troubleshooting 'UNSUPPORTED_AUTH_METHOD'
  // authentication plugin to handle authentication via password during connection handshake
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from(process.env.password + "\0"),
  },
});

app.use(express.json());
app.use(express.static("./frontend/dist"));
app.use(cors());

// Get
app.get("/api/:table", (req, res) => {
  const table = req.params.table;
  pool.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error!!" });
    } else {
      res.json(results);
    }
  });
});

// Get 1
app.get("/api/:table/:id", (req, res) => {
  const table = req.params.table;
    const id = req.params.id;

  pool.query(`SELECT * FROM ${table} WHERE id= ?`, [id], (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error!!" });
    } else {
      res.json(results);
    }
  });
});

// Post
app.post("/api/:table", (req, res) => {
  const table = req.params.table;
  const { eng_word, fi_word } = req.body;
  const sql = `INSERT INTO ${table} (eng_word, fi_word) VALUES (?, ?)`;

  pool.query(sql, [eng_word, fi_word], (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
      return res.status(500).json({ error: "Internal Server Error!!" });
    } else {
      console.log("Data inserted successfully");
      return res
        .status(200)
        .json({ message: "Data received and inserted successfully" });
    }
  });
});

// Put
app.put("/api/:table/:id", (req, res) => {
  const table = req.params.table;
  const id = req.params.id;
  const { eng_word, fi_word } = req.body;
  const sql = `UPDATE  ${table} SET eng_word = ?, fi_word = ? WHERE id = ?`;

  pool.query(sql, [eng_word, fi_word, id], (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
      return res.status(500).json({ error: "Internal Server Error!!" });
    } else {
      console.log("Data inserted successfully");
      return res
        .status(200)
        .json({ message: "Data received and inserted successfully" });
    }
  });
});

// Delete
app.delete("/api/:table/:id", (req, res) => {
  const table = req.params.table;
  const id = req.params.id;

  pool.query(`DELETE FROM ${table} WHERE id = ?`, [id], (error, results) => {
    if (error) {
      console.error("Error deleting data:", error);
      return res.status(500).json({ error: "Internal Server Error!!" });
    } else {
      console.log("Data deleting successfully");
      return res.status(200).json({ message: "Data deleted successfully" });
    }
  });
});

server = app
  .listen(port, () => {
    console.log(`SERVER: listening on port ${port}.`);
    console.log(process.env);
  })
  .on("error", (err) => {
    console.error("SERVER: Error starting server: ", err);
    process.exit(1);
  });

// docker ps -a + docker stop (container id)
// docker-compose up -d -> (docker-compose exec app sh -> ls -la -> exit) -> docker-compose down
// docker-compose logs
// mysql -h mydb.tamk.fi -u dranpe -p dbdranpe2

// npm run start
