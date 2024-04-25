/* eslint-disable no-dupe-keys */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
// import EmailProvider from "next-auth/providers/email"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import Auth0Provider from "next-auth/providers/auth0"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import User from "../../../models/User"
import clientPromise from "./lib/mongodb"
import db from "../../../utils/db"

db.connectDb();

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.SECRET,

  providers: [
    // OAuth authentication providers
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email } = credentials;
        const { password } = credentials;

        const user = await User.findOne({ email })

        if (user) {
          return SignInUser({ password, user })

        }
        throw new Error("This email does not exist")

      }
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    // Sign in with passwordless email link
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "<no-reply@example.com>",
    // }),
  ],
  callbacks: {
    async session({ session, token }) {
      const user = await User.findById(token.sub);
      session.user._id = token.sub || user._id.toString();
      session.user.role = user.role || "user"
      return session;
    }
  },
  pages: {
    signIn: "/signin"
    // signIn: "/signup"
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
})


const SignInUser = async ({ user, password }) => {
  if (!user.password) {
    throw new Error("Please enter your password")
  }
  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error("Email or Password is wrong")
  }
  return user;
}