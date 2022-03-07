export const TimeUTC = (time) =>{
    const year = new Date(time).getUTCFullYear()
    const month = new Date(time).getUTCMonth()
    const day = new Date(time).getUTCDay()
    const hour = new Date(time).getUTCHours()
    const minute = new Date(time).getUTCMinutes()
    const second = new Date(time).getUTCSeconds()
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}