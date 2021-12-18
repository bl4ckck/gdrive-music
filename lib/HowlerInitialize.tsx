import React from "react"
import { Howl, Howler, HowlOptions } from 'howler';
import { usePlayerType } from "../types/player";
//TODO: Global COnfig Redux

const HowlerInitialize: () =>
    Howl | null = () => {
    const [audioAPI, setAudioAPI] = React.useState<Howl | null>(null)
    React.useEffect(() => {
        console.log("Init Howler")
        const audioAPI = new Howl({
            src: ['/songs/kon.mp3', '/songs/prism.mp3'],
            html5: true
        })
        setAudioAPI(audioAPI)
    }, [])

    return audioAPI
}

export default HowlerInitialize