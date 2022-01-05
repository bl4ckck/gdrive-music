import { Howl } from 'howler'
import React from 'react'
import { BiPauseCircle, BiPlayCircle } from 'react-icons/bi'
import usePlayer from '../../hooks/usePlayer'
import { ActionPlayerType, usePlayerState } from '../../types/player'

// type PropsPlayPauseButton = { play: () => ActionPlayerType, 
//     pause: () => ActionPlayerType, isPlay: usePlayerState["isPlay"],
//     audioAPI: usePlayerState["audioAPI"]
// }
type PropsPlayPauseButton = { play: () => ActionPlayerType,
    isPlay: usePlayerState["isPlay"],
    audioAPI: usePlayerState["audioAPI"]
}
export const PlayPauseButton = (props: PropsPlayPauseButton): JSX.Element => {
    const { audioAPI, isPlay, play } = props

    React.useEffect(() => {
        console.log("event key wait for audio API")
        const handleSpace = (event: KeyboardEvent) => {
            if (event.key === " ") {
                event.preventDefault()
                play()
            }
        };
        window.addEventListener('keydown', handleSpace);

        return () => {
            window.removeEventListener('keydown', handleSpace)
        };
    }, [audioAPI !== null, isPlay])

    const RenderPlayButton = React.useMemo(() => isPlay ? <BiPauseCircle fontSize={40} />
            : <BiPlayCircle fontSize={40} />, [isPlay])

    return (
        <div className="cursor-pointer" onClick={(e) => {
            e.preventDefault()
            play()
        }}>
            {RenderPlayButton}
        </div>
    )
}
export const StopButton = (): JSX.Element => {
    const { mediaControl } = usePlayer()
    const mcAction = mediaControl.action

    return (
        <div className="cursor-pointer" onClick={(e) => {
            e.preventDefault()
            mcAction.stop()
        }}>
            stop
        </div>
    )
}