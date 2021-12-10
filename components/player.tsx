import React from "react"
import { Howl, Howler } from 'howler';
import { BiPlayCircle, BiPauseCircle, BiVolumeFull, 
    BiVolumeLow, BiVolumeMute, BiVolume, 
    BiListUl, BiStopCircle, BiSkipPrevious, BiSkipNext  } from "react-icons/bi";

const Player = (props: PropsPlayer) => {
    const [seek, setSeek] = React.useState<number>(0) // init state from localstore
    const [isPlay, setPlay] = React.useState<boolean>(false)
    const [idPlay, setIdPlay] = React.useState<number>(0)
    const [isPause, setPause] = React.useState<boolean>(false)
    const [isStop, setStop] = React.useState<boolean>(false)
    const [sound, setSound] = React.useState<Howl | undefined>(undefined)

    const _playAudio = (soundP?: Howl) => {
        const soundAPI = soundP || sound
        if (!soundAPI?.playing()) {
            setPlay(true)
            setPause(true)
            return soundAPI?.play()
        }
        else {
            setPlay(false)
            setPause(false)
            return soundAPI?.pause()
        }
    }

    React.useEffect(() => {
        const sound = new Howl({
            src: ['/songs/prism.mp3', '/songs/dubstep.mp3']
        })
        const handleSpace = (event: KeyboardEvent) => {
            if (event.key === " ") {
                event.preventDefault()
                return _playAudio(sound)
            }
        };
        window.addEventListener('keydown', handleSpace);

        setSound(sound)

        return () => {
            window.removeEventListener('keydown', handleSpace);
            setSound(undefined)
        };
    }, [])

    return (
        <div className="fixed bottom-0 z-50 flex items-center w-full h-24 space-x-5 bg-white md:h-16">
            <input type="range" defaultValue={seek} className="absolute top-0 w-full -mt-2" />
            <div className="flex-grow">album_cover</div>

            <div className="cursor-pointer">volume</div>
            <div className="cursor-pointer">prev</div>
            <div className="cursor-pointer" onClick={(e) => {
                e.preventDefault()
                return _playAudio()
            }}>{isPlay ? <BiPauseCircle fontSize={40} /> : <BiPlayCircle fontSize={40} /> }</div>
            <div className="cursor-pointer" onClick={(e) => {
                e.preventDefault()
                setPlay(false)
                setPause(false)
                sound?.stop()
            }}>stop</div>
            <div className="cursor-pointer">next</div>

            <div className="flex-grow cursor-pointer">title</div>

            <div className="cursor-pointer">eq</div>
            <div className="flex-none cursor-pointer">playlist</div>
        </div>
    )
}

export default Player