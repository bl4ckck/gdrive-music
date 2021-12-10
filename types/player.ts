import { Howl, HowlOptions } from 'howler';

type usePlayerAction = {
    play: ()=> number | Howl | undefined
    stop: () => Howl | undefined
}

type usePlayerState<T = boolean> = {
    isPlay: T
    isPause: T
    isStop: T
    isEnd: T
    flagSeek: boolean
    seek: number
}

export type usePlayerType = () => {
    audioAPI: Howl | undefined
    mediaControl: {
        action: usePlayerAction
        state: usePlayerState
    }
}