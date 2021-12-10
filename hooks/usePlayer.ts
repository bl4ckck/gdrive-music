import React from "react"
import { Howl, Howler, HowlOptions } from 'howler';
import { usePlayerType } from "../types/player";

const usePlayer: usePlayerType = () => {
    const [flagSeek, setFlagSeek] = React.useState<boolean>(false)
    const [seek, setSeek] = React.useState<number>(0) // init state from localstore
    const [idPlay, setIdPlay] = React.useState<number>(0)

    const [isPlay, setPlay] = React.useState<boolean>(false)
    const [isPause, setPause] = React.useState<boolean>(false)
    
    const [isEnd, setEnd] = React.useState<boolean>(false)
    const [isStop, setStop] = React.useState<boolean>(false)
    const [sound, setSound] = React.useState<Howl | undefined>(undefined)

    React.useEffect(() => {
        console.log("load Howler")
        let intervalSeek: NodeJS.Timer

        const sound = new Howl({
            src: ['/songs/prism.mp3', '/songs/dubstep.mp3'],
            onplay: (i) => {
                intervalSeek = setInterval(() => {
                    setSeek(sound.seek())
                }, 1000)
            },
            onend: (i) => {
                setPlay(false)
                setPause(false)
            }
        })
        setSound(sound)
    
        return () => clearInterval(intervalSeek)
    }, [])

    // React.useEffect(() => {
    //     console.log("interval")
    //     let intervalSeek: NodeJS.Timer
    //     sound?.on("play", (i) => {
    //         intervalSeek = setInterval(() => {
    //             setSeek(sound.seek())
    //         }, 1000)
    //     })

    //     return () => clearInterval(intervalSeek)
    // }, [sound])


    const _playAudio = () => {
        if (!sound?.playing()) {
            setFlagSeek(true)
            setPlay(true)
            setPause(true)
            return sound?.play()
        }
        else {
            setFlagSeek(false)
            setPlay(false)
            setPause(false)
            return sound?.pause()
        }
    }
    const _stopAudio = () => {
        setFlagSeek(false)
        setPlay(false)
        setPause(false)
        return sound?.stop()
    }

    return {
        audioAPI: sound,
        mediaControl: {
            action: {
                play: _playAudio,
                stop: _stopAudio
            },
            state: {
                isPlay,
                isPause,
                isStop,
                flagSeek,
                seek,
                isEnd
            }
        }
    }
}

export default usePlayer