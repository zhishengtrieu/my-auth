import { AuthForm } from "@/components/AuthForm"

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthForm mode="register" />
      </div>
    </div>
  )
}

