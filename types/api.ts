export enum ENDPOINT {
    HELLO = "hello",
    SONG = "song"
}
/**
 * Song Type
 */
export type TSongList = {
    id: number,
    name: string,
    webContentLink: string,
    fileExtension: string,
    size: number
} 