export const calcMsToMinute = (secs: number): string => {
    let minutes: number = Math.floor(secs / 60) || 0;
    let seconds: number = Math.trunc((secs - minutes * 60)) || 0;
    
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}