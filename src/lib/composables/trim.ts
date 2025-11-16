export const trimText = (text: string, limit?: number) : string => {
    limit = limit === undefined ? 10 : limit
    const output = text.length > limit ? text.slice(0, limit)+"..." : text
    return output
}