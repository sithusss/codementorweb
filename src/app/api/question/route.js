import { getConnection } from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const concept = searchParams.get('concept');

        const connection = await getConnection();


        let [rows] = await connection.execute(
            'SELECT * FROM questions WHERE category = ? AND concept = ? LIMIT 1',
            [category, concept]
        );
        

        return NextResponse.json(rows[0] || {});
    } catch (error) {
        console.error("Error fetching question:", error);
        return NextResponse.json({ error: "Failed to fetch question" }, { status: 500 });
    }
  
}