import { Howl } from 'howler'
import React from 'react'
import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi'
import { ActionPlayerType, usePlayerState } from '../../types/player'

type PropsPlayPauseButton = { play: () => ActionPlayerType, 
    pause: () => ActionPlayerType, isPlay: usePlayerState["isPlay"],
    audioAPI: usePlayerState["audioAPI"]
}
export const PlayPauseButton = (props: PropsPlayPauseButton): JSX.Element => {
    const _playAudio = (): ActionPlayerType => {
        const { play, pause } = props
        if (props.audioAPI?.playing() === false) // While not playing any audio
            return play()
        return pause()
    }

    // React.useEffect(() => {
    //     console.log("load Howler")

    //     const audioAPI = new Howl({
    //         src: ['songs/dew.mp3', '/songs/dew.mp3', '/songs/prism.mp3'],
    //         html5: true,
    //     })
    //     props.initHowl(audioAPI)
    // }, [])

    React.useEffect(() => {
        console.log("event key wait for audio API")
        const handleSpace = (event: KeyboardEvent) => {
            if (event.key === " ") {
                event.preventDefault()
                _playAudio()
            }
        };
        window.addEventListener('keydown', handleSpace);

        return () => {
            window.removeEventListener('keydown', handleSpace)
        };
    }, [props.audioAPI!==null])

    return (
        <div className="cursor-pointer" onClick={(e) => {
            e.preventDefault()
            _playAudio()
        }}>
            {props.isPlay ? <BiPauseCircle fontSize={40} /> 
                : <BiPlayCircle fontSize={40} />}
        </div>
    )
}