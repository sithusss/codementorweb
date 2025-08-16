import { NextResponse } from 'next/server';

import { getConnection } from '@/lib/db';



export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const connection = await getConnection();

        const [rows] = await connection.execute(
            "SELECT * FROM concepts WHERE category_no = (SELECT category_no FROM category WHERE category_name = ?)", [category]
        );
        

        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching concepts:", error);
        return NextResponse.json({ error: "Failed to fetch concepts" }, { status: 500 });
    }
  
}