import { Action, AnyAction, Dispatch, Middleware } from "redux"
import thunk, { ThunkMiddleware } from "redux-thunk"
import { ACTION_TYPES } from "../../types/actions"
import { ActionPlayerType, PLAYER_ACTION_TYPE, usePlayerState } from "../../types/player"
import { KActions } from "../../types/types"
import { playAudio, playAudioUpdateState } from "../actions"


// const playerMdl: Middleware<{}, usePlayerState, Dispatch<Action<Extract<ACTION_TYPES,
//     { key: KActions.PLAYER }>["type"]>>> = api => next => action => {
const playAudioMdl: ThunkMiddleware<usePlayerState, ActionPlayerType> = 
    api => next => (action: ActionPlayerType) => {
        next(action)

        if (action.type === PLAYER_ACTION_TYPE.PLAY) {
            api.getState().audioAPI?.play()
            api.dispatch(playAudioUpdateState({isPlay: true, isPause: false, 
                isStop: false, text: "PLAYING" }))
        }
        else if (action.type === PLAYER_ACTION_TYPE.PAUSE) {
            api.getState().audioAPI?.pause()
            api.dispatch(playAudioUpdateState({isPlay: false, isPause: false,
                 flagSeek: false, text: "PAUSE MDL" }))
        }
}
// const playerMdl: Middleware<{}, usePlayerState, Dispatch<Action<ActionPlayerType>>> = 
//     api => next => (action: ActionPlayerType) => {
//         if (action.type === PLAYER_ACTION_TYPE.PLAY)
//             api.dispatch({type: playAudio() })
// }

export const playerMdl = [playAudioMdl]