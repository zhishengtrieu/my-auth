import { NextResponse } from 'next/server';
import { createUser, getUser } from '@/lib/db';

export async function POST(request: Request) {
	const body = await request.json();
	const { name, email, password } = body;
	if (!name || !email || !password) {
		return NextResponse.json({ error: 'Missing name, email, or password' }, { status: 400 });
	}
  // TODO: ensure email is unique
	const user = await getUser(email);
	if (user) {
		return NextResponse.json({ error: 'User already exists' }, { status: 400 });
	}
	await createUser(
		{
			name: name,
			email: email,
			password: password
		});
	return NextResponse.json({ message: 'User created' });
}
    

