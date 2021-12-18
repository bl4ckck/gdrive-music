import { Howl } from "howler"
type TActions<T extends string
,P = any> = {
    type: T,
    payload?: P
}
type PropsMainLayout = {
    title: string,
    description: string
}
type PropsPlayer = {
    title?: string,
    url?: string
}
type PropsSeekPlayer = {
    mcState: usePlayerState<boolean>,
    mcAction: usePlayerAction
}
