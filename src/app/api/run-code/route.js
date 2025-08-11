import { NextResponse } from 'next/server';

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
const API_HEADERS = {
  "Content-Type": "application/json",
  "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
  "x-rapidapi-key": process.env.JUDGE0_KEY // store in .env
};

const LANGUAGE_IDS = {
  java: 62,   // Java (OpenJDK 17)
  mysql: 33,  // MySQL
};

export async function POST(request) {
  try {
    const { code, language } = await request.json();

    const res = await fetch(JUDGE0_URL, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        source_code: code,
        language_id: LANGUAGE_IDS[language],
      }),
    });

    const data = await res.json();

    return NextResponse.json({
      output: data.stdout || data.stderr || data.compile_output
    });
  } catch (err) {
    return NextResponse.json({ output: err.message });
  }
}
