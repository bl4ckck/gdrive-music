import React from "react"
import { Howl, Howler, HowlOptions } from 'howler';
import { ActionPlayerType, initialStatePlayer, usePlayerState, usePlayerType } from "../types/player";
import { connect, useDispatch, useSelector } from "react-redux";
import { Action, bindActionCreators, Dispatch } from "redux";
import { initHowl, pauseAudio, playAudio, stopAudio } from "../redux/actions";
import {TActions} from "../types/types"
import * as PlayerActions from "../redux/actions"
import Player from "../components/player/player";
import { PlayPauseButton } from "../components/player/controllerPlayer";

type SPlayer = usePlayerState
type PropsPlayerWrapper = {
    actions: typeof PlayerActions
} & usePlayerState
type TActionConnect = { actions: typeof PlayerActions }

const mapStateToProps = (state: SPlayer) => ({
    isPlay: state.isPlay,
    isPause: state.isPause,
    isStop: state.isStop,
    flagSeek: state.flagSeek,
    seek: state.seek,
    duration: state.duration,
    isEnd: state.isEnd,
    text: state.text, //Reducer, //Reducer
    audioAPI: state.audioAPI //Reducer //Reducer
})

const mapDispatchToProps = (dispatch: Dispatch<Action<ActionPlayerType>>) => ({
    actions: bindActionCreators(PlayerActions, dispatch)
})

const withConnectPlayer = (PlayerComponent: any) => 
    (props: PropsPlayerWrapper) => <PlayerComponent {...props} />

export default (WrappedPlayer: any) => connect<SPlayer, TActionConnect, {}, SPlayer>(
    mapStateToProps,
    mapDispatchToProps,
)(withConnectPlayer(WrappedPlayer))