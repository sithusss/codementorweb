import mysql from "mysql2/promise";

let connection;

export async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "localhost",     // change if needed
      user: "root",          // your MySQL username
      password: "",  // your MySQL password
      database: "codementor" // your DB name
    });
  }
  return connection;
}
