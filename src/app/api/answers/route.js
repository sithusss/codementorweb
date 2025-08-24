import { getConnection } from '@/lib/db'; // adjust path as needed
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const question_no = searchParams.get('question_no');
    if (!question_no) {
      return NextResponse.json({ error: 'Missing question_no' }, { status: 400 });
    }

    const connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT code FROM check_code WHERE question_no = ?",
      [question_no]
    );

    if (!rows.length) {
      return NextResponse.json({ error: 'No optimal code found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}