import { NextResponse } from 'next/server';

const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
  'X-RapidAPI-Key': process.env.JUDGE0_KEY,
};

export async function POST(request) {
  try {
    const { code, language_id } = await request.json();

    if (!language_id) {
      return NextResponse.json({ output: 'Language ID not provided' });
    }

    const response = await fetch(JUDGE0_URL, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({
        source_code: code,
        language_id,
      }),
    });

    const data = await response.json();

    const output =
      data.stdout ||
      data.stderr ||
      data.compile_output ||
      'No output';

    return NextResponse.json({ output });
  } catch (err) {
    return NextResponse.json({ output: `Error: ${err.message}` });
  }
}