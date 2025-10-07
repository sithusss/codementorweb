import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getConnection } from "@/lib/db";


export async function POST(request) {
    try {

        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields required" }, { status: 400 });
        }

        const connection = await getConnection();
        // Check if user already exists
        const [existing] = await connection.execute("SELECT * FROM signup WHERE email = ?", [email]);
        if (existing.length > 0) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        await connection.execute(
            "INSERT INTO signup (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        return NextResponse.json({ message: "Signup successful"}, {status: 201});
    } catch (err) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

