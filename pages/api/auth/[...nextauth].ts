import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { google } from 'googleapis'

// EXAMPLE SCOPE GOOGLE https://github.com/nextauthjs/next-auth/issues/1275
// REFRESH TOKEN https://github.com/nextauthjs/next-auth/issues/1275

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : "",
            authorization: {
                params: {
                    scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.readonly",
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                },
            }
        }),
        // ...add more providers here
    ],
    secret: process.env.SECRET,
    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `strategy` should be set to 'jwt' if no database is used.
        strategy: 'jwt',

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        secret: process.env.SECRET,
        // Set to true to use encryption (default: false)
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },
    callbacks: {
        async signIn({ user, account, profile, credentials }) {
            console.log({ aweawe: credentials})
            return true // Do different verification for other providers that don't have `email_verified`
        },
        async jwt({ token, account }) {
            // console.log(account?.access_token)
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.expiryDate = account.expires_at
                token.tokenType = account.token_type
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            session.refreshToken = token.refreshToken
            session.expiryDate = token.expiryDate
            session.tokenType = token.tokenType

            session.awe = "ea awdawdsdzxcbbb"
            return session
        }
    },
    debug: true
})