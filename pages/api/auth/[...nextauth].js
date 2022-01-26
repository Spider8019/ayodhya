import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginProfile } from "../../../globalSetups/api";

export default NextAuth({
    secret:process.env.JWT_KEY,
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "email", type: "email", placeholder: "jsmith@domain.com" },
              password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const payload = {
                    email: credentials.email,
                    password: credentials.password,
                  };
                const user = await loginProfile(payload)
                if(user.status){
                    return user
                }
                else{
                    return null
                }

            }
          })
    ],
    pages: {
        signIn: '/auth/signin',
      }
})