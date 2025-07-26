"use client"
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const { status, data: session } = useSession()
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <>
            {session ? (
              <>
                <h1 className="text-3xl font-bold">Welcome {session.user.name} !</h1>
                <pre className="bg-gray-100 p-4 rounded-lg w-full overflow-x-auto">
                  {JSON.stringify(session, null, 2)}
                </pre>
                <Button onClick={() => signOut()}>Sign out</Button>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-center">Login to access your dashboard</h1>
                <Button>
                  <a href="/login">Login</a>
                </Button>
              </>
            )}
          </>
        )}
    </main>
  );
}
