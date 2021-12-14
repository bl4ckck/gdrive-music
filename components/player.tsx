/** 
 * Test case:
 * 1. If song is end, the seek state also reset & the UI not bouncing
 * 2. Immediately start song with space 
*/
// TODO: Slider Tooltip https://codepen.io/intertidalist/pen/VojWaR
// TODO: Set Loading in Media Control If soundAPI still undefined
// https://css-tricks.com/value-bubbles-for-range-inputs/
import React, { ReactElement } from "react"
import { Howl, Howler } from 'howler';
import {
    BiPlayCircle, BiPauseCircle, BiVolumeFull,
    BiVolumeLow, BiVolumeMute, BiVolume,
    BiListUl, BiStopCircle, BiSkipPrevious, BiSkipNext
} from "react-icons/bi";
import usePlayer from "../hooks/usePlayer";

const Player = (props: PropsPlayer) => {
    const { mediaControl, audioAPI } = usePlayer()
    const [wPlayer, setWPlayer] = React.useState<number>(0) // Element width

    const seekRef = React.useRef(null);
    const mcState = mediaControl.state
    const mcAction = mediaControl.action

    React.useEffect(() => {
        console.log("event key wait for audio API")
        const handleSpace = (event: KeyboardEvent) => {
            if (event.key === " ") {
                event.preventDefault()
                mcAction.play()
            }
        };
        window.addEventListener('keydown', handleSpace);

        return () => {
            window.removeEventListener('keydown', handleSpace)
        };
    }, [audioAPI !== undefined])

    // Get element Width
    // React.useEffect(() => {
    //     setWPlayer(seekRef.current.offsetWidth)
    //     console.log(2/158*100)
    //     return () => { };
    // }, [wPlayer !== seekRef.current?.offsetWidth])

    const ShowSeek = (): JSX.Element => {
        return (
            <div className="flex-grow cursor-pointer">title {mcState.seek}</div>
        )
    }
    const seekToPercents = (val: number) => val / (mcState.duration - 0) * 100

    const seekEvent = (e: any, disableSeek?: boolean): void => 
    mcAction.setSeek(Number((e.target as HTMLInputElement).value), disableSeek)

    return (
        <div className="fixed bottom-0 z-50 flex items-center w-full h-24 space-x-5 bg-white md:h-16">
            <div className="absolute w-full -top-2">
                <input ref={seekRef} id="seek-component" type="range" 
                onMouseUp={(e) => seekEvent(e)}
                onKeyUp={(e) => {
                    if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown")
                        seekEvent(e)
                }}
                onTouchEnd={(e) => seekEvent(e) }
                onMouseDown={(e) => seekEvent(e, true) }
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown")
                        seekEvent(e, true)
                }}
                onTouchStart={(e) => seekEvent(e, true) }
                onChange={(e) => {
                    // e.preventDefault()
                    mcAction.setSeek(Number((e.target.value)), true)
                }} value={mcState.seek} min="0" max={mcState.duration} className="w-full" />
                <div className="absolute p-1 -translate-x-1 bg-white border-2 rounded-md shadow-md -top-10" style={{ left: `calc(${seekToPercents(mcState.seek)}% + (${1 - seekToPercents(mcState.seek) * 0.15}px))`}}>
                    {mcState.seek}
                </div>
            </div>
            
            <div className="flex-grow">album_cover</div>

            <div className="cursor-pointer">volume {mcState.duration}</div>
            <div className="cursor-pointer">prev</div>
            <div className="cursor-pointer" onClick={(e) => {
                e.preventDefault()
                return mcAction.play()
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