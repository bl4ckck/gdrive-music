import { Howl, HowlOptions } from 'howler';
import { KActions, Subset, TActions } from './types';
/**
 * Reducer
 */
export type onLoadAudioState = Pick<usePlayerState, "duration" | "text">
export type onEndAudioState = Pick<usePlayerState, "flagSeek" | "isPlay" | "isPause" | "isStop" | "text">
export type playAudioState = Pick<usePlayerState, "isPlay" | "isPause" | "isStop" | "text">
export type pauseAudioState = Pick<usePlayerState, "isPlay" | "isPause" | "flagSeek" | "text">
export type stopAudioState = Pick<usePlayerState, "isPlay" | "isPause" | "flagSeek" | "isStop" |"text">

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
/**Indonesia
 * Action
 */
export enum PLAYER_ACTION_TYPE {
    INIT="[players] Initialize Howl Obj",
    ON_LOAD_AUDIO="[players] On Load Audio",
    ON_END_AUDIO="[players] On End Audio",
    EVENT_STATE="[players] Update Event State",
    PLAY="[players] Play",
    PLAY_STATE="[players] Play Update State (Play, Pause, Stop)",
    PAUSE="[players] Pause",
    STOP="[players] Stop",
    SEEK="[players] Seek",
    SEEK_PREVIEW="[players] Seek Preview"
}
// type playerActionName = keyof typeof PLAYER_ACTION_TYPE
export type ActionPlayerType = | TActions<PLAYER_ACTION_TYPE.INIT, true | null>
    | TActions<PLAYER_ACTION_TYPE.ON_LOAD_AUDIO, onLoadAudioState>
    | TActions<PLAYER_ACTION_TYPE.ON_END_AUDIO>
    | TActions<PLAYER_ACTION_TYPE.EVENT_STATE, onEndAudioState>
    | TActions<PLAYER_ACTION_TYPE.PLAY>
    | TActions<PLAYER_ACTION_TYPE.PLAY_STATE, playAudioState | pauseAudioState>
    | TActions<PLAYER_ACTION_TYPE.PAUSE> 
    | TActions<PLAYER_ACTION_TYPE.STOP> 
    | TActions<PLAYER_ACTION_TYPE.SEEK, number | null> 
    | TActions<PLAYER_ACTION_TYPE.SEEK_PREVIEW, number | null>
/**
 * usePlayer Hooks
 */
export type usePlayerAction = {
    play: () => ActionPlayerType,
    stop: () => ActionPlayerType,
    // play: ()=> number | Howl | undefined,
    // stop: () => Howl | undefined,
    setFlagSeek: (flag: boolean) => void,
    setSeek: (seek: number, noPlaySeek?: boolean) => void
}
export type usePlayerState<T = boolean> = {
    audioAPI: true | null,
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
    // audioAPI: Howl | null,
    mediaControl: {
        action: usePlayerAction,
        state: usePlayerState
    }
}