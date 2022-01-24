import { Action, AnyAction, Dispatch, Middleware } from "redux"
import thunk, { ThunkMiddleware } from "redux-thunk"
import { ACTION_TYPES } from "../../types/actions"
import { ActionPlayerType, PLAYER_ACTION_TYPE, usePlayerState } from "../../types/player"
import { KActions } from "../../types/types"
import { audioAPIUpdateEventState, playAudio, playAudioUpdateState } from "../actions"

const playAudioMdl: Middleware<{}, usePlayerState, <ActionPlayerType>(action: ActionPlayerType) => ActionPlayerType> =
    api => next => (action: ActionPlayerType) => {
// const playAudioMdl: ThunkMiddleware<usePlayerState, ActionPlayerType> = 
//     api => next => (action: ActionPlayerType) => {
        next(action)
        
        if (action.type === PLAYER_ACTION_TYPE.PLAY) {
            api.dispatch(playAudioUpdateState({isPlay: true, isPause: false, 
                isStop: false, text: "PLAY MDL" }))
        }
        else if (action.type === PLAYER_ACTION_TYPE.PAUSE) {
            api.dispatch(playAudioUpdateState({isPlay: false, isPause: true,
                 flagSeek: false, text: "PAUSE MDL" }))
        }
        else if (action.type === PLAYER_ACTION_TYPE.STOP) {
            api.dispatch(playAudioUpdateState({isPlay: false, isStop: true, isPause: false,
                 flagSeek: false, text: "STOP MDL" }))
        }
}
const playAudioFromListMdl: ThunkMiddleware<usePlayerState, ActionPlayerType> = 
    api => next => (action: ActionPlayerType) => {
        next(action)

        if (action.type === PLAYER_ACTION_TYPE.PLAY_FROM_LIST) {
            api.dispatch(playAudioUpdateState({
                isPlay: true, isPause: false,
                isStop: false, text: "PLAY FROM LIST MDL"
            }))
        }
}
const audioEventMdl: Middleware<{}, usePlayerState, <ActionPlayerType>(action: ActionPlayerType) => ActionPlayerType> =
    api => next => (action: ActionPlayerType) => {
        next(action)

        if (action.type === PLAYER_ACTION_TYPE.ON_END_AUDIO) {
            api.dispatch(audioAPIUpdateEventState({flagSeek: false, isPlay: false, 
                isPause: false, isStop: false, text: "ON END MDL" }))
        }
}

// const playerMdl: Middleware<{}, usePlayerState, Dispatch<Action<ActionPlayerType>>> = 
//     api => next => (action: ActionPlayerType) => {
//         if (action.type === PLAYER_ACTION_TYPE.PLAY)
//             api.dispatch({type: playAudio() })
// }

export const playerMdl = [playAudioMdl, audioEventMdl, playAudioFromListMdl]