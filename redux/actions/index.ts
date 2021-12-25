import { ActionPlayerType, pauseAudioState, playAudioState, PLAYER_ACTION_TYPE, stopAudioState, usePlayerState } from "../../types/player";

export const initHowl = (audioAPI: usePlayerState["audioAPI"]): ActionPlayerType => 
    ({ type: PLAYER_ACTION_TYPE.INIT, payload: audioAPI});
export const onLoadAudio = (duration: number): ActionPlayerType => 
    ({ type: PLAYER_ACTION_TYPE.ON_LOAD_AUDIO, 
        payload: {text: "Set Duration", duration}});
/** 
 * Play Audio Actions
*/
export const playAudio = (): ActionPlayerType => 
    ({ type: PLAYER_ACTION_TYPE.PLAY, payload: null});
// Update playing state for current audio
export const playAudioUpdateState = (payload: playAudioState | pauseAudioState | stopAudioState): ActionPlayerType => 
    ({ type: PLAYER_ACTION_TYPE.PLAY_STATE, payload: payload});
    
export const pauseAudio = (): ActionPlayerType => 
    ({ type: PLAYER_ACTION_TYPE.PAUSE, payload: null});
export const stopAudio = (): ActionPlayerType => 
    ({ type: PLAYER_ACTION_TYPE.STOP, payload: null});