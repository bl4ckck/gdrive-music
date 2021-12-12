/** 
 * Test case:
 * 1. If song is end, the seek state also reset & the UI not bouncing
 * 2. Immediately start song with space 
*/
import React, { ReactElement } from "react"
import { Howl, Howler } from 'howler';
import { BiPlayCircle, BiPauseCircle, BiVolumeFull, 
    BiVolumeLow, BiVolumeMute, BiVolume, 
    BiListUl, BiStopCircle, BiSkipPrevious, BiSkipNext  } from "react-icons/bi";
import usePlayer from "../hooks/usePlayer";

const Player = (props: PropsPlayer) => {
    const { mediaControl, audioAPI } = usePlayer()
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
    }, [audioAPI!==undefined])

    const ShowSeek = (): JSX.Element => {
        return (
            <div className="flex-grow cursor-pointer">title {mcState.seek}</div>
        )
    }

    return (
        <div className="fixed bottom-0 z-50 flex items-center w-full h-24 space-x-5 bg-white md:h-16">
            <input type="range" onChange={(e)=>{
                e.preventDefault()
                mcAction.setSeek(parseFloat(e.target.value))
            }} step="1" value={mcState.seek} min="0" max={mcState.duration} className="absolute top-0 w-full -mt-2" />
            <div className="flex-grow">album_cover</div>

            <div className="cursor-pointer">volume {mcState.duration}</div>
            <div className="cursor-pointer">prev</div>
            <div className="cursor-pointer" onClick={(e) => {
                e.preventDefault()
                return mcAction.play()
            }}>{mcState.isPlay ? <BiPauseCircle fontSize={40} /> : <BiPlayCircle fontSize={40} /> }</div>
            <div className="cursor-pointer" onClick={(e) => {
                e.preventDefault()
                mcAction.stop()
            }}>stop</div>
            <div className="cursor-pointer">next</div>

            <div className="flex-grow cursor-pointer">title</div>

            <div className="cursor-pointer">loop</div>
            <div className="cursor-pointer">eq</div>
            <div className="flex-none cursor-pointer">playlist</div>
        </div>
    )
}

export default Player