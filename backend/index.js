const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 8080;
/**
 * MySQL connection pool configuration.
 * @type {mysql.Pool}
 */
const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10,
  // AI solution:
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from(process.env.password + "\0"),
  },
});

app.use(express.json());
app.use(express.static("./frontend/dist"));
app.use(cors());

/**
 * GET request endpoint for fetching a list of tables from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
app.get("/api", (req, res) => {
  pool.query(`SHOW TABLES`, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(404).json({ error: "Not found." });
    } else {
      res.status(200).json(results);
    }
  });
});
/**
 * GET request handler for fetching all data from a specified table.
 * @param {string} req.params.table - The name of the table.
 * @returns {Object} - JSON response containing the fetched data.
 */
app.get("/api/:table", (req, res) => {
  const table = req.params.table;
  pool.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(404).json({ message: `No result for table ${table}` });
    } else {
      res.status(200).json(results);
    }
  });
});
/**
 * GET request handler for fetching a specific data from a table by ID.
 * @param {string} req.params.table - The name of the table.
 * @param {string} req.params.id - The ID of the data to fetch.
 * @returns {Object} - JSON response containing the fetched record.
 */
app.get("/api/:table/:id", (req, res) => {
  const table = req.params.table;
  const id = req.params.id;

  pool.query(`SELECT * FROM ${table} WHERE id= ?`, [id], (error, results) => {
    if (error) {
      console.error(`Error fetching data with id ${id}:`, error);
      res.status(404).json({ message: `No result for ${table} id ${id}` });
    } else {
      res.status(200).json(results);
    }
  });
});
/**
 * POST request handler for inserting new data into a specified table.
 * @param {string} req.params.table - The name of the table.
 * @param {Object} req.body - Request body containing data to be inserted.
 * @param {string} req.body.eng_word - English word.
 * @param {string} req.body.fi_word - Finnish word.
 * @returns {Object} - JSON response indicating success or failure.
 */
app.post("/api/:table", (req, res) => {
  const table = req.params.table;
  const { eng_word, fi_word } = req.body;
  const sql = `INSERT INTO ${table} (eng_word, fi_word) VALUES (?, ?)`;

  pool.query(sql, [eng_word, fi_word], (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
      return res.status(404).json({ message: `No result for ${table}` });
    } else {
      return res
        .status(201)
        .json({ message: "Data received and inserted successfully." });
    }
  });
});
/**
 * PUT request handler for updating data in a specified table by ID.
 * @param {string} req.params.table - The name of the table.
 * @param {string} req.params.id - The ID of the record to update.
 * @param {Object} req.body - Request body containing data to be updated.
 * @param {string} req.body.eng_word - Updated English word.
 * @param {string} req.body.fi_word - Updated Finnish word.
 * @returns {Object} - JSON response indicating success or failure.
 */
app.put("/api/:table/:id", (req, res) => {
  const table = req.params.table;
  const id = req.params.id;
  const { eng_word, fi_word } = req.body;

  const sql = `UPDATE  ${table} SET eng_word = ?, fi_word = ? WHERE id = ?`;
  pool.query(sql, [eng_word, fi_word, id], (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
      return res
        .status(404)
        .json({ message: `No result for ${table} id ${id}` });
    } else {
      return res
        .status(200)
        .json({ message: "Data received and inserted successfully." });
    }
  });
});
/**
 * DELETE request handler for deleting data from a specified table by ID.
 * @param {string} req.params.table - The name of the table.
 * @param {string} req.params.id - The ID of the record to delete.
 * @returns {Object} - JSON response indicating success or failure.
 */
app.delete("/api/:table/:id", (req, res) => {
  const table = req.params.table;
  const id = req.params.id;

  pool.query(`DELETE FROM ${table} WHERE id = ?`, [id], (error, results) => {
    if (error) {
      console.error("Error deleting data:", error);
      return res
        .status(404)
        .json({ message: `No result for ${table} id ${id}` });
    } else {
      return res.status(204).json({ message: "Data deleted successfully." });
    }
  });
});
/**
 * Start the Express server.
 */
if (pool) {
  console.log("MySQL: connection successful.");
  server = app
    .listen(port, () => {
      console.log(`SERVER: listening on port ${port}`);
    })
    .on("error", (err) => {
      console.error("Error starting server:", err);
      process.exit(1);
    });
} else {
  console.error("Error connecting to MySQL:", err);
  process.exit(1);
}
