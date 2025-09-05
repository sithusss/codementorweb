import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { code } = await request.json();

    // Connect to your database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: " ",
      database: 'codementorweb',   // your DB name
    });

    // Run the query
    const [rows] = await connection.query(code);
    await connection.end();

    return NextResponse.json({ output: JSON.stringify(rows, null, 2) });
  } catch (err) {
    return NextResponse.json({ output: `SQL Error: ${err.message}` });
  }
}
