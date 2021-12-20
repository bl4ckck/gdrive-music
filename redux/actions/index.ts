import { ActionPlayerType, pauseAudioState, playAudioState, PLAYER_ACTION_TYPE, usePlayerState } from "../../types/player";

export const initHowl = (audioAPI: usePlayerState["audioAPI"]): ActionPlayerType => 
    ({ type: PLAYER_ACTION_TYPE.INIT, payload: audioAPI});
/** 
 * Play Audio Actions
*/
export const playAudio = (): ActionPlayerType => 
    ({ type: PLAYER_ACTION_TYPE.PLAY, payload: null});
export const playAudioUpdateState = (payload: playAudioState | pauseAudioState): ActionPlayerType => 
    ({ type: PLAYER_ACTION_TYPE.PLAY_STATE, payload: payload});
    
export const pauseAudio = (): ActionPlayerType => 
    ({ type: PLAYER_ACTION_TYPE.PAUSE, payload: null});