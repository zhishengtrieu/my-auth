"use client"
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession()
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        <h1 className="text-3xl font-bold text-center">
          {session ? `Welcome ${session.user?.email} !` : "Welcome to Next.js !"}
        </h1>

        <p>
          Go to your <strong><a href="/dashboard">dashboard</a></strong>
        </p>
        
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      
      </footer>
    </div>
  );
}
