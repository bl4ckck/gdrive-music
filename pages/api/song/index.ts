import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { getSession } from 'next-auth/react'
import OAuth2Instance from '../../../lib/OAuth2Instance'
import { createClient } from "redis";

export default async (req: NextApiRequest,
    res: NextApiResponse
) => {
    const oauth2Client = await OAuth2Instance(req)

    if (oauth2Client) {
        const Etag = req.headers["if-none-match"] as string
        const driveApi = google.drive({ version: "v2", auth: oauth2Client })
        // const client = createClient({
        //     url: process.env.REDIS_URL
        // });
        // client.on('error', (err) => console.log('Redis Client Error', err));
        // await client.connect();

        // const isCached = await client.get(Etag)
        // .then((response) => response!.length > 0? true : false)
        // .catch((err) => {console.log(err)})

        // if (isCached) {
        //     // res.setHeader("ETag", Etag)
        //     // res.setHeader("Cache-Control", "private, max-age=31536000, must-revalidate")
        //     res.status(304).end()
        // }
        // else {

        const getAudioList = await driveApi.files.list({
            q: "mimeType contains 'audio/'",
            // pageSize: 100,
            maxResults: 100,
            fields: 'etag, items(id)'
        },
            {
                // responseType: "json",
                // method: "GET",
                // headers: {
                //     // "if-none-match": req.headers["if-none-match"]   
                //     "cache-control": "private, max-age=31536000, must-revalidate, post-check=0, pre-check=0"
                // }
                // headers: {
                //     "Cache-Control": "no-cache"
                // }
                // headers: {
                //     "Cache-Control": "public, max-age=315360, must-revalidate"
                // }
                // headers: {
                //     "Cache-Control": "private, max-age=120"
                // }
                // stale-while-revalidate
            })
            .then((response) => {
                console.log({ inietag: response.headers["etag"] })
                console.log({ lagietag: response.data.etag })
                // client.set(Etag, JSON.stringify(response.data))

                return response
            })

        res.setHeader(
            // "Cache-Control", "no-cache"
            // "Cache-Control", "private, max-age=31536000, immutable, post-check=0, pre-check=0"
            "ETag", "sad"
        )
        // res.setHeader('Etag', "")
        // res.setHeader('Vary', 'ETag, Content-Encoding')

        console.log({ frmservr: res.getHeaders() })
        console.log({ ine: req.headers["if-none-match"] })
        // console.log({ ine: getAudioList.data })

        res.send({data: getAudioList.data.items})
        // }
    }
    else {
        res.status(401)
    }
    // res.end()
}
