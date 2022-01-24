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

    const text = useSelector<SPlayer, SPlayer["text"]>((state) => state.text)

    const audioAPI = useSelector<SPlayer, SPlayer["audioAPI"]>((state) => state.audioAPI)
    const audioID = useSelector<SPlayer, SPlayer["audioID"]>((state) => state.audioID)
    const audioURL = useSelector<SPlayer, SPlayer["audioURL"]>((state) => state.audioURL)
    const isPlay = useSelector<SPlayer, SPlayer["isPlay"]>((state) => state.isPlay)
    const isPause = useSelector<SPlayer, SPlayer["isPause"]>((state) => state.isPause)
    const isStop = useSelector<SPlayer, SPlayer["isStop"]>((state) => state.isStop)
    const [isEnd, setEnd] = React.useState<boolean>(false)

    const [audioAPIObj, setAudioAPIObj] = React.useState<Howl | null>(null)

    /** Initialize First Howl Obj */
    React.useEffect(() => {
        console.log("load Howler")

        const initAudioAPI = new Howl({
            src: "http://localhost:3000/api/song/1EHTaUws20rgHCseNKk5ZH_afNTTWPuYs",
            format:["mp3", "ogg", "flac", "mp4", "wav"],
            // xhr
            // html5: true,
            preload: true,
            loop: true
        })
        initAudioAPI.on("loaderror", () => {
            // dispatch(onLoadAudio(initAudioAPI.duration()))
            console.log("load error")
        })
        initAudioAPI.on("load", () => {
            console.log(initAudioAPI.duration())
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

        // console.log({audioAPI})
        // if(audioAPI === null){
        setAudioAPIObj(initAudioAPI)
        dispatch(initHowl(true))
    }, [audioURL !== ""])

    // React.useEffect(() => {
    //     if(isPlay)
    //         _playAudio()
    // }, [isPlay, audioAPIObj, audioURL])

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

    // React.useEffect(() => {
    //     if(isPlay)
    //         _playAudio()
    // }, [isPlay])

    const _playAudio = (): ActionPlayerType => {
        if (!audioAPIObj?.playing()) { // While not playing any audio
            // if(isPlay)
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

    let statePlayer = {
        audioID,
        audioURL,
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
    // const dataCb = React.useMemo(() => statePlayer, [statePlayer])

    return {
        // audioAPI,
        mediaControl: {
            action: {
                play: _playAudio,
                stop: _stopAudio,
                setFlagSeek,
                setSeek: _setSeekAudio
            },
            state: React.useMemo(() => statePlayer, [statePlayer])
        }
    }
}

export default usePlayer