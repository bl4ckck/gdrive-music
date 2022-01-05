import usePlayer from "../../hooks/usePlayer"
import { PlayPauseButton } from "./controllerPlayer"

const withPlayerHooks = (WrappedComponent: any) => (props: any) => {
    const { mediaControl } = usePlayer()
    const mcAction = mediaControl.action
    const mcState = mediaControl.state
    
    return <WrappedComponent state={mcState} action={mcAction} {...props} />
}

export default withPlayerHooks