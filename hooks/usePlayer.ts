import React from "react"
import { Howl, Howler, HowlOptions } from 'howler';

import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ActionPlayerType, usePlayerState, usePlayerType } from "../types/player";
import { initHowl, onEndAudio, onLoadAudio, pauseAudio, playAudio, stopAudio } from "../redux/actions";

type SPlayer = usePlayerState
const usePlayer: usePlayerType = () => {
    const dispatch = useDispatch<Dispatch<ActionPlayerType>>() 

    const [flagSeek, setFlagSeek] = React.useState<boolean>(false)
    const [seek, setSeek] = React.useState<number>(0) // init state from localstore
    const duration = useSelector<SPlayer, SPlayer["duration"]>((state) => state.duration)

    const [idPlay, setIdPlay] = React.useState<number>(0)
    const text = useSelector<SPlayer, SPlayer["text"]>((state) => state.text)

    const audioAPI = useSelector<SPlayer, SPlayer["audioAPI"]>((state) => state.audioAPI)
    const isPlay = useSelector<SPlayer, SPlayer["isPlay"]>((state) => state.isPlay)
    const isPause = useSelector<SPlayer, SPlayer["isPause"]>((state) => state.isPause)
    const isStop = useSelector<SPlayer, SPlayer["isStop"]>((state) => state.isStop)
    const [isEnd, setEnd] = React.useState<boolean>(false)

    const [audioAPIObj, setAudioAPIObj] = React.useState<Howl | null>(null)

    React.useEffect(() => {
        console.log("load Howler")

        const initAudioAPI = new Howl({
            src: ['songs/kon.mp3', '/songs/dew.mp3', '/songs/prism.mp3'],
            html5: true
        })
        initAudioAPI.on("load", () => {
            dispatch(onLoadAudio(initAudioAPI.duration()))
        })
        initAudioAPI.on("seek", () => {
            console.log("On Seek")
            setFlagSeek(false)
        })
        initAudioAPI.on("end", () => {
            //Reset state
            setFlagSeek(false)
            dispatch(onEndAudio())
        })

        setAudioAPIObj(initAudioAPI)
        dispatch(initHowl(true))
    }, [])

    React.useEffect(() => {
        let intervalSeek: NodeJS.Timer
        // Func Start Interval
        const startInterval = () => {
            if (audioAPIObj !== null)
                intervalSeek = setInterval(() => {
                    console.log("interval's running")
                    setSeek(audioAPIObj.seek())
                })
        }
        // No seek mode AND Stop is false AND while playing
        if (flagSeek === false && isStop !== true && isPlay)
            startInterval()

        // onPause Clearinterval
        audioAPIObj?.on("pause", () => clearInterval(intervalSeek))
        // onStop clearInterval AND immediately set seek based on current seek state
        audioAPIObj?.on("stop", () => {
            clearInterval(intervalSeek)
            setSeek(audioAPIObj.seek())
        })
        // onEnd Clearinterval
        audioAPIObj?.on("end", () => clearInterval(intervalSeek))
        // Clean useEffct
        return () => clearInterval(intervalSeek)
    }, [flagSeek, isPlay, isStop, audioAPIObj !== null])

    const _playAudio = (): ActionPlayerType => {
        if (!audioAPIObj?.playing()) { // While not playing any audio
            audioAPIObj?.play()
            return dispatch(playAudio())
        }
        audioAPIObj?.pause()
        return dispatch(pauseAudio())
    }
    const _stopAudio = React.useCallback((): ActionPlayerType => {
        audioAPIObj?.stop()
        return dispatch(stopAudio())
    }, [isPlay])
    const _setSeekAudio = (value: number, noPlaySeek?: boolean) => {
        setSeek(value)
        setFlagSeek(true)
        if (noPlaySeek) return //true
        return audioAPIObj?.seek(value) //undefined
    }

    let data = {
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
    // const dataCb = React.useMemo(() => data, [data])

    return {
        // audioAPI,
        mediaControl: {
            action: {
                play: _playAudio,
                stop: _stopAudio,
                setFlagSeek,
                setSeek: _setSeekAudio
            },
            state: React.useMemo(() => data, [data])
        }
    }
}

export default usePlayer