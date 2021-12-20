import { Howl } from "howler"
//https://stackoverflow.com/questions/36871057/does-typescript-support-subset-types
type Subset<T extends U, U> = U
// Key for Action Types
enum KActions { 
    PLAYER="PLAYER", 
    COBA="COBA"
}
// Reducer Structure
type TActions<T extends string, P = any | null> = | {
    type: T,
    payload: P
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
