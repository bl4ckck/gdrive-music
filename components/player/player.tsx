/** 
 * Test case:
 * 1. If song is end, the seek state also reset & the UI not bouncing
 * 2. Immediately start song with space 
*/
// TODO: Redux persist for localstorage
// TODO: Redux seek
// TODO: Redux message pattern
// TODO: Set Loading in Media Control If soundAPI still undefined
// TODO: Rerender only on seek component
// TODO: Fix bug Up Down Key still scrolling
// https://css-tricks.com/value-bubbles-for-range-inputs/
import React, { ReactElement } from "react"
import { Howl, Howler } from 'howler';
import {
    BiPlayCircle, BiPauseCircle, BiVolumeFull,
    BiVolumeLow, BiVolumeMute, BiVolume,
    BiListUl, BiStopCircle, BiSkipPrevious, BiSkipNext
} from "react-icons/bi";
import usePlayer from "../../hooks/usePlayer";
import { PropsPlayer } from "../../types/types";

import { useSelector, useDispatch } from "react-redux";
import { ActionPlayerType, usePlayerState } from "../../types/player";
import { Dispatch } from "redux";
import { initHowl, pauseAudio, playAudio } from "../../redux/actions";
import HowlerInitialize from "../../lib/HowlerInitialize";

const Player: React.FunctionComponent<PropsPlayer> = (props) => {
    const { mediaControl } = usePlayer()
    const mcAction = mediaControl.action
    const mcState = mediaControl.state
    // const [wPlayer, setWPlayer] = React.useState<number>(0) // Element width
    // const [hoverValue, setHoverValue] = React.useState<number>(0)
    // const [isHover, setHover] = React.useState<boolean>(false)

    // const seekRef = React.useRef(null);
    // const dispatch = useDispatch<Dispatch<ActionPlayerType>>()
    // const isPlaying = useSelector<usePlayerState, usePlayerState["isPlay"]>((state) => state.isPlay)

    React.useEffect(() => {
        console.log("event key wait for audio API")
        const handleSpace = (event: KeyboardEvent) => {
            if (event.key === " ") {
                event.preventDefault()
                mcAction.play()
            }
            return
        };
        window.addEventListener('keydown', handleSpace);

        return () => {
            window.removeEventListener('keydown', handleSpace)
        };
    }, [mcState.audioAPI !== null, mcState.isPlay])
    
    return (
        <div className="fixed bottom-0 z-50 flex items-center w-full h-24 space-x-5 bg-white md:h-16">
            {/* {props.children} */}
            
            <div className="flex-grow cursor-pointer">Artist Cover</div>

            <div className="cursor-pointer">volume {mcState.duration}</div>
            <div className="cursor-pointer">prev</div>
            <div className="cursor-pointer" onClick={(e) => {
                e.preventDefault()
                mcAction.play()
            }}>{mcState.isPlay ? <BiPauseCircle fontSize={40} /> : <BiPlayCircle fontSize={40} />}</div>
            <div className="cursor-pointer" onClick={(e) => {
                e.preventDefault()
                mcAction.stop()
            }}>stop</div>
            <div className="cursor-pointer">next</div>

            <div className="flex-grow cursor-pointer">title {mcState.seek}</div>

            <div className="cursor-pointer">loop</div>
            <div className="cursor-pointer">eq</div>
            <div className="flex-none cursor-pointer">playlist</div>
        </div>
    )
}

export default Player