import React from "react"
import { Howl, Howler, HowlOptions } from 'howler';
import { ActionPlayerType, initialStatePlayer, usePlayerState, usePlayerType } from "../types/player";

type ExtraInfoType = {
    extraInfo: string
}
export function PlayerWrapper<P>(
    WrappedComponent: React.ComponentType<P & ExtraInfoType>
) {
    const [extraInfo, setExtraInfo] = React.useState('');
    setExtraInfo('important data.');

    React.useEffect(() => {
        console.log("load Howler")

        const initAudioAPI = new Howl({
            src: audioURL ? audioURL : ['songs/dew.mp3', '/songs/kon.mp3', '/songs/prism.mp3'],
            html5: true,
            loop: true
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

        // console.log({audioAPI})
        // if(audioAPI === null){
        setAudioAPIObj(initAudioAPI)
        dispatch(initHowl(true))
    }, [audioURL])

    const ComponentWithExtraInfo = (props: P) => {
        // At this point, the props being passed in are the original props the component expects.
        return <WrappedComponent {...props} extraInfo={extraInfo} />;
    };
    return ComponentWithExtraInfo;
}

export default PlayerWrapper