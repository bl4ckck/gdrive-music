
import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { OAuth2Client, Credentials } from 'google-auth-library'
import { getSession } from 'next-auth/react'
import { IncomingMessage } from 'http'

const OAuth2Instance = async (req: IncomingMessage): Promise<OAuth2Client> => {
    let oauth2Client: OAuth2Client
    const session = await getSession({ req })

    const credentials: Credentials = {
        access_token: session?.accessToken,
        expiry_date: session?.expiryDate,
        id_token: null,
        refresh_token: session?.refreshToken,
        token_type: session?.tokenType
    }
    oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_CALLBACK
    )
    oauth2Client.setCredentials(credentials)

    return oauth2Client
}

export default OAuth2Instance