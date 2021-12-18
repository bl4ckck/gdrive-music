import React from "react"
import { PropsSeekPlayer } from "../../types/types"

const SeekPlayer = (props: PropsSeekPlayer): JSX.Element => {
    const { mcState, mcAction } = props

    const [wPlayer, setWPlayer] = React.useState<number>(0) // Element width
    const [hoverValue, setHoverValue] = React.useState<number>(0)
    const [isHover, setHover] = React.useState<boolean>(false)

    const seekRef = React.useRef(null);

    // Get element Width
    React.useEffect(() => {
        setWPlayer(seekRef.current.offsetWidth)
        console.log(seekRef.current.offsetWidth)
    }, [wPlayer !== seekRef.current?.offsetWidth])

    const seekToPercents = (val: number) => val / mcState.duration * 100

    const seekEvent = (e: any, disableSeek?: boolean): void =>
        mcAction.setSeek(Number((e.target as HTMLInputElement).value), disableSeek)

    return (
        <div className="absolute w-full -top-2">
            <input ref={seekRef} type="range"
                onMouseOver={(e) => {
                    e.preventDefault()
                    console.log("current val hover: ", (e.target as HTMLInputElement).value)
                    setHover(true)
                }}
                onMouseMove={(e) => {
                    console.log("width px: ", wPlayer)
                    console.log("current val hover: ", (e.nativeEvent.offsetX / wPlayer * mcState.duration))
                    setHoverValue(Math.round(e.nativeEvent.offsetX / wPlayer * mcState.duration))
                }}
                onMouseUp={(e) => seekEvent(e)}
                onKeyUp={(e) => {
                    if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown")
                        seekEvent(e)
                }}
                onTouchEnd={(e) => seekEvent(e)}
                onMouseLeave={(e) => setHover(false)}
                onMouseDown={(e) => seekEvent(e, true)}
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown")
                        seekEvent(e, true)
                }}
                onTouchStart={(e) => seekEvent(e, true)}
                onChange={(e) => {
                    // e.preventDefault()
                    mcAction.setSeek(Number((e.target.value)), true)
                }} value={mcState.seek} min="0" max={mcState.duration} className="w-full" />
            <div className="absolute p-1 -translate-x-1 bg-white border-2 rounded-md shadow-md -top-10" style={{
                display: `${isHover ? "block" : "none"}`,
                left: `calc(${seekToPercents(isHover ? hoverValue : mcState.seek)}% + (${1 - seekToPercents(isHover ? hoverValue : mcState.seek) * 0.15}px))`
            }}>
                {isHover ? hoverValue : mcState.seek}
            </div>
        </div>
    )
}

export default SeekPlayer