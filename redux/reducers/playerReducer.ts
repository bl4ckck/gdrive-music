import { Howl } from "howler"
import { Reducer } from "redux"
import HowlerInitialize from "../../lib/HowlerInitialize"
import { ACTION_TYPES } from "../../types/actions"
import { ActionPlayerType, usePlayerState, initialStatePlayer, PLAYER_ACTION_TYPE, playAudioState } from "../../types/player"
import { KActions } from "../../types/types"

const playerReducer: Reducer<usePlayerState, Extract<ACTION_TYPES, 
    { key: KActions.PLAYER }>["type"]> = (
    state = initialStatePlayer, action) => {
    switch (action.type) {
        case PLAYER_ACTION_TYPE.INIT:
            return {
                ...state,
                text: "ini init load",
                audioAPI: action.payload
            }
        case PLAYER_ACTION_TYPE.ON_LOAD_AUDIO:
            return {
                ...state,
                ...action.payload
            }
        case PLAYER_ACTION_TYPE.EVENT_STATE:
            return {
                ...state,
                ...action.payload
            }
        case PLAYER_ACTION_TYPE.PLAY_STATE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default playerReducer