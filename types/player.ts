import { Howl, HowlOptions } from 'howler';
import { TActions } from './types';
/**
 * Store
 */
export const initialStatePlayer: usePlayerState = {
    audioAPI: null,
    duration: 0,
    flagSeek: false,
    isEnd: false,
    isPause: false,
    isPlay: false,
    isStop: false,
    seek: 0,
    text: "ini initial"
}
/**
 * Reducer
 */
export enum PLAYER_ACTION_TYPE {
    INIT="INIT",
    PLAY="PLAY",
    STOP="STOP",
    SEEK="SEEK",
    SEEK_PREVIEW="SEEK_PREVIEW"
}
export type ActionPlayerType = | TActions<PLAYER_ACTION_TYPE.INIT, Howl | null>
 | TActions<PLAYER_ACTION_TYPE.PLAY, Howl> 
| TActions<PLAYER_ACTION_TYPE.STOP, Howl> 
| TActions<PLAYER_ACTION_TYPE.SEEK, number | null> 
| TActions<PLAYER_ACTION_TYPE.SEEK_PREVIEW, number | null>
/**
 * usePlayer Hooks
 */
export type usePlayerAction = {
    play: ()=> number | Howl | undefined,
    stop: () => Howl | undefined,
    setFlagSeek: (flag: boolean) => void,
    setSeek: (seek: number, noPlaySeek?: boolean) => void
}
export type usePlayerState<T = boolean> = {
    audioAPI: Howl | null,
    text: string,
    isPlay: T,
    isPause: T,
    isStop: T,
    isEnd: T,
    flagSeek: T,
    seek: number,
    duration: number
}
export type usePlayerType = () => {
    audioAPI: Howl | undefined,
    mediaControl: {
        action: usePlayerAction,
        state: usePlayerState
    }
}