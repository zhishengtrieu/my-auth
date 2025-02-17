import { NextResponse } from 'next/server';
import { createUser } from '@/lib/db';

export async function POST(request: Request) {
    const body = await request.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
        return NextResponse.json({ error: 'Missing name, email, or password' }, { status: 400 });
    }
    await createUser(name, email, password);
    return NextResponse.json({ message: 'User created' });
}
    

