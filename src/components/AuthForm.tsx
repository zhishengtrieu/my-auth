"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"

interface AuthFormProps {
  mode: 'login' | 'register';
}

export function AuthForm({ mode }: AuthFormProps) {
  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    if (mode === 'login') {
      // Logique de connexion
      await signIn("credentials", {
        email: email,
        password: password,
        redirectTo: "/dashboard",
      });
    } else {
      // Logique d'inscription
      console.log("Inscription :", { name, email, password });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  {mode === "login" ? "Welcome back" : "Create an account"}
                </h1>
                <p className="text-balance text-muted-foreground">
                  {mode === "login" ? "Login to your account" : "Sign up with your email"}
                </p>
              </div>
              {mode === "register" && (
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" name="name" placeholder="Your Name" required />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {mode === "login" && (
                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                      Forgot your password?
                    </a>
                  )}
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                {mode === "login" ? "Login" : "Sign up"}
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* Bouton de connexion avec Apple */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn("github", { redirectTo: "/dashboard" })}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path 
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      fill="currentColor"
                      />
                  </svg>
                  <span className="sr-only">Login with Github</span>
                </Button>
                {/* Bouton de connexion avec Google */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn("google", { redirectTo: "/dashboard" })}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
                {/* Bouton de connexion avec Meta */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn("facebook", { redirectTo: "/dashboard" })}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M24 12.073c0-5.8-4.702-10.502-10.502-10.502S3 6.273 3 12.073c0 5.24 3.84 9.58 8.877 10.37v-7.34H9.08v-3.03h2.797V9.41c0-2.76 1.64-4.28 4.15-4.28 1.2 0 2.46.21 2.46.21v2.71h-1.39c-1.37 0-1.79.85-1.79 1.72v2.06h3.05l-.49 3.03h-2.56v7.34c5.037-.79 8.877-5.13 8.877-10.37z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Facebook</span>
                </Button>
                {/* Bouton de connexion avec Twitter */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn("twitter", { redirectTo: "/dashboard" })}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M23.999 4.571a9.25 9.25 0 0 1-2.657.725 4.65 4.65 0 0 0 2.043-2.57 9.25 9.25 0 0 1-2.943 1.125 4.625 4.625 0 0 0-7.906 4.21 13.143 13.143 0 0 1-9.55-4.843 4.625 4.625 0 0 0 1.43 6.157 4.6 4.6 0 0 1-2.096-.575v.057a4.625 4.625 0 0 0 3.7 4.533 4.65 4.65 0 0 1-2.09.079 4.625 4.625 0 0 0 4.312 3.21 9.27 9.27 0 0 1-5.743 1.98 13.079 13.079 0 0 0 7.07 2.07c8.5 0 13.15-7.04 13.15-13.15 0-.2 0-.4-.015-.6a9.37 9.37 0 0 0 2.3-2.4z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Twitter</span>
                </Button>
                {/* Bouton de connexion avec LinkedIn */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn("linkedin", { redirectTo: "/dashboard" })}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path 
                      d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with LinkedIn</span>
                </Button>
                {/* Bouton de connexion avec Apple */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn("apple", { redirectTo: "/dashboard" })}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Apple</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <a
                  href={`/${mode === "login" ? "register" : "login"}`}
                  className="underline underline-offset-4"
                >
                  {mode === "login" ? "Sign up" : "Login"}
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.png"
              alt="Image"
              className="object-cover w-full h-full"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
