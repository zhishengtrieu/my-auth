"use client"
import { useSession, signOut } from "next-auth/react";
import ProfileForm from "@/components/ProfileForm";
import { Button } from "@/components/ui/button"

export default function Account() {
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
              <ProfileForm defaultValues={{
                name: session.user.name || "",
                username: session.user.email?.split('@')[0] || "",
                email: session.user.email || "",
                avatar: session.user.image || "",
                bio: "",
              }} />
              <Button onClick={() => signOut()}>Sign out</Button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-center">Login to access your account</h1>
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
