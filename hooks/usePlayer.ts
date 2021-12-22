import React from "react"
import { Howl, Howler, HowlOptions } from 'howler';
import { ActionPlayerType, usePlayerState, usePlayerType } from "../types/player";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { initHowl, pauseAudio, playAudio, stopAudio } from "../redux/actions";

type SPlayer = usePlayerState
const usePlayer: usePlayerType = () => {
    const dispatch = useDispatch<Dispatch<ActionPlayerType>>() 

    const [flagSeek, setFlagSeek] = React.useState<boolean>(false)
    const [seek, setSeek] = React.useState<number>(0) // init state from localstore
    const [duration, setDuration] = React.useState<number>(0)

    const [idPlay, setIdPlay] = React.useState<number>(0)
    const text = useSelector<SPlayer, SPlayer["text"]>((state) => state.text)

    const audioAPI = useSelector<SPlayer, SPlayer["audioAPI"]>((state) => state.audioAPI)
    const isPlay = useSelector<SPlayer, SPlayer["isPlay"]>((state) => state.isPlay)
    const isPause = useSelector<SPlayer, SPlayer["isPause"]>((state) => state.isPause)
    const isStop = useSelector<SPlayer, SPlayer["isStop"]>((state) => state.isStop)
    const [isEnd, setEnd] = React.useState<boolean>(false)

    const [sound, setSound] = React.useState<Howl | undefined>(undefined)

    React.useEffect(() => {
        console.log("load Howler")

        const audioAPI = new Howl({
            src: ['songs/kon.mp3', '/songs/dew.mp3', '/songs/prism.mp3'],
            html5: true,
            // onload: (i) => {
            //     console.log("onload " + i)
            //     setDuration(sound.duration(i))
            // },
            // onseek: (i) => {
            //     console.log("On Seek")
            //     setFlagSeek(false)
            // },
            // onend: (i) => {
            //     //Reset state
            //     setFlagSeek(false)
            //     setPlay(false)
            //     setPause(false)
            //     setStop(false)
            // }
        })
        dispatch(initHowl(audioAPI))
    }, [])

    // React.useEffect(() => {
    //     console.log("flagSeek: ", flagSeek)
    //     console.log("state: ", {
    //         play: isPlay,
    //         seek: flagSeek,
    //         pause: isPause,
    //         stop: isStop
    //     })

    //     let intervalSeek: NodeJS.Timer
    //     // Func Start Interval
    //     const startInterval = () => {
    //         if (sound !== undefined)
    //             intervalSeek = setInterval(() => {
    //                 console.log("interval's running")
    //                 setSeek(sound.seek())
    //             }, 1000)
    //     }
    //     // No seek mode AND Stop is false AND while playing
    //     if (flagSeek === false && isStop !== true && isPlay)
    //         startInterval()

    //     // onPause Clearinterval
    //     sound?.on("pause", () => clearInterval(intervalSeek))
    //     // onStop clearInterval AND immediately set seek based on current seek state
    //     sound?.on("stop", () => {
    //         clearInterval(intervalSeek)
    //         setSeek(sound.seek())
    //     })
    //     // onEnd Clearinterval
    //     sound?.on("end", () => clearInterval(intervalSeek))
    //     // Clean useEffct
    //     return () => clearInterval(intervalSeek)
    // }, [flagSeek, isPlay, isStop, sound !== undefined])

    const _playAudio = (): ActionPlayerType => {
        if (isPlay===false) // While not playing any audio            
            return dispatch(playAudio())
        return dispatch(pauseAudio())
    }
    const _stopAudio = (): ActionPlayerType => dispatch(stopAudio())
    // const _setSeekAudio = (value: number, noPlaySeek?: boolean) => {
    //     setSeek(value)
    //     setFlagSeek(true)
    //     if (noPlaySeek) return //true
    //     return sound?.seek(value) //undefined
    // }

    return {
        // audioAPI,
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
                duration,
                isEnd,
                text, //Reducer
                audioAPI //Reducer
            }
        }
    }
}

export default usePlayer