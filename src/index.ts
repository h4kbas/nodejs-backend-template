import "reflect-metadata";

import dataSource from "./lib/DataSource";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  // Initialize database connection
  dataSource
    .initialize()
    .then(() => {
      console.log("[STATUS] Database connection initialized");
    })
    .catch((err) => {
      console.error("Database connection failed", err);
    });

  // run express application on port 3000
  app.listen(process.env.APP_PORT || 3000, () => {
    console.log(
      `[STATUS] App is running on port ${process.env.APP_PORT || 3000}`
    );
  });
}

main();
