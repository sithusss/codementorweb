import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const JUDGE0_URL = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
  'x-rapidapi-key': process.env.JUDGE0_KEY, // Put your key in .env.local
};

const LANGUAGE_IDS = {
  java: 62,
  mysql: 33,
};

export async function POST(request) {
  try {
    const { code, language } = await request.json();

    if (language === 'java') {
      const tempDir = os.tmpdir();
      const filePath = path.join(tempDir, 'Main.java');

      await fs.writeFile(filePath, code);

      return new Promise((resolve) => {
        exec(`javac ${filePath} && java -cp ${tempDir} Main`, (error, stdout, stderr) => {
          if (error) {
            resolve(NextResponse.json({ output: stderr || error.message }));
          } else {
            resolve(NextResponse.json({ output: stdout }));
          }
        });
      });
    }

    if (language === 'mysql') {
      // Use Judge0 API to run MySQL code remotely
      const response = await fetch(JUDGE0_URL, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({
          source_code: code,
          language_id: LANGUAGE_IDS.mysql,
        }),
      });
      const data = await response.json();
      return NextResponse.json({
        output: data.stdout || data.stderr || data.compile_output || 'No output',
      });
    }

    return NextResponse.json({ output: 'Language not supported' });
  } catch (err) {
    return NextResponse.json({ output: err.message });
  }
}
