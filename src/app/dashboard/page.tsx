"use client"
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const { status, data: session } = useSession()
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <>
            {session ? (
              <>
                <h1 className="text-3xl font-bold">Welcome {session.user.name} !</h1>
                <p>
                  {JSON.stringify(session, null, 2)}
                </p>
                <Button onClick={() => signOut()}>Sign out</Button>
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
  );
}
