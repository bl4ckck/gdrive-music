import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        // user?: {
        //     name?: string | null
        //     email?: string | null
        //     image?: string | null
        //     /** The user's postal address. */
        //     address: string
        // }
        accessToken?: string | null
        refreshToken?: string | null
        expiryDate?: number | null
        tokenType?: string | null
        // expires: ISODateString
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        accessToken?: string | null
        refreshToken?: string | null
        expiryDate?: number | null
        tokenType?: string | null
    }
}