import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface User {
  id: string;
  email: string;
  access: string;
  refresh: string;
}

interface Credentials {
  email: string;
  password: string;
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email Adresiniz' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Credentials | undefined): Promise<User | null> {
        if (!credentials) return null;

        const res = await fetch(`${process.env.NEXTAUTH_URL}/auth/token/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) return null;

        const data = await res.json();

        // Console log to print the access and refresh tokens
        console.log("Authorize response - Access token:", data.access);
        console.log("Authorize response - Refresh token:", data.refresh);

        if (data.access && data.refresh) {
          return {
            id: data.id,
            email: credentials.email,
            access: data.access,
            refresh: data.refresh,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // Initial sign-in
      if (user) {
        token.access = user.access;
        token.refresh = user.refresh;

        // Console log to print tokens after sign-in
        console.log("JWT callback - Access token:", token.access);
        console.log("JWT callback - Refresh token:", token.refresh);
      }

      // Token refresh logic here
      const accessTokenExpired = (token.exp < Date.now() / 1000);

      if (accessTokenExpired) {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/auth/token/refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh: token.refresh,
          }),
        });

        const refreshedTokens = await response.json();

        if (response.ok) {
          token.access = refreshedTokens.access;

          // Console log to print new access token after refresh
          console.log("JWT callback - Refreshed Access token:", token.access);
        } else {
          return null; // Invalidate token if refresh fails
        }
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.access; // Pass access token to session
      session.refreshToken = token.refresh; // Pass refresh token to session

      // Console log to print tokens during session creation
      console.log("Session callback - Access token:", session.accessToken);
      console.log("Session callback - Refresh token:", session.refreshToken);

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST }
