import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import OAuth2Instance from '../../../lib/OAuth2Instance'
import fs from 'fs';
import os from 'os';
// import uuid from 'uuid';
import path from 'path';
import stream from "stream";
// import isStream from 'is-stream';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb',
        },
    },
}

export default async (req: NextApiRequest,
    res: NextApiResponse
) => {
    const { pid } = req.query
    const driveID = pid as string | undefined
    // const driveID = "1wqKs4wVhWn-Q1knItXUfaUgalHawQBwc"
    // const driveID = "1gZXnm5uCEcRcuXibNgM-qaIlwgprAy7D"
    const oauth2Client = await OAuth2Instance(req)
    const passThrough = new stream.PassThrough()

    const filePath = path.join(os.tmpdir());
    
    var dest = fs.createWriteStream(filePath);

    if (oauth2Client) {        
        const driveApi = google.drive({ version: "v3", auth: oauth2Client })
        const getAudio = await driveApi.files.get({
            fileId: driveID,
            alt: 'media'
        }, 
        { 
            // headers: {
            //     "Cache-Control": "private, max-age=31536000, must-revalidate"
            // },
            responseType: "stream", 
        });

        res.send(getAudio.data)

        // res.writeHead(200, {
        //     // 'Content-Type': 'audio/mpeg',
        //     "Accept": "*/*",
        //     'Accept-Encoding': 'gzip, deflate, br',
        //     'Connection': 'keep-alive',
        //     "Content-Type": "audio/mp4",
        //     // "Content-Disposition": "attachment"
        // })
        // res.end(getAudio.data)
        // res.end()
        // console.log(getAudio.data)
        // // res.pipe(getAudio.data)
        // passThrough.
        // res.end()

        // const dest = fs.createWriteStream(filePath);

        // fs.createReadStream() pipe(dest)

        // res.writeHead(200, {
        //     // 'Content-Type': 'audio/mpeg',
        //     "Accept": "*/*",
        //     'Accept-Encoding': 'gzip, deflate, br',
        //     'Connection': 'keep-alive',
        //     "Content-Type": "audio/mp4",
        //     // "Content-Disposition": "attachment"
        // })
        // res.json(getAudio.data)
        // res.end(getAudio.data)
        // res.pipe(dest)


        // stream.pipeline(getAudio.data)
        // passThrough.end(getAudio.data)
        // passThrough.pipe(res)
        // res.pipe(dest)
        // res.write((await getAudio).data)
        // res.status(200).json({ "data": [{ "id": "1q3vEetB0mFO9DDOSJJ4eJwCwJ06Ps78f", "name": "Alvin Naufal - Waktu yang Hilang.mp3", "webContentLink": "https://drive.google.com/uc?id=1q3vEetB0mFO9DDOSJJ4eJwCwJ06Ps78f&export=download", "fileExtension": "mp3", "size": "6906426" }, { "id": "1Se1UmJ3XOjHuluL6JwdBAcrXLI37yad7", "name": "Alvin Naufal - Waktu yang Hilang.wav", "webContentLink": "https://drive.google.com/uc?id=1Se1UmJ3XOjHuluL6JwdBAcrXLI37yad7&export=download", "fileExtension": "wav", "size": "50750426" }, { "id": "1A7JwphxVdfXMNuvSKLLu30TUiRl4ZJP0", "name": "fixing vocal lagu 2.wav", "webContentLink": "https://drive.google.com/uc?id=1A7JwphxVdfXMNuvSKLLu30TUiRl4ZJP0&export=download", "fileExtension": "wav", "size": "50702136" }, { "id": "1sNwmVQQWgds-ZIsTSo1UKFVam3Cecjlx", "name": "You are perfect to me.wav", "webContentLink": "https://drive.google.com/uc?id=1sNwmVQQWgds-ZIsTSo1UKFVam3Cecjlx&export=download", "fileExtension": "wav", "size": "35697454" }, { "id": "11Tknidoq0jbIFQwgvgFyxZvyzhCB0I6k", "name": "Lastrip upload finish.mp3", "webContentLink": "https://drive.google.com/uc?id=11Tknidoq0jbIFQwgvgFyxZvyzhCB0I6k&export=download", "fileExtension": "mp3", "size": "4385505" }, { "id": "18wjw9NtD9T24tM4cjAJFb6bihXeQ5DIh", "name": "One More Time - Fachry Nugraha.m4a", "webContentLink": "https://drive.google.com/uc?id=18wjw9NtD9T24tM4cjAJFb6bihXeQ5DIh&export=download", "fileExtension": "m4a", "size": "1257404" }, { "id": "1dTNH-aKALlO_JbZd3Vh_dCCxo-GQMJo_", "name": "Kemarin Kau Baik.mp3", "webContentLink": "https://drive.google.com/uc?id=1dTNH-aKALlO_JbZd3Vh_dCCxo-GQMJo_&export=download", "fileExtension": "mp3", "size": "5361288" }, { "id": "1bhQMxIzXQwf-lUCPEtyBZYyBlgOA8L0s", "name": "Grámma.mp3", "webContentLink": "https://drive.google.com/uc?id=1bhQMxIzXQwf-lUCPEtyBZYyBlgOA8L0s&export=download", "fileExtension": "mp3", "size": "3489557" }, { "id": "1wqKs4wVhWn-Q1knItXUfaUgalHawQBwc", "name": "Alvin Naufal - Night Drive.mp3", "webContentLink": "https://drive.google.com/uc?id=1wqKs4wVhWn-Q1knItXUfaUgalHawQBwc&export=download", "fileExtension": "mp3", "size": "4160876" }, { "id": "1EHTaUws20rgHCseNKk5ZH_afNTTWPuYs", "name": "Alvin Naufal - Night Drive.wav", "webContentLink": "https://drive.google.com/uc?id=1EHTaUws20rgHCseNKk5ZH_afNTTWPuYs&export=download", "fileExtension": "wav", "size": "27509686" }] })
    }
    else
     return res.status(401)
    // res.end()
}
