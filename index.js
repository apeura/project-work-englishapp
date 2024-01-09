// npm install express mysql cors dotenv
// connect to mysql

import express from "express";
import { createPool } from "mysql";
import { config } from "dotenv";

// Helmet helps secure Express apps by setting HTTP response headers.
import helmet from "helmet";

config();

const app = express();
const port = 8080;

app.use(helmet());

const pool = createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10,
});
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src https://learn-english-2qxb.onrender.com 'nonce-dwzkqezo_-ND54J0'; style-src 'unsafe-inline'"
  );
  next();
});
app.get("/api/Aninmals", (req, res) => {
  pool.query("SELECT * FROM Animals", (error, results) => {
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