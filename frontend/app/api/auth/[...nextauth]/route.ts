import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email;
        token.name = profile.name;
        console.log(token.email)
        console.log(token.name)
      }
      return token;
    },
    async session({ session, token }) {
      console.log(token.email)
      console.log(token.name)
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
});
export { handler as GET, handler as POST }
