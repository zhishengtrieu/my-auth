"use client"
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { status, data: session } = useSession()
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <>
            {session ? (
              <>
                <h1 className="text-3xl font-bold text-center">Welcome {session?.user?.email}!</h1>
                <p>
                  {JSON.stringify(session, null, 2)}
                </p>
                <button onClick={() => signOut()} className="btn btn-primary">Sign out</button>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-center">Login to access your dashboard</h1>
                <p className="text-center">
                  <a href="/login">Login</a>
                </p>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
