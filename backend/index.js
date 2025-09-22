const express = require("express");
const db = require("./src/config/database");

const app = express();

const PORT = process.env.PORT || 3000;


/**
 * test the database connection by a query
 *
 * @async
 * @returns {Promise<void>} promise by awaiting for that query 
 */
const testConnection = async () => {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("Database connection successful", result.rows[0].now);
  } catch (err) {
    console.log("Database connection error");
  }
};

app.get("/", (req, res) => {
  res.send("Testing backend");
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await testConnection(); 
});
