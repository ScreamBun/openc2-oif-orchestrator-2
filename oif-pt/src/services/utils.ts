import vkbeautify from 'vkbeautify';

export const format = (msg: string, fmt: string, ind?: number) => {
    const indent = ind || 2;
    let rtnMsg = '';
    try {
      switch (fmt) {
        case 'cbor':
          //TODO: FIX  CBOR pretty print
          rtnMsg = (msg);
          break;
        case 'json':
          rtnMsg = vkbeautify.json(msg, indent);
          break;
        case 'xml':
          rtnMsg = vkbeautify.xml(msg, indent);
          break;
        default:
          rtnMsg = `Error, cannot format ${fmt} message`;
      }
    } catch (e) {
      rtnMsg = `Error, cannot format: ${(e as Error).message}`;
    }
    return rtnMsg;
};

export const getDateTime = (millis: string | undefined) => {
    let dateTime = ""
    if (millis && !undefined){ 
        const rawDate = new Date(parseInt(millis, 10))
        dateTime = rawDate.toLocaleDateString() + " " + rawDate.toLocaleTimeString()
    }
    return dateTime;
}