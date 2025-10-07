import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getConnection } from "@/lib/db";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "All fields required" }, { status: 400 });
        }

        const connection = await getConnection();

        // Check if user exists
        const [rows] = await connection.execute("SELECT * FROM signup WHERE email = ?", [email]);
        const user = rows[0];

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // ✅ Update status before returning response
        await connection.execute("UPDATE signup SET status = 1 WHERE email = ?", [user.email]);

        // ✅ Return success response
        return NextResponse.json({ message: "Sign-in successful" }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
