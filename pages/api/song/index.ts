import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { getSession } from 'next-auth/react'

export default async (req: NextApiRequest,
    res: NextApiResponse
) => {
    const session = await getSession({ req })

    if (session) {
        const credentials = {
            access_token: session.accessToken,
            expiry_date: session.expiryDate,
            id_token: null,
            refresh_token: session.refreshToken,
            token_type: session.tokenType
        }
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_CALLBACK
        )
        oauth2Client.setCredentials(credentials)

        const driveApi = google.drive({ version: "v3", auth: oauth2Client })
        const getAudioList = await driveApi.files.list({
            q: "mimeType contains 'audio/'",
            pageSize: 10,
            fields: 'nextPageToken, files(id, name, webContentLink, driveId, size, fileExtension)'
        })

        res.status(200).json({ data: getAudioList.data.files })
        // res.status(200).json({ "data": [{ "id": "1q3vEetB0mFO9DDOSJJ4eJwCwJ06Ps78f", "name": "Alvin Naufal - Waktu yang Hilang.mp3", "webContentLink": "https://drive.google.com/uc?id=1q3vEetB0mFO9DDOSJJ4eJwCwJ06Ps78f&export=download", "fileExtension": "mp3", "size": "6906426" }, { "id": "1Se1UmJ3XOjHuluL6JwdBAcrXLI37yad7", "name": "Alvin Naufal - Waktu yang Hilang.wav", "webContentLink": "https://drive.google.com/uc?id=1Se1UmJ3XOjHuluL6JwdBAcrXLI37yad7&export=download", "fileExtension": "wav", "size": "50750426" }, { "id": "1A7JwphxVdfXMNuvSKLLu30TUiRl4ZJP0", "name": "fixing vocal lagu 2.wav", "webContentLink": "https://drive.google.com/uc?id=1A7JwphxVdfXMNuvSKLLu30TUiRl4ZJP0&export=download", "fileExtension": "wav", "size": "50702136" }, { "id": "1sNwmVQQWgds-ZIsTSo1UKFVam3Cecjlx", "name": "You are perfect to me.wav", "webContentLink": "https://drive.google.com/uc?id=1sNwmVQQWgds-ZIsTSo1UKFVam3Cecjlx&export=download", "fileExtension": "wav", "size": "35697454" }, { "id": "11Tknidoq0jbIFQwgvgFyxZvyzhCB0I6k", "name": "Lastrip upload finish.mp3", "webContentLink": "https://drive.google.com/uc?id=11Tknidoq0jbIFQwgvgFyxZvyzhCB0I6k&export=download", "fileExtension": "mp3", "size": "4385505" }, { "id": "18wjw9NtD9T24tM4cjAJFb6bihXeQ5DIh", "name": "One More Time - Fachry Nugraha.m4a", "webContentLink": "https://drive.google.com/uc?id=18wjw9NtD9T24tM4cjAJFb6bihXeQ5DIh&export=download", "fileExtension": "m4a", "size": "1257404" }, { "id": "1dTNH-aKALlO_JbZd3Vh_dCCxo-GQMJo_", "name": "Kemarin Kau Baik.mp3", "webContentLink": "https://drive.google.com/uc?id=1dTNH-aKALlO_JbZd3Vh_dCCxo-GQMJo_&export=download", "fileExtension": "mp3", "size": "5361288" }, { "id": "1bhQMxIzXQwf-lUCPEtyBZYyBlgOA8L0s", "name": "Grámma.mp3", "webContentLink": "https://drive.google.com/uc?id=1bhQMxIzXQwf-lUCPEtyBZYyBlgOA8L0s&export=download", "fileExtension": "mp3", "size": "3489557" }, { "id": "1wqKs4wVhWn-Q1knItXUfaUgalHawQBwc", "name": "Alvin Naufal - Night Drive.mp3", "webContentLink": "https://drive.google.com/uc?id=1wqKs4wVhWn-Q1knItXUfaUgalHawQBwc&export=download", "fileExtension": "mp3", "size": "4160876" }, { "id": "1EHTaUws20rgHCseNKk5ZH_afNTTWPuYs", "name": "Alvin Naufal - Night Drive.wav", "webContentLink": "https://drive.google.com/uc?id=1EHTaUws20rgHCseNKk5ZH_afNTTWPuYs&export=download", "fileExtension": "wav", "size": "27509686" }] })
    }
    else {
        res.status(401)
    }
    res.end()
}
