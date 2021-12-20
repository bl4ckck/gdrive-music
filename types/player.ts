import { Howl, HowlOptions } from 'howler';
import { KActions, Subset, TActions } from './types';
/**
 * Reducer
 */
export type playAudioState = Pick<usePlayerState, "isPlay" | "isPause" | "isStop" | "text">
export type pauseAudioState = Pick<usePlayerState, "isPlay" | "isPause" | "flagSeek" | "text">

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
 * Action
 */
export enum PLAYER_ACTION_TYPE {
    INIT="[players] Initialize Howl Obj",
    PLAY="[players] Play",
    PLAY_STATE="[players] Play Update State",
    PAUSE="[players] Pause",
    STOP="[players] Stop",
    SEEK="[players] Seek",
    SEEK_PREVIEW="[players] Seek Preview"
}
// type playerActionName = keyof typeof PLAYER_ACTION_TYPE
export type ActionPlayerType = | TActions<PLAYER_ACTION_TYPE.INIT, Howl | null>
    | TActions<PLAYER_ACTION_TYPE.PLAY> 
    | TActions<PLAYER_ACTION_TYPE.PLAY_STATE, playAudioState | pauseAudioState>
    | TActions<PLAYER_ACTION_TYPE.PAUSE> 
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