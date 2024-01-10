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

app.use(express.static("./frontend/dist"));
app.use(cors());

// Get Animals
app.get("/api/Animals", (req, res) => {
  pool.query("SELECT * FROM Animals", (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error!!" });
    } else {
      res.json(results);
    }
  });
});
// Get Colors
app.get("/api/Colors", (req, res) => {
  pool.query("SELECT * FROM Colors", (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error!!" });
    } else {
      res.json(results);
    }
  });
});
// Get Locations
app.get("/api/Locations", (req, res) => {
  pool.query("SELECT * FROM Locations", (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error!!" });
    } else {
      res.json(results);
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
