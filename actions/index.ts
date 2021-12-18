import { ActionPlayerType, PLAYER_ACTION_TYPE, usePlayerState } from "../types/player";

export const initHowl = (audioAPI: usePlayerState["audioAPI"]): ActionPlayerType => ({ type: PLAYER_ACTION_TYPE.INIT, payload: audioAPI});
export const playAudio = (): ActionPlayerType => ({ type: PLAYER_ACTION_TYPE.PLAY});