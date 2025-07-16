import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin"
import Facebook from 'next-auth/providers/facebook';
import Twitter from 'next-auth/providers/twitter';
import Apple from 'next-auth/providers/apple';
import { getUser } from '@/lib/db';
import { compare } from 'bcrypt-ts';
import jwt from "jsonwebtoken";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
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
        const passwordsMatch = await compare(password, user.password!);
        if (!passwordsMatch) {
          throw new Error("Password does not match");
        }
        
        return  {
          id: user.id.toString(), 
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const accessToken = jwt.sign(
          { sub: user.id, email: user.email },
          process.env.AUTH_SECRET!,
          { expiresIn: "1h" }
        );

        token.accessToken = accessToken;
        token.accessTokenExpires = Date.now() + 3600 * 1000;
        token.userId = user.id;
      }

      if (Date.now() > (token.accessTokenExpires as number ?? 0)) {
        return {};
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId as string;
      session.accessToken = token.accessToken as string;
      session.accessTokenExpires = token.accessTokenExpires as number;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET!,
});
