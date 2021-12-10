import React from "react"
import { Howl, Howler, HowlListeners } from 'howler';

type props = Array<string | number> | {(): void} 

const usePlayer: props  = () => {
    const [seek, setSeek] = React.useState<number>(0) // init state from localstore
    const [isPlay, setPlay] = React.useState<boolean>(false)
    const [idPlay, setIdPlay] = React.useState<number>(0)
    const [isPause, setPause] = React.useState<boolean>(false)
    const [isStop, setStop] = React.useState<boolean>(false)
    const [sound, setSound] = React.useState<Howl | undefined>(undefined)

    React.useEffect(() => {
        const sound = new Howl({
            src: ['/songs/prism.mp3', '/songs/dubstep.mp3']
        })
        setSound(sound)
    }, [])

    const _playAudio = (soundP?: Howl) => {
        const soundAPI = soundP || sound
        if (!soundAPI?.playing()) {
            setPlay(true)
            setPause(true)
            return soundAPI?.play()
        }
        else {
            setPlay(false)
            setPause(false)
            return soundAPI?.pause()
        }
    }

    return [sound, ""]
}

export default usePlayer