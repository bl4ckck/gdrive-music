import { Howl, HowlOptions } from 'howler';

type usePlayerAction = {
    play: ()=> number | Howl | undefined
    stop: () => Howl | undefined
    setFlagSeek: (flag: boolean) => void
    setSeek: (seek: number, noPlaySeek?: boolean) => void
}

type usePlayerState<T = boolean> = {
    isPlay: T
    isPause: T
    isStop: T
    isEnd: T
    flagSeek: T
    seek: number
    duration: number
}

export type usePlayerType = () => {
    audioAPI: Howl | undefined
    mediaControl: {
        action: usePlayerAction
        state: usePlayerState
    }
}