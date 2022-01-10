import React from 'react';
import type { NextPage } from "next"
import Head from 'next/head'
import Image from 'next/image'
import Player from "../../components/player/player"
import { PropsMainLayout } from "../../types/types"

import { useSelector, useDispatch } from "react-redux";
import { initHowl } from '../../redux/actions';
import HowlerInitialize from '../../lib/HowlerInitialize';
import { ActionPlayerType, usePlayerState } from '../../types/player';
// import { Dispatch } from 'redux';
import { Howl } from 'howler';
import * as PlayerActions from "../../redux/actions"
import PlayerWrapper from '../../containers/PlayerWrapper';
import { PlayPauseButton } from '../../components/player/controllerPlayer';
import SidebarLayout from './SidebarLayout';

type PropsPlayerWrapper = {
    actions: typeof PlayerActions
} & usePlayerState

// const Compnya = (props: any) => <div>{`text ${props.isPlay} ${props.coba}`}</div>
// const Compnya1 = (props: PropsPlayerWrapper) => (
//     <Player {...props}>
//         <PlayPauseButton
//             play={props.actions.playAudio}
//             pause={props.actions.pauseAudio}
//             isPlay={props.isPlay}
//             audioAPI={props.audioAPI}
//         />
//     </Player>
// )
// const WrappedComponent = PlayerWrapper(Compnya1);

const MainLayout: NextPage<PropsMainLayout> = (props) => {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content={props.description} />
                <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SidebarLayout />
            <main>
                {/* Player Component */}
                <Player />
                {/* Main Content and Sidebar */}
                <div className="md:ml-[270px] mt-24 mx-4 md:mx-0 md:mt-4">
                    {props.children}
                </div>
            </main>
            <footer>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </>
    )
}

export default MainLayout