import { getConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const concept = searchParams.get('concept_no');

    const connection = await getConnection();

    let [rows] = await connection.execute(
      'SELECT question_no, question FROM practice_code WHERE concept_no = ?',
      [concept]
    );

    return NextResponse.json(rows); 
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json({ error: "Failed to fetch question" }, { status: 500 });
  }
}
