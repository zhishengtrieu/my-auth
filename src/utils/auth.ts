import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin"
import Facebook from 'next-auth/providers/facebook';
import Twitter from 'next-auth/providers/twitter';
import Apple from 'next-auth/providers/apple';
import { getUser } from '@/lib/db';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    // Fournisseur de connexion par email et mot de passe
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        const email = credentials.email as string;
        const user = await getUser(email);
        if (!user) {
          throw new Error("No user found with this email");
        }

        const password = credentials.password as string;

        if (!(user.password === password)) {
          throw new Error("Password does not match");
        }
        
        return  {
          id: user.id.toString(), 
          name: user.name,
          email: user.email,
        };
      },
    }),
    // Fournisseur Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Fournisseur GitHub
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Fournisseur LinkedIn
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
    // Fournisseur Facebook
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
    Apple,
  ],
});
