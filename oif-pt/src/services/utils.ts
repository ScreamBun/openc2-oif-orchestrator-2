export const getDateTime = (millis: string | undefined) => {
    let dateTime = ""
    if (millis && !undefined){ 
        const rawDate = new Date(parseInt(millis, 10))
        dateTime = rawDate.toLocaleDateString() + " " + rawDate.toLocaleTimeString()
    }
    return dateTime;
}  