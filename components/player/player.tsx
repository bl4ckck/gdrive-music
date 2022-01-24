/** 
 * Test case:
 * 1. If song is end, the seek state also reset & the UI not bouncing
 * 2. Immediately start song with space 
*/
// TODO: Fix on drag range overflow, must only display 0 - max duration
// TODO: Seperate component file of player controller
// TODO: Redux persist for localstorage
// TODO: Redux message pattern
// TODO: Set Loading in Media Control If soundAPI still undefined
// TODO: Rerender only on seek component
// TODO: Fix bug Up Down Key still scrolling
// https://css-tricks.com/value-bubbles-for-range-inputs/
import React, { ReactElement } from "react"
import { Howl, Howler } from 'howler';
// import {
//     BiPlayCircle, BiPauseCircle, BiVolumeFull,
//     BiVolumeLow, BiVolumeMute, BiVolume,
//     BiListUl, BiStopCircle, BiSkipPrevious, BiSkipNext
// } from "react-icons/bi";
import usePlayer from "../../hooks/usePlayer";
// import { PropsPlayer } from "../../types/types";

import { useSelector, useDispatch } from "react-redux";
import { ActionPlayerType, usePlayerState } from "../../types/player";
import { Dispatch } from "redux";
import { initHowl, onEndAudio, onLoadAudio, pauseAudio, playAudio } from "../../redux/actions";
import HowlerInitialize from "../../lib/HowlerInitialize";

import * as PlayerActions from "../../redux/actions"
import { PlayPauseButton, StopButton } from "./controllerPlayer";
import SeekPlayer from "./seekPlayer";
import { calcMsToMinute } from "../../helper/player";

// type PropsPlayer = {
//     actions: typeof PlayerActions
// } & usePlayerState
const Player: React.FunctionComponent = (props) => {
    const dispatch = useDispatch<Dispatch<ActionPlayerType>>()
    const { mediaControl } = usePlayer()
    const mcAction = mediaControl.action
    const mcState = mediaControl.state
    
    return (
        <div className="fixed bottom-0 left-0 z-50 flex items-center w-full h-24 space-x-5 bg-white xl:left-auto xl:mx-auto xl:max-w-7xl md:h-16">
            <SeekPlayer 
                duration={mcState.duration}
                seek={mcState.seek}
                setSeek={mcAction.setSeek}
            />
            
            <div className="flex-grow cursor-pointer">Artist Cover</div>

            <div className="cursor-pointer">volume {calcMsToMinute(mcState.duration)}</div>
            <div className="cursor-pointer">prev</div>
            {/* <div className="cursor-pointer" onClick={(e) => {
                e.preventDefault()
                _playAudio()
            }}>{props.isPlay ? <BiPauseCircle fontSize={40} /> : <BiPlayCircle fontSize={40} />}</div> */}

            <PlayPauseButton
                audioAPI={mcState.audioAPI}
                isPlay={mcState.isPlay}
                play={mcAction.play}
            />
            {/* <StopButton /> */}

            <div className="cursor-pointer" onClick={(e) => {
                e.preventDefault()
                mcAction.stop()
            }}>stop</div>
            <div className="cursor-pointer">next</div>

            <div className="flex-grow cursor-pointer">title {calcMsToMinute(mcState.seek)}</div>

            <div className="cursor-pointer">loop</div>
            <div className="cursor-pointer">eq</div>
            <div className="flex-none cursor-pointer">playlist</div>
        </div>
    )
}

export default Player