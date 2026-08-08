require("dotenv").config();
console.log("DATABASE_URL =", process.env.DATABASE_URL);
const fs = require("fs");
const path = require("path");
const { pool } = require("../config/db");

(async () => {
  try {
    const sql = fs.readFileSync(
      path.join(__dirname, "schema.sql"),
      "utf8"
    );

    console.log("Applying schema...");
    await pool.query(sql);
    console.log("✅ Schema applied successfully.");
  } catch (err) {
    console.error("❌ Failed to apply schema:");
    console.error(err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();