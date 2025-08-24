import { NextResponse } from 'next/server';

import { getConnection } from '@/lib/db';

export async function GET() {
    try{
        const connection = await getConnection();
        const [rows] = await connection.execute(
        'SELECT category_no, category_name FROM category'
        );
        

        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }

  
}