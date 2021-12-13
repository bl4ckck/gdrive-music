import React from "react"
import { Howl, Howler, HowlOptions } from 'howler';
import { usePlayerType } from "../types/player";

//TODO: Fix bug useEffect of seek still running onStop or onEnd
const usePlayer: usePlayerType = () => {
    const [flagSeek, setFlagSeek] = React.useState<boolean>(false)
    const [seek, setSeek] = React.useState<number>(0) // init state from localstore
    const [duration, setDuration] = React.useState<number>(0)
    
    const [idPlay, setIdPlay] = React.useState<number>(0)

    const [isPlay, setPlay] = React.useState<boolean>(false)
    const [isPause, setPause] = React.useState<boolean>(false)
    const [isStop, setStop] = React.useState<boolean>(false)
    const [isEnd, setEnd] = React.useState<boolean>(false)

    const [sound, setSound] = React.useState<Howl | undefined>(undefined)

    React.useEffect(() => {
        console.log("load Howler")

        const sound = new Howl({
            src: ['/songs/prism.mp3', '/songs/dubstep.mp3'],
            html5: true,
            onload: (i) => {
                console.log("onload "+i)
               setDuration(sound.duration(i))
            },
            onseek: (i) => {
                console.log("lagi diseek")
                // console.log("when playing, flag seek: ", flagSeek)
                // clearInterval(intervalSeek)
                setFlagSeek(false)
            },
            onend: (i) => {
                //Reset state
                setFlagSeek(false)
                setPlay(false)
                setPause(false)
                setStop(false)
            }
        })
        setSound(sound)        
    }, [])

    React.useEffect(() => {
        console.log("flagSeek: ", flagSeek)

        let intervalSeek: NodeJS.Timer
        if (sound?.playing && flagSeek===false) {
            intervalSeek = setInterval(() => {
                console.log("interval's running")
                setSeek(sound.seek())
            }, 1000)
        }
        return () => clearInterval(intervalSeek)
    }, [flagSeek, sound!==undefined])

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
    const _setSeekAudio = (value: number, noPlaySeek?: boolean) => {
        setSeek(value)
        setFlagSeek(true)
        if (noPlaySeek) return //true
        return sound?.seek(value) //undefined
    }

    return {
        audioAPI: sound,
        mediaControl: {
            action: {
                play: _playAudio,
                stop: _stopAudio,
                setFlagSeek,
                setSeek: _setSeekAudio
            },
            state: {
                isPlay,
                isPause,
                isStop,
                flagSeek,
                seek,
                duration,
                isEnd
            }
        }
    }
}

export default usePlayer