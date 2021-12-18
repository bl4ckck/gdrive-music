import { Howl } from "howler"
import { Reducer } from "redux"
import HowlerInitialize from "../lib/HowlerInitialize"
import { ActionPlayerType, usePlayerState, initialStatePlayer } from "../types/player"

const playerReducer: Reducer<usePlayerState, ActionPlayerType> = (
    state = initialStatePlayer,
    action: ActionPlayerType) => {
    const playAudio = (): usePlayerState => {
        if (state.audioAPI) {
            if (!state.audioAPI.playing()) { // While not playing any audio
                state.audioAPI.play()
                return {
                    ...state,
                    flagSeek: false,
                    isPlay: true,
                    isPause: false,
                    isStop: false,
                    text: "bisa"
                }
            }
            else { // While playing audio
                state.audioAPI.pause()
                return {
                    ...state,
                    flagSeek: false,
                    isPlay: false,
                    isPause: true,
                    isStop: false,
                    text: "bisa play"
                }
            }
        }
        return state
    }

    switch (action.type) {
        case "INIT":
            return {
                ...state,
                text: "ini init load",
                audioAPI: action.payload ? action.payload : null
            }
        case "PLAY":
            return playAudio()
        default:
            return state
    }
}

export default playerReducer