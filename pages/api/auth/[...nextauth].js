import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginProfile } from "../../../globalSetups/api";


export default NextAuth({
    secret:process.env.JWT_KEY,
 
    providers: [
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
                // return user
                if(user.status===200){
                    console.log(user.data)
                    return user.data.user
                }
                else{
                    return null
                }

            }
          })
    ],
    callbacks: {
      redirect({ url, baseUrl   }) {
        return baseUrl
        // if (url.startsWith(baseUrl)) return url
        // // Allows relative callback URLs
        // else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
        // return baseUrl
      }
    },
    pages:{
      signIn:'/auth/signin'
    }
})