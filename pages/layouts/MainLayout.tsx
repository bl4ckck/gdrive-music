import type { NextPage } from "next"
import Head from 'next/head'
import Image from 'next/image'
import Player from "../../components/player"

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
            <div className="fixed top-0 z-50 flex items-center w-full px-4 bg-white shadow-md h-14">
                <div>asd</div>
            </div>
            <main className="mt-20">
                <Player />
                {props.children}
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