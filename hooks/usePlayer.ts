import React from "react"
import { Howl, Howler, HowlOptions } from 'howler';
import { usePlayerType } from "../types/player";

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
            src: ['/songs/kon.mp3', '/songs/prism.mp3'],
            html5: true,
            onload: (i) => {
                console.log("onload " + i)
                setDuration(sound.duration(i))
            },
            onseek: (i) => {
                console.log("On Seek")
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
        console.log("state: ", {
            play: isPlay,
            seek: flagSeek,
            pause: isPause,
            stop: isStop
        })

        let intervalSeek: NodeJS.Timer
        // Func Start Interval
        const startInterval = () => {
            if (sound !== undefined)
                intervalSeek = setInterval(() => {
                    console.log("interval's running")
                    setSeek(sound.seek())
                }, 1000)
        }
        // No seek mode AND Stop is false AND while playing
        if (flagSeek === false && isStop !== true && isPlay)
            startInterval()

        // onPause Clearinterval
        sound?.on("pause", () => clearInterval(intervalSeek))
        // onStop clearInterval AND immediately set seek based on current seek state
        sound?.on("stop", () => {
            clearInterval(intervalSeek)
            setSeek(sound.seek())
        })
        // onEnd Clearinterval
        sound?.on("end", () => clearInterval(intervalSeek))
        // Clean useEffct
        return () => clearInterval(intervalSeek)
    }, [flagSeek, isPlay, isStop, sound !== undefined])

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
        if (!sound?.playing()) { // While not playing any audio
            setPlay(true)
            setStop(false)
            setPause(false)
            return sound?.play()
        }
        else { // While playing audio
            setFlagSeek(false)
            setPlay(false)
            setPause(true)
            return sound?.pause()
        }
    }
    const _stopAudio = () => {
        setFlagSeek(false)
        setPlay(false)
        setPause(false)
        setStop(true)
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
                isEnd,
                text: "", //Reducer
                audioAPI: null //Reducer
            }
        }
    }
}

export default usePlayer